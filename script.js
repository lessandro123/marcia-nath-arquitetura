window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  const heroVideos = Array.from(document.querySelectorAll("[data-hero-video]"));
  const revealItems = document.querySelectorAll(".reveal");

  const syncHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 28);
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    menu?.classList.add("is-open");
    menu?.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
  };

  syncHeader();
  menuToggle?.setAttribute("aria-expanded", "false");
  window.addEventListener("scroll", syncHeader, { passive: true });
  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const startHeroPingPongVideo = (videos) => {
    if (videos.length < 2) return;

    let activeIndex = 0;

    const play = (video) => {
      video.playbackRate = 0.55;
      video.play().catch(() => {});
    };

    videos.forEach((video, index) => {
      video.loop = false;
      video.preload = "auto";
      video.classList.toggle("is-active", index === activeIndex);
      video.load();

      video.addEventListener("ended", () => {
        if (index !== activeIndex) return;

        const nextIndex = activeIndex === 0 ? 1 : 0;
        const currentVideo = videos[activeIndex];
        const nextVideo = videos[nextIndex];

        nextVideo.currentTime = 0;
        nextVideo.classList.add("is-active");
        play(nextVideo);

        window.setTimeout(() => {
          currentVideo.pause();
          currentVideo.classList.remove("is-active");
          activeIndex = nextIndex;
        }, 120);
      });
    });

    play(videos[activeIndex]);
  };

  startHeroPingPongVideo(heroVideos);

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
});
