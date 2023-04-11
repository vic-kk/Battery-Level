const RootDiv = document.getElementById('battery');
const VisualElements = {
  'charge_bar': 'charge_bar',
  'charge_level': 'charge_level',
  'charging_status': 'charging_status',
}

navigator.getBattery().then((battery) => {
  initialUpdate(battery);
  battery.onchargingchange = () => chargingChangeHandler(battery);
  battery.onlevelchange = () => levelChangeHandler(battery);
});

const initialUpdate = (battery) => {
  generateVisualElements();
  chargingChangeHandler(battery);
  levelChangeHandler(battery);
}

const generateVisualElements = () => {
  for (const elementName in VisualElements) {
    const newElement = document.createElement('div');
    newElement.id = elementName;
    RootDiv.appendChild(newElement);
  };
}

const getVisualElement = (elementName) => {
  if (!VisualElements[elementName]) throw 'Element not present in VisualElements';
  return document.getElementById(VisualElements[elementName]);
}

const chargingChangeHandler = ({ charging: isCharging } = battery) => {
  if (!battery) return;
  RootDiv.setAttribute('data-charging', isCharging);
  getVisualElement('charging_status').innerHTML = `${isCharging ? '' : 'dis'}charging`;
}

const levelChangeHandler = ({ level } = battery) => {
  if (!battery) return;
  const percantage = level * 100;
  getVisualElement('charge_bar').style.height = `${percantage}%`;
  getVisualElement('charge_level').innerHTML = `${percantage}%`;
}
