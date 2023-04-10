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
  const { level: chargeLevel } = battery;
  const { offsetHeight: fullHeigth } = document.getElementById('battery');
  document.getElementById('charge_level').innerHTML = `${Math.round(chargeLevel * 100)}%`;
  document.getElementById('battery_bar').style.height = `${fullHeigth * chargeLevel}px`;
}
