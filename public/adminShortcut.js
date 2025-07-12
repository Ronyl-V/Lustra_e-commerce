// public/adminShortcut.js

window.addEventListener("keydown", function(e) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Pour Mac: Option (altKey) + a
  // Pour Windows/Linux: Alt (altKey) + a
  // e.code est "KeyA" pour la touche A
  if (e.altKey && e.code === "KeyA") {
    e.preventDefault();
    window.location.href = "/admin";
  }
});
