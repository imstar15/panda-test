import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex, stringToHex } from '@polkadot/util';
import Parse from 'parse';
import { Button } from 'antd';

import './TestAccount.css';

const account = '5EquB29VVsg6oEC8Jcsm8kDXPD2WipuRjWxbcJf9JsdRXWnf';
const password = 'OAKNetwork';
const email = 'charles@oak.tech';
const username = email;

const TestAccount = () => {
  let savedSignature = '';
  let sign_in_message = '';

  const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    console.log('hi')
    console.log(u8aToHex(decodeAddress('eW9sJeyfQBwB7dRhTCuYJeE7jsvkEEgwf1sThWJe6DsPxCY')))
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  };

  const login = async () => {
    const signinMessage = await getSigninMessage(username);
    sign_in_message = signinMessage;
    const signature = await sign(signinMessage);
    const result = await Parse.User.logIn(username, password, { installationId: JSON.stringify({ signature, walletAddress: account }) });
    console.log('Sign up successfully, result: ', result);
  }

  const getUserStatus = async () => {
    const userStatus = await Parse.Cloud.run("getUserStatus", { "walletAddress": account });
    console.log(`userStatus: ${JSON.stringify(userStatus, null, 2)}`);
  }

  const getGlobalStatus = async () => {
    const globalStatus = await Parse.Cloud.run("getGlobalStatus", { });
    console.log(`globalStatus: ${JSON.stringify(globalStatus, null, 2)}`);
  }

  const getSigninMessage = async (username) => {
    try {
      const { signin_message } = await Parse.Cloud.run("getSigninMessage", { username });
      console.log('getSigninMessage, signin_message: ', signin_message);
      sign_in_message = signin_message;
      return signin_message;
    } catch (error) {
      console.log('error: ', error);
      console.log('code: ', error.code);
    }
  }

  const sign = async () => {
    console.log('message: ', sign_in_message);
    await web3Enable('oak-parse');
    const injector = await web3FromAddress(account);
    const signRaw = injector?.signer?.signRaw;
    const { signature } = await signRaw({
        address: account,
        data: stringToHex(sign_in_message),
        type: 'bytes'
    });
    console.log('signature: ', signature);
    savedSignature = signature;
    return signature;
  }

  const signUp = async () => {
    if (Parse.User.current()){
      await Parse.User.destroyAll();
    }
    
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    try {
      const parseUser = await user.signUp();
      console.log(`parseUser: ${JSON.stringify(user, null, 2)}`);
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    console.log('Sign up successfully, user: ', user);
  }
  
  const verify = async () => {
    await cryptoWaitReady();
    const isValid = isValidSignature(
      sign_in_message,
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
        <Button type="primary" className="test-button" onClick={() => {sign()}}>Sign</Button>
        <Button type="primary" className="test-button" onClick={verify}>Verify</Button>
        <Button type="primary" className="test-button" onClick={() => {getSigninMessage(username)}}>GetSigninMessage</Button>
      </div>
      Status:
      <div className='row'>
        <Button type="primary" className="test-button" onClick={() => {getGlobalStatus()}}>Global Status</Button>
        <Button type="primary" className="test-button" onClick={() => {getUserStatus()}}>User Status</Button>
      </div>
    </div>
  );
}

export default TestAccount;