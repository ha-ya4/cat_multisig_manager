import React from 'react';
import './App.scss';
import '../../nodelib/INodeLib';

// test
const { nodelib } = window;
nodelib.test();
console.log(nodelib.isDev());

const App: React.FC = (): React.ReactElement => {
    return (
        <div className="app">
            <div className="test-color">helloworld!!</div>
            world!
            <br />
            hhhhellllooooo
        </div>
    );
};

export default App;
