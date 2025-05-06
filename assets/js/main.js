let isMenu = false;
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-desktop a");

const menu = document.querySelector(".hamburger-menu");
const body = document.querySelector("body");
const list = document.querySelector(".hamburger-menu-list");
const item = document.querySelectorAll(".hamburger-menu-list a");

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

item.forEach((link) => {
  link.addEventListener("click", () => {
    isMenu = false;
    menu.classList.remove("active");
    body.classList.remove("no-scroll");
  });
});

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  const visibleSections = Array.from(sections).filter((section) => {
    return window.getComputedStyle(section).display !== "none";
  });

  let currentSectionId = "";

  visibleSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop - 120 && scrollPosition < sectionBottom)
      currentSectionId = section.getAttribute("id");
  });

  navLi.forEach((link) => {
    const dataId = link.getAttribute("data-id");

    if (dataId === currentSectionId) link.classList.add("choose");
    else link.classList.remove("choose");
  });
});
