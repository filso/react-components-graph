import sampleAppData from '../sampleAppData';

export default class InspectedApp {
  constructor() {
    this.loadSampleData();
  }

  getData() {
    return this._data;
  }

  _setData(data) {
    this._data = data;
  }

  loadSampleData() {
    this._setData(sampleAppData);
  }
}