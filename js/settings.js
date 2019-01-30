var settings_checks = document.getElementsByClassName("settings_check")

var i = 0;
var SETTING_STRING = 'examtime_setting_'
for (i = 0; i < settings_checks.length; i++){
  var setting_name = SETTING_STRING + settings_checks[i].id;
  if (window.sessionStorage.getItem(setting_name) === null) {
    window.sessionStorage.setItem(setting_name, "");
  }
  settings_checks[i].checked = window.sessionStorage.getItem(setting_name);
  settings_checks[i].onchange = function (event){
    window.sessionStorage.setItem(SETTING_STRING + event.target.id, event.target.checked || "");
  };
}

function get_setting(name){
  return window.sessionStorage.getItem(SETTING_STRING + name);
}
