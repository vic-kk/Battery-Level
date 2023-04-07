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

const level = (batteryInfo) => {
  document.querySelector('#perc').innerHTML = Math.round(batteryInfo.level*100)+'%';
  var par = Math.floor(window.getComputedStyle(document.querySelector('#bat')).height.replace('px',''))/100
  document.querySelector('#level').style.height = par*(batteryInfo.level*100)+'px';
}

const chargingChange = (batteryInfo) => {
  if (batteryInfo.charging) {
    document.querySelector('#level').style.background = "lightgreen";
    document.querySelector('#perc').style.textShadow = "#029200 0px 0px 50px";
    document.querySelector('#charg').style.textShadow = "#029200 0px 0px 50px";
    document.querySelector('#charg').innerHTML = "charging";
  } else {
    // document.querySelector('#level').style.background = "lightblue";
    // document.querySelector('#charg').style.textShadow = "#001892 0px 0px 50px";
    document.querySelector('#level').style.background = "#ff6161";
    document.querySelector('#perc').style.textShadow = "#ff0000 0px 0px 50px";
    document.querySelector('#charg').style.textShadow = "#ff0000 0px 0px 50px";
    document.querySelector('#charg').innerHTML = "discharging";
  }

  level(battery);
}

navigator.getBattery().then((battery) => {
  chargingChange(battery);

  return setInterval(() => {
    battery.onchargingchange = chargingChange(battery);
    battery.onlevelchange = level(battery);
    // document.querySelector('#rem').innerHTML = battery.dischargingTime?"Discharged in "+time(battery.dischargingTime)+"s":"Discharged in "+time(battery.dischargingTime)+"s";
  }, 500);
});

