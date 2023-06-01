/* eslint-disable */
import React from 'react';
import RdsCompApplicationWorkflows from './rds-comp-application-workflows';

export default {
  title: "RdsCompApplicationWorkflows",
};

export const Default = () => <RdsCompApplicationWorkflows typeList={[]} scopesList={[]} consentType={[]} handleSubmit={function (event: any): void {
  throw new Error('Function not implemented.');
} } />;

Default.story = {
  name: 'default',
};
