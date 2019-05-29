import React from 'react';
import { Header } from 'semantic-ui-react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';

Amplify.configure(aws_exports);

const signUpConfig = {
  hiddenDefaults: ['username', 'email', 'phone_number'],
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'email',
      custom: false
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
      custom: false
    },
  ]
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Header as='h1'>Hello World!</Header>
    </div>
  );
}

export default withAuthenticator(App, { signUpConfig, includeGreetings: true });
