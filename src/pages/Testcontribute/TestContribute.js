import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { Button } from 'antd';
import Parse from 'parse';
// import logo from '../../logo.svg';
import './TestContribute.css';
import polkadotApiHelper from '../../common/polkadotApiHelper';

const referralCode = null;

const TestContribute = () => {
  const testParse = async () => {
    const collectionName = 'Referral';
    const Collection = Parse.Object.extend(collectionName);
    const query = new Parse.Query(Collection);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " records.");
  }

  const testCrowdloan = async () => {
    await web3Enable('oak-parse');

    const account = '5EquB29VVsg6oEC8Jcsm8kDXPD2WipuRjWxbcJf9JsdRXWnf';
    const fundAmount = 1000000000000;

    const injector = await web3FromAddress(account);
    const polkadotApi = await polkadotApiHelper.getKusamaApi();
    const extrinsic = polkadotApi.tx.crowdloan.contribute(2090, fundAmount, null);

    const signedExtrinsic = await extrinsic.signAsync(account, { signer: injector.signer });

    const contribution = { "txHex": signedExtrinsic.toHex(), "chainName": "kusama-test", "referralCode": referralCode };
    console.log("signedExtrinsic: ", signedExtrinsic);
    console.log("signer: ", signedExtrinsic.signer.toString());
    console.log("txHex: ", signedExtrinsic.toHex());
    console.log("txHash: ", signedExtrinsic.hash.toString());

    try {
      const result = await Parse.Cloud.run("contribute", contribution);
      console.log('result: ', result);
    } catch (error) {
      console.log('error.code: ', error.code);
      console.log('error.message: ', error.message);
    }
  }

  return (
    <div className="TestContribute">
      <header className="TestContribute-header">
        <Button className="test-button" type="primary" onClick={testCrowdloan}>Test crowdloan.contribute</Button>
        <Button className="test-button" type="primary" onClick={testParse}>Test parse</Button>
      </header>
    </div>
  );
}

export default TestContribute;