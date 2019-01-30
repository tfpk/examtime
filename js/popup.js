var modal = document.getElementById('settings_modal');

var set_open = document.getElementById("settings_open");

var set_close = document.getElementById("settings_close");

set_open.onclick = function() {
  modal.style.display = "block";
}

set_close.onclick = function() {
  modal.style.display = "none";
}

