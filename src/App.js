import { Button } from 'antd';
import Parse from 'parse/dist/parse.min';
import logo from './logo.svg';
import './App.css';
import config from './config';

Parse.initialize(config.parse.appId);
Parse.serverURL = config.parse.serverURL;

function App() {

  const testParse = async () => {
    const collectionName = 'Referral';
    const Collection = Parse.Object.extend(collectionName);
    const query = new Parse.Query(Collection);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " records.");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary" onClick={testParse}>Test parse.</Button>
      </header>
    </div>
  );
}

export default App;
