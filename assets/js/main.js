isMenu = false;
const handleMenu = () => {
  const menu = document.querySelector(".hamburger-menu");
  isMenu = !isMenu;

  menu.classList.toggle("active", isMenu);
};
