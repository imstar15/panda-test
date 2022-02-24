import config from "../config";
import { WsProvider, ApiPromise } from '@polkadot/api';

class PolkadotApiHelper {
  constructor() {
    this.kusamaApi = null;
    this.bifrostApi = null;
    this.oakApi = null;
  }

  getOakApi = async () => {
    if (!this.oakApi) {
      const { endpoint, types } = config.polkadot.oak;
      const wsProvider = new WsProvider(endpoint);
      this.api = await ApiPromise.create({ provider: wsProvider, types });
    }
    return this.oakApi;
  }

  getKusamaApi = async () => {
    if (!this.kusamaApi) {
      const { endpoint } = config.polkadot.kusama;
      const wsProvider = new WsProvider(endpoint);
      this.kusamaApi = await ApiPromise.create({ provider: wsProvider });
    }
    return this.kusamaApi;
  }

  getBifrostApi = async () => {
    if (!this.bifrostApi) {
      const { endpoint } = config.polkadot.bifrost;
      const wsProvider = new WsProvider(endpoint);
      this.bifrostApi = await ApiPromise.create({ provider: wsProvider });
    }
    return this.bifrostApi;
  }
}

export default new PolkadotApiHelper();
