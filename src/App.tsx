import React from 'react';
import { Header } from 'semantic-ui-react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';

Amplify.configure(aws_exports);

const App: React.FC = () => {
  return (
    <div className="App">
      <Header as='h1'>Hello World!</Header>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
