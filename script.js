navigator.getBattery().then((battery) => {
  battery.onchargingchange = () => chargingChangeHandler(battery);
  battery.onlevelchange = () => levelChangeHandler(battery);
  
  firstUpdate(battery);
});

const firstUpdate = (battery) => {
  chargingChangeHandler(battery);
  levelChangeHandler(battery);
}

const chargingChangeHandler = (battery) => {
  if (!battery) return;
  const { charging: isCharging } = battery;
  const text = isCharging ? 'charging' : 'discharging';
  document.getElementById('charging_status').innerHTML = text;
  document.getElementById('battery').setAttribute('data-charging', isCharging)
}

const levelChangeHandler = (battery) => {
  if (!battery) return;
  const { level } = battery;
  const percantage = level * 100;
  document.getElementById('charge_level').innerHTML = `${percantage}%`;
  document.getElementById('charge_bar').style.height = `${percantage}%`;
}
