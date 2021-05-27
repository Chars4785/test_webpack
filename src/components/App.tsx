import * as React from 'react';

import PageInterface from '../PageInterface';
import TestComponent from './TestComponent';

class App extends React.Component<PageInterface, {}> {
  render() {
    return (<div>
      <h1>Welcome to React with Typescript</h1>
      <p>The color of this page is: {this.props.color}</p>
      <TestComponent />
    </div>
    );
  }
}

export default App;