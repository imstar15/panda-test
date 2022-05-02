import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { Button } from 'antd';
import './TestOak.css';
import { Observer, Scheduler, Recurrer, oakConstants } from 'oak-js-library';

const account = '68vqVx27xVYeCkqJTQnyXrcMCaKADUa7Rywn9TSrUZyp4NGP';

const TestOak = () => {

  const oakNotify = async () => {
    await web3Enable('oak-parse');
    const injector = await web3FromAddress(account);
    const obs = new Observer(oakConstants.OakChains.NEU)
    const schr = new Scheduler('NEU')
    const recur = new Recurrer()
    const timestamps = recur.getHourlyRecurringTimestamps(Date.now(), 5)
    console.log(timestamps)
    const hex = await schr.buildScheduleNotifyExtrinsic(account, '10013', timestamps, 'hello world', injector.signer)
    console.log(hex)
    const txhash = await schr.sendExtrinsic(hex)
    console.log(txhash)
  }

  const oakTransfer = async () => {
    await web3Enable('oak-parse');
    const injector = await web3FromAddress(account);
    const schr = new Scheduler(oakConstants.OakChains.NEU)
    const recur = new Recurrer()
    const timestamps = recur.getHourlyRecurringTimestamps(Date.now(), 5)
    const hex = await schr.buildScheduleNativeTransferExtrinsic(account, "20000", timestamps, '68f3q4KSryfwFWTomj7DD41p9AQxAKvZNG9aJgckXBgpkvNL', 1000000000, injector.signer)
    console.log(hex)
    const txhash = await schr.sendExtrinsic(hex)
    console.log(txhash)
  }

  const oakCancel = async () => {
    await web3Enable('oak-parse');
    const injector = await web3FromAddress(account);
    const schr = new Scheduler(oakConstants.OakChains.NEU)
    const hex = await schr.buildCancelTaskExtrinsic(account, "0xa30dcdb6ad187b05a9bf6c3c42b0c0f90ea5124bcaf1aaf8a4e0bcc0550d8c50", injector.signer)
    console.log(hex)
    const txhash = await schr.sendExtrinsic(hex)
    console.log(txhash)
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
