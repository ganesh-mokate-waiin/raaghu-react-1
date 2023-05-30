import React, { FC, useEffect, useState } from 'react';
import { RdsCompApplicationScopesWrapper } from './rds-comp-application-scopes.styled';
import { RdsCheckbox, RdsCheckboxGroup } from '../rds-elements';

interface RdsCompApplicationScopesProps {
   scopesList: any[];
}


const RdsCompApplicationScopes = (props: RdsCompApplicationScopesProps) => {

   return (
      <>
         <div className="row">
            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
               <RdsCheckboxGroup
                  itemList={props.scopesList}
               />
            </div>
         </div>
      </>
   );
};

export default RdsCompApplicationScopes;
