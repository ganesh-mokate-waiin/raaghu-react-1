import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompPollsOption from './RdsCompPollsOption';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompPollsOption />, div);
  ReactDOM.unmountComponentAtNode(div);
});