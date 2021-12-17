import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { Button } from 'antd';
import Parse from 'parse';
// import logo from '../../logo.svg';
import './TestContribute.css';
import polkadotApiHelper from '../../common/polkadotApiHelper';

const TestContribute = () => {
  const testParse = async () => {
    const collectionName = 'Referral';
    const Collection = Parse.Object.extend(collectionName);
    const query = new Parse.Query(Collection);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " records.");
  }

  const testQuadraticFunding = async () => {
    await web3Enable('oak-parse');

    const account = '5GN8FRYnAC9teh7PW9FHdw4ADRxrUA2GMavkzE8hLDNWrcBM';
		const fundAmount = 100;

		const injector = await web3FromAddress(account);
		const polkadotApi = await polkadotApiHelper.getOakApi();
		// const extrinsic = api.tx.quadraticFunding.contribute(0, fundAmount * 10 ** 10);
		const extrinsic = polkadotApi.tx.quadraticFunding.fund(fundAmount * 10 ** 10);

		const signedExtrinsic = await extrinsic.signAsync(account, { signer: injector.signer });
		console.log("txHex: ", signedExtrinsic.toHex());
		console.log("txHash: ", signedExtrinsic.hash.toString());
  }

  const testCrowdloan = async () => {
    await web3Enable('oak-parse');

    const account = '5GN8FRYnAC9teh7PW9FHdw4ADRxrUA2GMavkzE8hLDNWrcBM';
    const fundAmount = 5;

    const injector = await web3FromAddress(account);
    const polkadotApi = await polkadotApiHelper.getKusamaApi();
    const extrinsic = polkadotApi.tx.crowdloan.contribute(2000, fundAmount * 10 ** 12, null);

    const signedExtrinsic = await extrinsic.signAsync(account, { signer: injector.signer });
    console.log("signedExtrinsic: ", signedExtrinsic);
    console.log("signer: ", signedExtrinsic.signer.toString());
    console.log("txHex: ", signedExtrinsic.toHex());
    console.log("txHash: ", signedExtrinsic.hash.toString());

    try {
      const result = await Parse.Cloud.run("contribute", { "txHex": signedExtrinsic.toHex(), "chainName": "rococo-test", "referralCode": "chris_ref_code" });
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
        <Button className="test-button" type="primary" onClick={testQuadraticFunding}>Test quadraticFunding.fund</Button>
        <Button className="test-button" type="primary" onClick={testParse}>Test parse</Button>
      </header>
    </div>
  );
}

export default TestContribute;
