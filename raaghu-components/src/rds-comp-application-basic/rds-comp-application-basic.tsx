import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsDropdownList, RdsInput, RdsLabel, RdsSelectList, RdsTextArea } from '../rds-elements';

export interface RdsCompApplicationBasicProps {
	typeList: any[];
	basicData?: any;
	scopesList: any[];
	consentType: any[];
	handleSubmit: React.EventHandler<any>;
	editApplicationData?: any;
}

const RdsCompApplicationBasic = (props: RdsCompApplicationBasicProps) => {

	const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);
	useEffect(() => {
		setBasicApplicationData(props.basicData);
	}, [props.basicData]);

	const [errorClientId, srrorClientId] = useState("");
	const [errorDisplayName, setErrorDisplayName] = useState("");
	const [errorType, setErrorType] = useState("");
	const checkboxes = [basicApplicationData.allowAuthorizationCodeFlow, basicApplicationData.allowHybridFlow, basicApplicationData.allowPasswordFlow];
	const isDisabled = checkboxes.length > 1 && !checkboxes.some((checkbox) => checkbox);

	function setClientId(value: any) {
		if (!value && value.length === 0) {
			srrorClientId("Client is invalid");
		} else {
			srrorClientId("");
		}
		setBasicApplicationData({ ...basicApplicationData, clientId: value })
	}
	function setDisplayName(value: any) {
		if (!value && value.length === 0) {
			setErrorDisplayName("Display name is invalid");
		} else {
			setErrorDisplayName("");
		}
		setBasicApplicationData({ ...basicApplicationData, displayName: value })
	}
	function setClientUrl(value: any) {
		setBasicApplicationData({ ...basicApplicationData, clientUri: value })
	}
	function setLogoUrl(value: any) {
		setBasicApplicationData({ ...basicApplicationData, logoUri: value })
	}
	function setCredential(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowAuthorizationCodeFlow: value })
	}
	function setDevice(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowDeviceEndpoint: value })
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
	function setRefresh(value: any) {
		setBasicApplicationData({ ...basicApplicationData, allowRefreshTokenFlow: value })
	}
	function setClientSecret(value: any) {
		;
		setBasicApplicationData({ ...basicApplicationData, clientSecret: value })
	}
	function setSelectedOption(value: any) {
		setBasicApplicationData({ ...basicApplicationData, type: value })
	}
	function setScopesOption(value: any) {
		setBasicApplicationData({ ...basicApplicationData, scopes: value })
	}
	function setConsentType(value: any) {
		setBasicApplicationData({ ...basicApplicationData, consentType: value })
	}


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};


    const isClientIdValid = (id: any) => {
		if (!id || id.length === 0) {
		  return false;
		}
		return true;
	  };
	
	  const isDisplayNameValid = (name: any) => {
		if (!name || name.length === 0) {
		  return false;
		}
		return true;
	  };

	  const isFormValid = isClientIdValid(basicApplicationData.clientId) && isDisplayNameValid(basicApplicationData.displayName)

	return (
		<>
			<div className="pt-3">
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
							<RdsInput
								label="Client Id"
								placeholder="Enter Id"
								inputType="text"
								onChange={(e:any) => setClientId(e.target.value)}
								value={basicApplicationData.clientId}
								name={"clientId"}
								required={true}
								dataTestId="client-id"
							></RdsInput>
							{errorClientId && <span className="text-danger">{errorClientId}</span>}
						</div>
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
							<RdsInput
							    required={true}
								label="Display Name"
								placeholder="Enter Display Name"
								inputType="text"
								onChange={e => setDisplayName(e.target.value)}
								name={"displayName"}
								value={basicApplicationData.displayName}
								dataTestId="display-name"
							></RdsInput>
							{errorDisplayName && <span className="text-danger">{errorDisplayName}</span>}
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
							<RdsInput
								label="Client Uri"
								placeholder="Enter Url"
								inputType="url"
								onChange={e => setClientUrl(e.target.value)}
								value={basicApplicationData.clientUri}
								name={"clientUrl"}
								required={false}
								dataTestId="client-url"
							></RdsInput>
						</div>
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
							<RdsInput
								label="Logo Uri"
								placeholder="Enter Uri"
								inputType="url"
								onChange={e => setLogoUrl(e.target.value)}
								name={"logoUrl"}
								value={basicApplicationData.logoUri}
								required={false}
								dataTestId="logo-url"
							></RdsInput>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
							<RdsLabel label="Type" class="pb-2" />
							<RdsSelectList
								label={"Type"}
								selectItems={props.typeList}
								selectedValue={basicApplicationData.type}
								onSelectListChange={setSelectedOption}
								dataTestId="type"
							></RdsSelectList>
							{errorType && <span className="text-danger">{errorType}</span>}
						</div>
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
						{basicApplicationData.type === 'confidential' && (
							<RdsInput
								label="Client Secrete"
								placeholder="Enter Secrete"
								inputType="text"
								onChange={e => setClientSecret(e.target.value)}
								name={"clientSecret"}
								value={basicApplicationData.clientSecret}
								dataTestId="client-secret"
							></RdsInput>
						)}
					</div>
					</div>
					
					{/* <div className="row">
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-0 mb-lg-3 mb-xl-3 mb-xxl-3">
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
								label="Allow Refresh Token Flow"
								onChange={e => { setRefresh(e.target.checked) }}
								checked={basicApplicationData.allowRefreshTokenFlow}
								isDisabled={isDisabled}
								dataTestId="refresh-flow"
							></RdsCheckbox>
						</div>
						<div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
							<RdsCheckbox
								classes="py-2"
								label="Allow Password Flow"
								onChange={e => { setPassword(e.target.checked) }}
								checked={basicApplicationData.allowPasswordFlow}
								dataTestId="password-flow"
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
					)} */}
					<div className="footer-buttons my-2 d-flex" >
						<RdsButton
							class="me-2"
							type={"button"}
							label="cancel"
							size="small"
							isOutline={true}
							colorVariant=""
							databsdismiss="offcanvas"
							databstoggle="offcanvas"
							databstarget="#application"
							dataTestId="cancel"
						></RdsButton>
						<RdsButton
							class="me-2"
							label="SAVE"
							type="submit"
							isOutline={false}
							colorVariant="primary"
							databsdismiss="offcanvas"
							size="small"
							isDisabled={!isFormValid}
							onClick={() => { props.handleSubmit(basicApplicationData) }}
							dataTestId="save"
						></RdsButton>
					</div>
				</form>
			</div>
		</>
	);
};
export default RdsCompApplicationBasic;
