class BatteryInfo {
  _rootDiv;
  _infoElements = {
    'charge_bar': 'charge_bar',
    'charge_level': 'charge_level',
    'charging_status': 'charging_status',
  };
  constructor(divId) {
    if (!divId) throw `id of parent DOMElement is needed`;
    const rootDiv = document.getElementById(divId);
    if (!rootDiv) throw `DIV#${divId} is not exist in DOM`;
    this._rootDiv = rootDiv;
  }
  _generateVisualElements() {
    for (const elementName in this._infoElements) {
      const newElement = document.createElement('div');
      newElement.id = elementName;
      this._rootDiv.appendChild(newElement);
    };
  }
  _getInfoElement(elementName) {
    if (!this._infoElements[elementName]) throw 'Element not present';
    return document.getElementById(this._infoElements[elementName]);
  }
  create(battery) {
    this._generateVisualElements();
    this.chargingChangeHandler(battery);
    this.levelChangeHandler(battery);
  }
  chargingChangeHandler({ charging: isCharging } = battery) {
    if (!battery) return;
    this._rootDiv.setAttribute('data-charging', isCharging);
    this._getInfoElement('charging_status').innerHTML = `${isCharging ? '' : 'dis'}charging`;
  }
  levelChangeHandler({ level: level } = battery) {
    if (!battery) return;
    const percantage = level * 100;
    this._getInfoElement('charge_bar').style.height = `${percantage}%`;
    this._getInfoElement('charge_level').innerHTML = `${percantage}%`;
  }
};

navigator.getBattery().then((battery) => {
  const batteryInfo = new BatteryInfo('battery');
  batteryInfo.create(battery);
  battery.onchargingchange = () => batteryInfo.chargingChangeHandler(battery);
  battery.onlevelchange = () => batteryInfo.levelChangeHandler(battery);
});