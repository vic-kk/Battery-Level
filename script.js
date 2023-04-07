navigator.getBattery().then(function(battery) {

  setInterval(function () {
    battery.onchargingchange = chargingChange();
    battery.onlevelchange = level();
    // document.querySelector('#rem').innerHTML = battery.dischargingTime?"Discharged in "+time(battery.dischargingTime)+"s":"Discharged in "+time(battery.dischargingTime)+"s";
  }, 500);

   function chargingChange() {
      if (battery.charging) {
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
      level();
   }

   function level() {
     document.querySelector('#perc').innerHTML = Math.round(battery.level*100)+'%';
     var par = Math.floor(window.getComputedStyle(document.querySelector('#bat')).height.replace('px',''))/100
     document.querySelector('#level').style.height = par*(battery.level*100)+'px';
   }
});


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