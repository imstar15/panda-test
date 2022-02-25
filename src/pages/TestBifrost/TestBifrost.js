import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { Button } from 'antd';
import Parse from 'parse';
// import logo from '../../logo.svg';
import './TestBifrost.css';
import polkadotApiHelper from '../../common/polkadotApiHelper';

const account = '5EquB29VVsg6oEC8Jcsm8kDXPD2WipuRjWxbcJf9JsdRXWnf';

const TestBifrost = () => {

  const getBifrostContributions = async () => {
    try {
      const result = await Parse.Cloud.run("getBifrostContributions");
      console.log('result: ', JSON.stringify(result));
    } catch (error) {
      console.log('error.code: ', error.code);
      console.log('error.message: ', error.message);
    }
  }

  const sendKSMtoBifrost = async () => {
    await web3Enable('oak-parse');
    const parachain_id = 2001
    const amount = 1000000000000
    try {
        const paras = [
          {
            V1: {
              parents: 0,
              interior: {
                X1: {
                  Parachain: parachain_id,
                },
              },
            },
          },
          {
            V1: {
              parents: 0,
              interior: {
                X1: {
                  AccountId32: {
                    network: 'Any',
                    id: u8aToHex(decodeAddress(account)),
                  },
                },
              },
            },
          },
          {
            V1: [
              {
                id: {
                  Concrete: {
                    parents: 0,
                    interior: 'Here',
                  },
                },
                fun: {
                  Fungible: amount,
                },
              },
            ],
          },
          0,
        ];
        const injector = await web3FromAddress(account);
        const polkadotApi = await polkadotApiHelper.getKusamaApi();
        const info = await polkadotApi.tx.xcmPallet.reserveTransferAssets(...paras).paymentInfo(account);
        console.log(info.partialFee.toNumber())
        const extrinsic = polkadotApi.tx.xcmPallet.reserveTransferAssets(...paras);
        const signedExtrinsic = await extrinsic.signAsync(account, { signer: injector.signer });
        console.log("signedExtrinsic: ", JSON.stringify(signedExtrinsic))
        console.log("signer: ", signedExtrinsic.signer.toString());
        console.log("txHex: ", signedExtrinsic.toHex());
        console.log("txHash: ", signedExtrinsic.hash.toString());

        const result = await Parse.Cloud.run("sendKSMtoBifrost", { "txHex": signedExtrinsic.toHex(), "chainName": "rococo-test", "referralCode": "chris_ref_code" });
        console.log('result: ', result);
      } catch (error) {
        console.log('swapKSMforBNC', 'Transaction rejected by blockchain', error.message);
        console.log('error.code: ', error.code);
        console.log('error.message: ', error.message);
      }
  }

  const bifrostContribute = async () => {
    await web3Enable('oak-parse');

    try {
        const injector = await web3FromAddress(account);
        const polkadotApi = await polkadotApiHelper.getBifrostApi();
        const extrinsic = polkadotApi.tx.salp.contribute(2090, 1000000000000);
        const signedExtrinsic = await extrinsic.signAsync(account, { signer: injector.signer });
        console.log("signedExtrinsic: ", signedExtrinsic);
        console.log("signer: ", signedExtrinsic.signer.toString());
        console.log("txHex: ", signedExtrinsic.toHex());
        console.log("txHash: ", signedExtrinsic.hash.toString());
        const result = await Parse.Cloud.run("bifrostContribute", { "txHex": signedExtrinsic.toHex(), "chainName": "bifrost-kusama", "referralCode": "chris_ref_code" });
        console.log('result: ', result);
    } catch (error) {
        console.log('error.code: ', error.code);
        console.log('error.message: ', error.message);
    }
  }

  return (
    <div className="TestBifrost">
      <header className="TestBifrost-header">
        <Button className="test-button" type="primary" onClick={getBifrostContributions}>Get Bifrost Contributions</Button>
        <Button className="test-button" type="primary" onClick={sendKSMtoBifrost}>Send KSM to Bifrost</Button>
        <Button className="test-button" type="primary" onClick={bifrostContribute}>Contribute Via Bifrost</Button>
      </header>
    </div>
  );
}

export default TestBifrost;
