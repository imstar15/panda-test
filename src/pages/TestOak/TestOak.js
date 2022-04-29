import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { Button } from 'antd';
import './TestOak.css';
import * as utilCrypto from '@polkadot/util-crypto'
import { oakConstants, Recurrer, Scheduler } from 'oak-js-library'

const account = '68vqVx27xVYeCkqJTQnyXrcMCaKADUa7Rywn9TSrUZyp4NGP';

const TestOak = () => {

  const oakNotify = async () => {
    // await web3Enable('oak-parse');
    // const injector = await web3FromAddress(account);
    // const schr = new Scheduler(oakConstants.OakChains.NEU)
    // const recur = new Recurrer()
    // const timestamps = recur.getHourlyRecurringTimestamps(Date.now(), 5)
    // const hex = await schr.buildScheduleNotifyExtrinsic(account, 10010, timestamps, 'hello world', injector.signer)
    // console.log(hex)
    // const txhash = await schr.sendExtrinsic(hex)
    // console.log(txhash)
  }

  const oakTransfer = async () => {
    // await web3Enable('oak-parse');
    // const injector = await web3FromAddress(account);
    // const schr = new Scheduler(oakConstants.OakChains.NEU)
    // const recur = new Recurrer()
    // const timestamps = recur.getHourlyRecurringTimestamps(Date.now(), 5)
    // const hex = await schr.buildScheduleNativeTransferExtrinsic(account, 10011, timestamps, 'hello world', injector.signer)
    // console.log(hex)
    // const txhash = await schr.sendExtrinsic(hex)
    // console.log(txhash)
  }

  const oakCancel = async () => {
    // await web3Enable('oak-parse');
    // const injector = await web3FromAddress(account);
    // const schr = new Scheduler(oakConstants.OakChains.NEU)
    // const recur = new Recurrer()
    // const timestamps = recur.getHourlyRecurringTimestamps(Date.now(), 5)
    // const hex = await schr.buildScheduleNotifyExtrinsic(account, 10010, timestamps, 'hello world', injector.signer)
    // console.log(hex)
    // const txhash = await schr.sendExtrinsic(hex)
    // console.log(txhash)
  }

  return (
    <div className="TestOak">
      <header className="TestOak-header">
        <Button className="test-button" type="primary" onClick={oakNotify}>Notify</Button>
        <Button className="test-button" type="primary" onClick={oakTransfer}>Transfer</Button>
        <Button className="test-button" type="primary" onClick={oakCancel}>Cancel</Button>
      </header>
    </div>
  );
}

export default TestOak;
