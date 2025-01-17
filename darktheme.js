const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const canvas = document.getElementById("gameCanvas");
  canvas.classList.toggle("dark-mode");

  const gameMenu = document.getElementById("gameMenu");
  gameMenu.classList.toggle("dark-mode");
});
