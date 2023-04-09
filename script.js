navigator.getBattery().then((battery) => {
  battery.onchargingchange = chargingChange(battery);
  battery.onlevelchange = level(battery);
});

// document.querySelector('#remaining_time').innerHTML = battery.dischargingTime?"Discharged in "+time(battery.dischargingTime)+"s":"Discharged in "+time(battery.dischargingTime)+"s";

function chargingChange(battery) {
  if (!battery) return;
  if (battery.charging) {
    document.querySelector('#battery_bar').style.background = "lightgreen";
    document.querySelector('#charge_level').style.textShadow = "#029200 0px 0px 50px";
    document.querySelector('#charging_status').style.textShadow = "#029200 0px 0px 50px";
    document.querySelector('#charging_status').innerHTML = "charging";
  } else {
    // document.querySelector('#battery_bar').style.background = "lightblue";
    // document.querySelector('#charging_status').style.textShadow = "#001892 0px 0px 50px";
    document.querySelector('#battery_bar').style.background = "#ff6161";
    document.querySelector('#charge_level').style.textShadow = "#ff0000 0px 0px 50px";
    document.querySelector('#charging_status').style.textShadow = "#ff0000 0px 0px 50px";
    document.querySelector('#charging_status').innerHTML = "discharging";
  }
  level(battery);
}

function level(battery) {
  if (!battery) return;
  document.querySelector('#charge_level').innerHTML = Math.round(battery.level*100)+'%';
  var par = Math.floor(window.getComputedStyle(document.querySelector('#battery')).height.replace('px',''))/100
  document.querySelector('#battery_bar').style.height = par*(battery.level*100)+'px';
}

function time(sec) {
  var s, m, h, d;
  if (sec>=60 && sec<3600) {
    s = sec%60;
    m = (sec-s)/60;
    return m+'m '+s;
  } else if (sec>=3600 && sec<86400) {
    s = sec%60;
    m = (sec-s)/60%60
    h = Math.floor((sec-s)/3600);
    return h+'h '+m+'m '+s;
  } else if (sec>=86400) {
    s = sec%60;
    m = (sec-s)/60%60
    h = Math.floor((sec-s)/3600%24);
    d = Math.floor((sec-s)/86400);
    return d+'d '+h+'h '+m+'m '+s;
  } else {
    return sec;
  }
}