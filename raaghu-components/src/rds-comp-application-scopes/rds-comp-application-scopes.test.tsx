import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompApplicationScopes from './rds-comp-application-scopes';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompApplicationScopes />, div);
  ReactDOM.unmountComponentAtNode(div);
});