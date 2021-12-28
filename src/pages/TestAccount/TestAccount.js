import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex, stringToHex } from '@polkadot/util';
import './TestAccount.css';
import Parse from 'parse';
import { Button } from 'antd';
import randomString from 'random-string';

const account = '5GcD1vPdWzBd3VPTPgVFWL9K7b27A2tPYcVTJoGwKcLjdG5w';
const randomStr = 'randomStr';
const password = 'OAKNetwork';

const TestAccount = () => {
  let savedSignature = '';

  const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  };

  const login = async () => {
    const username = '53d8NKF@example.com';
    const signinMessage = getSigninMessage();
    const signature = await sign(signinMessage);
    const { sessionToken } = await Parse.Cloud.run("loginWithSignature", { username, signature });
    const user = await Parse.User.become(sessionToken)
    console.log('user: ', user);
  }

  const getSigninMessage = async () => {
    const { signin_message } = await Parse.Cloud.run("getSigninMessage", {});
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

  const signIn = async () => { 
    const email = `${randomString({length: 7})}@example.com`;
    const username = email;

    // Sign In
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
      <Button type="primary" className="test-button" onClick={signIn}>Sign In</Button>
      <Button type="primary" className="test-button" onClick={() => {sign(randomStr)}}>Sign</Button>
      <Button type="primary" className="test-button" onClick={verify}>Verify</Button>
      <Button type="primary" className="test-button" onClick={login}>Login</Button>
      <Button type="primary" className="test-button" onClick={getSigninMessage}>GetSigninMessage</Button>
    </div>
  );
}

export default TestAccount;
