import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompApplicationWorkflows from './RdsCompApplicationWorkflows';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompApplicationWorkflows />, div);
  ReactDOM.unmountComponentAtNode(div);
});