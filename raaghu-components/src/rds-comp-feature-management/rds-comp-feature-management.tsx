import React, { FC, useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsCounter,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsSelectList,
} from '../rds-elements';

export interface RdsCompFeatureManagementProps {
  featureIdentitySettingsData1?: any;
  saveFeature: any;
  compData?: any;
  twoFactorList?: any;
  restoreFeatures?: (Event: React.MouseEvent<HTMLButtonElement>,) => void;
}

const navtabsItems = [
  { label: "Identity", tablink: "#nav-home", id: 0 },
  { label: "Language Management", tablink: "#nav-profile", id: 1 },
  { label: "Text Template Management", tablink: "#nav-profile", id: 2 },
  { label: "Audit Logging", tablink: "#nav-profile", id: 3 },
];

const RdsCompFeatureManagement = (props: RdsCompFeatureManagementProps) => {
  const [activeNavTabId, setActiveNavTabId] = useState(0);
  const [featureIdentitySettingsData, setfeatureIdentitySettingsData] = useState<any>(props.featureIdentitySettingsData1)
  const [a, setA] = useState(featureIdentitySettingsData[0].value)
  const twoFactChange = (event: any) => {

    setA(event.target.value);
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 2) {
        return { ...curElem, value: event.target.value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  };



  useEffect(() => {
    setfeatureIdentitySettingsData(props.featureIdentitySettingsData1);
    setA(props.featureIdentitySettingsData1[0].value);
  }, [props.featureIdentitySettingsData1]);



  function saveFeaturesData() {
    let tempdata: any[] = [];


    props.featureIdentitySettingsData1.forEach((element: any, index: number) => {
      if (element.value != featureIdentitySettingsData[index].value) {
        tempdata.push(featureIdentitySettingsData[index]);
      }
    });

    props.saveFeature(tempdata);
  }


  function setLDAP(value: boolean) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 2) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }

  function setOAuthLogin(value: boolean) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 3) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }
  function setLanguage(value: boolean) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 4) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }

  function setTextTemplate(value: boolean) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 5) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }

  function setAuditLog(value: boolean) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 6) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }

  function setMaxUser(value: string) {
    let tempdata = featureIdentitySettingsData.map((curElem: any, index: any) => {
      if (index === 1) {
        return { ...curElem, value: value }
      }
      else return curElem;
    })
    setfeatureIdentitySettingsData(tempdata);
  }


  return (

    <>
    <div className="row">
      <div className="col-xxl-3 col-xl-3 col-lg-3 col-12 d-xxl-block d-xl-block d-lg-block d-md-table d-flex pb-4 pt-4">
        <RdsNavtabs
          navtabsItems={navtabsItems}
          type="vertical"
          fill={false}
          justified={false}
          activeNavtabOrder={(activeNavTabId) => {
            setActiveNavTabId(activeNavTabId);
          }}
        />
      </div>

      <div className="col-xxl-9 col-xl-9 col-lg-9 col-12 pb-4">
        {activeNavTabId == 0 && (
          <>
            <form >
              <div className="text-muted pt-4 mb-2">
                <RdsLabel
                  label="Two Factor Authentication"
                  size="14px"
                ></RdsLabel>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-8 col-12 mb-2">
                <RdsSelectList
                  label="Select"
                  selectItems={props.twoFactorList}
                  // selectedValue={a}
                  onSelectListChange={(e: any) => {
                    twoFactChange(e)
                  }}
                  size="medium"
                ></RdsSelectList>
              </div>
              <h6 className="text-muted mt-1">
                Set two factor behaviour.Optional values:Optional,Disabled,Forced
              </h6>
              <div className="col-xxl-4 col-xl-4 col-lg-8 col-12 text-muted mt-4 ">
                <div className="form-group ">
                  <RdsInput
                    size="medium"
                    label="Maximum User Count "
                    inputType="text"
                    isDisabled={false}
                    readonly={false}
                    placeholder="Enter Length"
                    required={true}
                    value={featureIdentitySettingsData[1].value}
                    onChange={(e: any) => setMaxUser(e.target.value)}
                    dataTestId="max-user-count"
                  ></RdsInput>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <RdsCheckbox
                  label="LDAP Login"
                  checked={featureIdentitySettingsData[2].value}
                  onChange={(e: any) => {
                    setLDAP(e.target.checked);
                  }}
                  dataTestId="ldap-login"
                ></RdsCheckbox>
              </div>
              <div className="col-md-12 mt-3">
                <RdsCheckbox
                  label="OAuth Login"
                  checked={featureIdentitySettingsData[3].value}
                  onChange={(e: any) => {
                    setOAuthLogin(e.target.checked);
                  }}
                  dataTestId="oauth-login"
                ></RdsCheckbox>
              </div>
            </form>
          </>
        )}
        {activeNavTabId == 1 && (
          <>
            <div className="col-md-12 mt-5">
              <RdsCheckbox
                label="Enable language Management"
                checked={featureIdentitySettingsData[4].value}
                onChange={(e: any) => {
                  setLanguage(e.target.checked);
                }}
                dataTestId="language-management"
              ></RdsCheckbox>
            </div>
            <h6 className="text-muted my-2">
              Enable language management system in the application.
            </h6>
          </>
        )}
        {activeNavTabId == 2 && (
          <>
            <div className="col-md-12 mt-5">
              <RdsCheckbox
                label="Enable text template Management"
                checked={featureIdentitySettingsData[5].value}
                onChange={(e: any) => {
                  setTextTemplate(e.target.checked);
                }}
                dataTestId="text-template-management"
              ></RdsCheckbox>
            </div>
            <h6 className="text-muted my-2">
              Enable text management system in the application.
            </h6>
          </>
        )}
        {activeNavTabId == 3 && (
          <>
            <div className="col-md-12 mt-5">
              <RdsCheckbox
                label="Enable Audit logging page"
                checked={featureIdentitySettingsData[6].value}
                onChange={(e: any) => {
                  setAuditLog(e.target.checked);
                }}
                dataTestId="audit-logging"
              ></RdsCheckbox>
            </div>
            <h6 className="text-muted my-2">
              Enable audit logging page in the application.
            </h6>
           
          </>
        )}
      </div>
    </div>
     <div className="align-items-end bg-transparent d-lg-flex d-md-flex d-xl-flex d-xxl-flex end-0 h-100 justify-content-end position-sm-relative pt-0 pt-4 footer-buttons">
     <div className="mb-3">
       <RdsButton
         class="me-2"
         label="Restore to default"
         type="button"
         isOutline={true}
         onClick={props.restoreFeatures}
         colorVariant="primary"
         size="small"
         dataTestId="restore-default"
       ></RdsButton>
     </div>
     <div className="mb-3">
       <RdsButton
         class="me-2"
         label="CANCEL"
         type="button"
         isOutline={true}
         colorVariant="primary"
         size="small"
         dataTestId="cancel"
       ></RdsButton>
     </div>
     <div className="mb-3">
       <RdsButton
         label="SAVE"
         type="submit"
         onClick={saveFeaturesData}
         isOutline={false}
         colorVariant="primary"
         size="small"
         dataTestId="save"
       ></RdsButton>
     </div>
   </div>
   </>
  );
};

export default RdsCompFeatureManagement;
