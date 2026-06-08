import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const runtimeRoot = path.join(process.env.LOCALAPPDATA ?? os.tmpdir(), "MarciaNathNext");
const runtimeSite = path.join(runtimeRoot, "site");
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
  "jsconfig.json",
  "index.html",
  "sobre.html",
  "residencial.html",
  "comercial.html",
  "fachadas.html",
  "inspire-se.html"
];

if (useRuntimeMirror) {
  console.log(
    `Local Next.js installation is incomplete. Syncing project files to ${runtimeSite}...`
  );

  fs.mkdirSync(runtimeSite, { recursive: true });

  for (const directory of directories) {
    fs.cpSync(path.join(projectRoot, directory), path.join(runtimeSite, directory), {
      recursive: true,
      force: true
    });
  }

  for (const file of files) {
    fs.copyFileSync(path.join(projectRoot, file), path.join(runtimeSite, file));
  }

  console.log("Project files synced. Starting Next.js...");
}

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  cwd: useRuntimeMirror ? runtimeSite : projectRoot,
  stdio: "inherit"
});

child.on("exit", (code) => process.exit(code ?? 1));
