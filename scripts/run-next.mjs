import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const runtimeRoot = path.join(process.env.LOCALAPPDATA ?? os.tmpdir(), "MarciaNathNext");
const nextCommand = process.argv[2];
const runtimeSite = path.join(runtimeRoot, nextCommand === "dev" ? "site-dev" : "site-prod");
const projectRoot = process.cwd();
const localNextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const runtimeNextBin = path.join(runtimeRoot, "node_modules", "next", "dist", "bin", "next");
const localNextRequireHook = path.join(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "server",
  "require-hook.js"
);
const useRuntimeMirror =
  !fs.existsSync(localNextBin) || !fs.existsSync(localNextRequireHook);
const nextBin = useRuntimeMirror ? runtimeNextBin : localNextBin;

const directories = ["app", "components", "lib", "public"];
const files = [
  "package.json",
  "jsconfig.json"
];

const watchers = [];
const pendingSyncs = new Map();

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function syncPath(source, destination) {
  if (!isInside(projectRoot, source) || !isInside(runtimeSite, destination)) {
    return;
  }

  if (!fs.existsSync(source)) {
    fs.rmSync(destination, { recursive: true, force: true });
    return;
  }

  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    return;
  }

  if (!shouldCopyFile(source, destination, stats)) {
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  fs.utimesSync(destination, stats.atime, stats.mtime);
}

function shouldCopyFile(source, destination, sourceStats = fs.statSync(source)) {
  if (!fs.existsSync(destination)) {
    return true;
  }

  const destinationStats = fs.statSync(destination);
  return (
    destinationStats.size !== sourceStats.size ||
    Math.trunc(destinationStats.mtimeMs) !== Math.trunc(sourceStats.mtimeMs)
  );
}

function syncDirectory(sourceDirectory, destinationDirectory) {
  fs.mkdirSync(destinationDirectory, { recursive: true });

  const sourceEntries = new Map();
  for (const entry of fs.readdirSync(sourceDirectory, { withFileTypes: true })) {
    sourceEntries.set(entry.name, entry);
    const source = path.join(sourceDirectory, entry.name);
    const destination = path.join(destinationDirectory, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(source, destination);
      continue;
    }

    if (entry.isFile()) {
      syncPath(source, destination);
    }
  }

  if (!fs.existsSync(destinationDirectory)) {
    return;
  }

  for (const entry of fs.readdirSync(destinationDirectory, { withFileTypes: true })) {
    if (sourceEntries.has(entry.name)) {
      continue;
    }

    fs.rmSync(path.join(destinationDirectory, entry.name), { recursive: true, force: true });
  }
}

function queueSync(source, destination) {
  const key = destination.toLowerCase();
  clearTimeout(pendingSyncs.get(key));
  pendingSyncs.set(
    key,
    setTimeout(() => {
      pendingSyncs.delete(key);
      try {
        syncPath(source, destination);
      } catch (error) {
        console.error(`Failed to sync ${source}:`, error);
      }
    }, 80)
  );
}

function watchRuntimeMirror() {
  for (const directory of directories) {
    const sourceDirectory = path.join(projectRoot, directory);
    const destinationDirectory = path.join(runtimeSite, directory);

    watchers.push(
      fs.watch(sourceDirectory, { recursive: true }, (_eventType, filename) => {
        if (!filename) {
          fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true, force: true });
          return;
        }

        const relative = filename.toString();
        queueSync(
          path.join(sourceDirectory, relative),
          path.join(destinationDirectory, relative)
        );
      })
    );
  }

  for (const file of files) {
    const source = path.join(projectRoot, file);
    const destination = path.join(runtimeSite, file);

    fs.watchFile(source, { interval: 300 }, (current, previous) => {
      if (current.mtimeMs !== previous.mtimeMs || current.size !== previous.size) {
        queueSync(source, destination);
      }
    });
  }

  console.log("Watching project files for live synchronization...");
}

if (useRuntimeMirror) {
  console.log(
    `Local Next.js installation is incomplete. Syncing project files to ${runtimeSite}...`
  );

  fs.mkdirSync(runtimeSite, { recursive: true });

  for (const directory of directories) {
    syncDirectory(path.join(projectRoot, directory), path.join(runtimeSite, directory));
  }

  for (const file of files) {
    fs.copyFileSync(path.join(projectRoot, file), path.join(runtimeSite, file));
  }

  console.log("Project files synced. Starting Next.js...");

  if (nextCommand === "dev") {
    watchRuntimeMirror();
  }
}

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  cwd: useRuntimeMirror ? runtimeSite : projectRoot,
  stdio: "inherit"
});

child.on("exit", (code) => {
  for (const watcher of watchers) {
    watcher.close();
  }
  for (const file of files) {
    fs.unwatchFile(path.join(projectRoot, file));
  }
  for (const timeout of pendingSyncs.values()) {
    clearTimeout(timeout);
  }
  process.exit(code ?? 1);
});
