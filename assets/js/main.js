let isMenu = false;
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-desktop a");

const menu = document.querySelector(".hamburger-menu");
const body = document.querySelector("body");
const list = document.querySelector(".hamburger-menu-list");

const handleMenu = () => {
  isMenu = !isMenu;

  menu.classList.toggle("active", isMenu);
  body.classList.toggle("no-scroll", isMenu);
};

menu.addEventListener("click", (e) => {
  if (list.contains(e.target)) return;

  menu.classList.remove("active");
  body.classList.remove("no-scroll");
});

window.addEventListener("scroll", () => {
  let currentSections = "";

  const visibleSections = Array.from(sections).filter((section) => {
    return window.getComputedStyle(section).display !== "none";
  });

  visibleSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 6) {
      currentSections = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("choose");
    if (li.classList.contains(currentSections)) {
      li.classList.add("choose");
    }
  });
});
