import React, { FC, useState } from 'react';
import { RdsCompApplicationWorkflowsWrapper } from './rds-comp-application-workflows.styled';
import { RdsCheckbox, RdsLabel, RdsSelectList, RdsTextArea } from '../rds-elements';

interface RdsCompApplicationWorkflowsProps {
   typeList: any[];
	basicData?: any;
	scopesList: any[];
	consentType: any[];
	handleSubmit: React.EventHandler<any>;
	editApplicationData?: any;

}

const RdsCompApplicationWorkflows = (props: RdsCompApplicationWorkflowsProps) => {
   const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);
   const checkboxes = [basicApplicationData.allowAuthorizationCodeFlow, basicApplicationData.allowHybridFlow, basicApplicationData.allowPasswordFlow];
   const isDisabled = checkboxes.length > 1 && !checkboxes.some((checkbox) => checkbox);

   function setConsentType(value: any) {
		setBasicApplicationData({ ...basicApplicationData, consentType: value })
	}
   function setCredential(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowAuthorizationCodeFlow: value })
	}

   function setRedirectUris(value: any) {
		const lines = value.split('\n');
		setBasicApplicationData({ ...basicApplicationData, redirectUris: lines })
	}

   function setLogoutEndpoint(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowLogoutEndpoint: value });
	}
	function setPostLogoutRedirectUris(value: any) {
		const lines = value.split('\n');
		setBasicApplicationData({ ...basicApplicationData, postLogoutRedirectUris: lines })
	}
   function setImplicit(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowImplicitFlow: value })
	}
	function setHybrid(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowHybridFlow: value })
	}
	function setPassword(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowPasswordFlow: value })
	}
   function setClient(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowClientCredentialsFlow: value })
	}
   function setRefresh(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowRefreshTokenFlow: value })
	}
   function setDevice(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowDeviceEndpoint: value })
	}
   console.log("basic data", props.basicData)
   return (
      <>
         <div className="row">
            <div className="col-12 col-lg-12 col-md-12 col-xl-12 col-xxl-12 mb-3 pt-3">
               <RdsCheckbox
                  classes="py-2"
                  label="Allow Authorization Code Flow"
                  onChange={e => { setCredential(e.target.checked) }}
                  checked={basicApplicationData.allowAuthorizationCodeFlow}
                  dataTestId="authorization-flow"
               ></RdsCheckbox>
               <RdsCheckbox
                  classes="py-2"
                  label="Allow Implicit Flow"
                  onChange={e => { setImplicit(e.target.checked) }}
                  checked={basicApplicationData.allowImplicitFlow}
                  dataTestId="implicit-flow"
               ></RdsCheckbox>
               <RdsCheckbox
                  classes="py-2"
                  label="Allow Hybrid Flow"
                  onChange={e => { setHybrid(e.target.checked) }}
                  checked={basicApplicationData.allowHybridFlow}
                  dataTestId="hybrid-flow"
               ></RdsCheckbox>
                <RdsCheckbox
                  classes="py-2"
                  label="Allow Password Flow"
                  onChange={e => { setPassword(e.target.checked) }}
                  checked={basicApplicationData.allowPasswordFlow}
                  dataTestId="password-flow"
               ></RdsCheckbox>
                <RdsCheckbox
                  classes="py-2"
                  label="Allow Refresh Token Flow"
                  onChange={e => { setRefresh(e.target.checked) }}
                  checked={basicApplicationData.allowRefreshTokenFlow}
                  isDisabled={isDisabled}
                  dataTestId="refresh-flow"
               ></RdsCheckbox>
               <RdsCheckbox
                  classes="py-2"
                  label="Allow Client Credential Flow"
                  onChange={e => { setClient(e.target.checked) }}
                  checked={basicApplicationData.allowClientCredentialsFlow}
                  isDisabled={basicApplicationData.type === 'public'}
                  dataTestId="client-credential-flow"
               ></RdsCheckbox>
               <RdsCheckbox
                  classes="py-2"
                  label="Allow Device Endpoint"
                  onChange={e => { setDevice(e.target.checked) }}
                  checked={basicApplicationData.allowDeviceEndpoint}
                  isDisabled={basicApplicationData.type === 'public'}
                  dataTestId="device-endpoint"
               ></RdsCheckbox>
               
            </div>
         </div>
         {basicApplicationData.allowAuthorizationCodeFlow || basicApplicationData.allowImplicitFlow ||
            basicApplicationData.allowHybridFlow ? (<>
               <RdsLabel label="Consent Type" class="py-2" />

               <RdsSelectList
                  classes="mb-3"
                  label={"Consent Type"}
                  selectItems={props.consentType}
                  selectedValue={basicApplicationData.consentType}
                  onSelectListChange={setConsentType}
                  dataTestId="consent-type"
               ></RdsSelectList>
               <div className="row">
                  <RdsTextArea
                     label="Redirect Uris"
                     placeholder="Enter uris"
                     onChange={e => setRedirectUris(e.target.value)}
                     value={basicApplicationData.redirectUris}
                     rows={3}
                     dataTestId="redirect-uri"
                  />
               </div>
               <div className=" col-6 py-3">
                  <RdsCheckbox
                     label="Allow Logout EndPoint"
                     onChange={e => { setLogoutEndpoint(e.target.checked) }}
                     checked={basicApplicationData.allowLogoutEndpoint}
                     dataTestId="logout-endpoint"
                  ></RdsCheckbox>
               </div>
            </>) : null
         }
         <div className="row">
            {basicApplicationData.allowLogoutEndpoint && (
               <>
                  <RdsTextArea
                     label="Post Logout Redirect Uris"
                     placeholder="Enter uris"
                     onChange={e => setPostLogoutRedirectUris(e.target.value)}
                     value={basicApplicationData.postLogoutRedirectUris}
                     rows={3}
                     dataTestId="logout-redirect-uri"
                  />
               </>)
            }
         </div>
         {basicApplicationData.id && (
            <div className="row py-2">
               <RdsCheckbox
                  label="Enabled"
                  // onChange={true}
                  checked={basicApplicationData.enabled}
                  dataTestId="enabled"
               ></RdsCheckbox>
            </div>
         )}

      </>
   );
};

export default RdsCompApplicationWorkflows;
