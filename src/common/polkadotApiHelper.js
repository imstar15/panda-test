import config from "../config";
import { WsProvider, ApiPromise } from '@polkadot/api';

class PolkadotApiHelper {
  constructor() {
    // this.init();
    this.kusamaApi = null;
  }

  init = async () => {
    const { endpoint, types } = config.polkadot.oak;
    const wsProvider = new WsProvider(endpoint);
    this.api = await ApiPromise.create({ provider: wsProvider, types });
  }

  getApi = () => this.api;

  getKusamaApi = async () => {
    if (!this.kusamaApi) {
      const { endpoint } = config.polkadot.kusama;
      const wsProvider = new WsProvider(endpoint);
      this.kusamaApi = await ApiPromise.create({ provider: wsProvider });
    }
    return this.kusamaApi;
  }
}

export default new PolkadotApiHelper();
