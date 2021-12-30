import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex, stringToHex } from '@polkadot/util';
import Parse from 'parse';
import { Button } from 'antd';

import './TestAccount.css';

const account = '5GN8FRYnAC9teh7PW9FHdw4ADRxrUA2GMavkzE8hLDNWrcBM';
const randomStr = 'randomStr';
const password = 'OAKNetwork';
const email = 'charles@oak.tech';
const username = email;

const TestAccount = () => {
  let savedSignature = '';

  const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  };

  const login = async () => {
    const signinMessage = getSigninMessage(username);
    const signature = await sign(signinMessage);
    const result = await Parse.User.logIn(username, password, { installationId: JSON.stringify({ signature, address: account }) });
    console.log('result: ', result);
  }

  const getSigninMessage = async (username) => {
    const { signin_message } = await Parse.Cloud.run("getSigninMessage", { username });
    console.log('getSigninMessage, signin_message: ', signin_message);
    return signin_message;
  }

  const sign = async (message) => {
    console.log('message: ', message);
    await web3Enable('oak-parse');
    const injector = await web3FromAddress(account);
    const signRaw = injector?.signer?.signRaw;
    const { signature } = await signRaw({
        address: account,
        data: stringToHex(message),
        type: 'bytes'
    });
    console.log('signature: ', signature);
    savedSignature = signature;
    return signature;
  }

  const signUp = async () => {
    if (Parse.User.current()){
      await Parse.User.logOut();
    }
    
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    try {
      await user.signUp();
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    console.log('user: ', user);
  }
  
  const verify = async () => {
    await cryptoWaitReady();
    const isValid = isValidSignature(
      randomStr,
      savedSignature,
      account
    );
    console.log(isValid)
  }

  return (
    <div className='TestAccount'>
      Account:
      <div className='row'>
        <Button type="primary" className="test-button" onClick={signUp}>Sign Up</Button>
        <Button type="primary" className="test-button" onClick={login}>Log In</Button>
      </div>
      Signature:
      <div className='row'>
        <Button type="primary" className="test-button" onClick={() => {sign(randomStr)}}>Sign</Button>
        <Button type="primary" className="test-button" onClick={verify}>Verify</Button>
        <Button type="primary" className="test-button" onClick={() => {getSigninMessage(username)}}>GetSigninMessage</Button>
      </div>
    </div>
  );
}

export default TestAccount;
