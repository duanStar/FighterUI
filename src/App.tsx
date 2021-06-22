import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Alert title="This is a success" type={AlertType.Success}/>
        <Alert title="This is a success" type={AlertType.Danger}/>
        <Alert title="This is a success" description="This is a long description"/>
        <Alert title="This is a success" type={AlertType.Warning}/>
        <Button>Hello</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
