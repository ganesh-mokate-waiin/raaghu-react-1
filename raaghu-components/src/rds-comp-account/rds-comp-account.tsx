import React, { FC, useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsDropdownList,
  RdsInput,
  RdsLabel,
  RdsSelectList,
} from "../../../raaghu-elements/src";

export interface RdsCompAccountProps {
  handleAccountSettings: any;
}
const RdsCompAccount = (props: any) => {
  const [accountGeneralData, setAccountGeneralData] = useState<any>(
    props.accountGeneralSettings
  );
  const [twoFactorData, settwoFactorData] = useState(
    props.accountTwoFactorSettings
  );
  const [externalProvider, setExternalProvider] = useState(
    props.accountExternalProvider
  );
  const [accountCaptchData, setaccountCaptchaData] = useState(
    props.accountCaptchaSettings
  );
  const [googleCheckbox, setGoogleCheckbox] = useState(<> </>);
  const [microsoftCheckBox, setMicrosoftCheckBox] = useState(<></>);
  const [twitterCheckBox, setTwitterCheckBox] = useState(<></>);
  let google = (
    <>
      <div className="row mt-2">
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={externalProvider[0].properties[0].value}
              name="displayName"
              label="Site Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e) => setGoogleSIteKey(e.target.value)}
            ></RdsInput>
            {/* Hello{googleData.propertiesData} */}
          </div>
        </div>
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={externalProvider[0].secretProperties[0].value}
              name="displayName"
              label="Secret Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e) => setGSecretKey(e.target.value)}
            ></RdsInput>
          </div>
        </div>
      </div>
    </>
  );

  let microsoft = (
    <>
      <div className="row mt-2">
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={externalProvider[1].properties[0].value}
              name="displayName"
              label="Site Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e: any) => setMSSiteKey(e.target.value)}
            ></RdsInput>
          </div>
        </div>
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={externalProvider[1].secretProperties[0].value}
              name="displayName"
              label="Secret Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e: any) => setMSSecretKey(e.target.value)}
            ></RdsInput>
          </div>
        </div>
      </div>
    </>
  );
  let twitter = (
    <>
      <div className="row mt-2">
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={externalProvider[2].properties[0].value}
              name="displayName"
              label="Site Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e: any) => setTSiteKey(e.target.value)}
            ></RdsInput>
          </div>
        </div>
        <div className="col-md-6 sm-p-0">
          <div className="form-group mb-4">
            <RdsInput
              value={
                externalProvider[2].secretProperties[0].value
                  ? externalProvider[2].secretProperties[0].value
                  : ""
              }
              name="displayName"
              label="Secret Key"
              placeholder=""
              required={true}
              customClasses="form-control"
              onChange={(e) => setTSecretKey(e.target.value)}
            ></RdsInput>
          </div>
        </div>
      </div>
    </>
  );

  const AccountData = (event: any) => {
    event.preventDefault();
  };
  const twoFactChange = (event: any) => {
    console.log(event.target.value);
    settwoFactorData({
      ...twoFactorData,
      twoFactorBehaviour: event.target.value,
    });
  };
  function setAccountAuthentication(value: boolean) {
    setAccountGeneralData({ ...accountGeneralData, enableLocalLogin: value });
  }
  function setUser(value: boolean) {
    settwoFactorData({ ...twoFactorData, usersCanChange: value });
  }
  function setBrowser(value: boolean) {
    settwoFactorData({ ...twoFactorData, isRememberBrowserEnabled: value });
  }
  function setLoginCapcha(value: boolean) {
    setaccountCaptchaData({ ...accountCaptchData, useCaptchaOnLogin: value });
  }
  function setRegistrationCapcha(value: boolean) {
    setaccountCaptchaData({
      ...accountCaptchData,
      useCaptchaOnRegistration: value,
    });
  }
  function setBaseUrl(value: any) {
    setaccountCaptchaData({ ...accountCaptchData, verifyBaseUrl: value });
  }
  function setVersion(value: any) {
    setaccountCaptchaData({ ...accountCaptchData, version: value });
  }
  function setScore(value: any) {
    setaccountCaptchaData({ ...accountCaptchData, score: value });
  }
  function setSiteKey(value: any) {
    setaccountCaptchaData({ ...accountCaptchData, siteKey: value });
  }
  function setSiteScore(value: any) {
    setaccountCaptchaData({ ...accountCaptchData, siteSecret: value });
  }
  function setSelfRegistration(value: boolean) {
    setAccountGeneralData({
      ...accountGeneralData,
      isSelfRegistrationEnabled: value,
    });
  }
  //Google
  function setGoogle(value: any) {
    externalProvider[0].enabled = value;
    if (value) {
      setGoogleCheckbox(google);
    } else {
      setGoogleCheckbox(<></>);
    }
    setExternalProvider(externalProvider);
  }
  function setGoogleSIteKey(value: any) {
    let data = externalProvider;
    data[0].properties[0].value = value;
    setExternalProvider(data);
  }

  function setGSecretKey(value: any) {
    let data = externalProvider;
    data[0].secretProperties[0].value = value;
    setExternalProvider(data);
  }

  //microsoft
  function setMicrosoft(value: boolean) {
    externalProvider[1].enabled = value;
    if (value) {
      setMicrosoftCheckBox(microsoft);
    } else {
      setMicrosoftCheckBox(<></>);
    }
    setExternalProvider(externalProvider);
  }
  function setMSSiteKey(value: any) {
    let data = externalProvider;
    data[1].properties[0].value = value;
    setExternalProvider(data);
  }
  function setMSSecretKey(value: any) {
    let data = externalProvider;
    data[1].secretProperties[0].value = value;
    setExternalProvider(data);
  }

  //twitter
  function setTwitter(value: boolean) {
    externalProvider[2].enabled;
    if (value) {
      setTwitterCheckBox(twitter);
    } else {
      setTwitterCheckBox(<></>);
    }
    setExternalProvider(externalProvider);
  }
  function setTSiteKey(value: any) {
    let data = externalProvider;
    data[2].properties[0].value = value;
    setExternalProvider(data);
  }
  function setTSecretKey(value: any) {
    let data = externalProvider;
    data[2].secretProperties[0].value = value;
    setExternalProvider(data);
  }

  useEffect(() => {
    setAccountGeneralData(props.accountGeneralSettings);

    settwoFactorData(props.accountTwoFactorSettings);

    setaccountCaptchaData(props.accountCaptchaSettings);

    setExternalProvider(props.accountExternalProvider);
  }, [props.accountGeneralSettings]);

  return (
    <div className="overflow-auto">
      <form onSubmit={AccountData}>
        <div className="border-bottom pb-2 text-muted mt-3 fw-bold">
          <RdsLabel label="General Settings" size="14px"></RdsLabel>
        </div>
        <div className="row">
          <div className="col-md-12 mt-4">
            <RdsCheckbox
              label="Enable self registration"
              onChange={(e) => {
                setSelfRegistration(e.target.checked);
              }}
              checked={accountGeneralData.isSelfRegistrationEnabled}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <RdsCheckbox
              label="Authentication With a Local Account"
              onChange={(e) => {
                setAccountAuthentication(e.target.checked);
              }}
              checked={accountGeneralData.enableLocalLogin}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="border-bottom pb-2 text-muted mt-3 fw-bold">
          <RdsLabel label="Two Factor Authentication" size="14px"></RdsLabel>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-6 col-12 mt-4">
          <RdsSelectList
            label="Select"
            selectItems={props.twoFactList}
            selectedValue={twoFactorData.twoFactorBehaviour}
            onSelectListChange={(e: any) => {
              twoFactChange(e);
            }}
            size="small"
          ></RdsSelectList>
        </div>
        <div className="row">
          <div className="col-md-12 mt-4">
            <RdsCheckbox
              label="Allow User to Change their two factor"
              checked={twoFactorData.usersCanChange}
              onChange={(e) => {
                setUser(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <RdsCheckbox
              label="Remember this browser"
              checked={twoFactorData.isRememberBrowserEnabled}
              onChange={(e) => {
                setBrowser(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="border-bottom pb-2 text-muted mt-4 fw-bold ">
          <RdsLabel label="Captcha" size="14px"></RdsLabel>
        </div>

        <div className="row">
          <div className="col-md-12 mt-4">
            <RdsCheckbox
              label="Use Security Image Questions(Captcha) On Login"
              checked={accountCaptchData.useCaptchaOnLogin}
              onChange={(e) => {
                setLoginCapcha(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <RdsCheckbox
              label="Use Security Image Questions(Captcha) On Registration"
              checked={accountCaptchData.useCaptchaOnRegistration}
              onChange={(e) => {
                setRegistrationCapcha(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-12 mt-3">
            <div className="form-group ">
              <label className="mb-2">
              Verify Base URL
              </label>
              <RdsInput
                size="medium"
                inputType="text"
                required={true}
                placeholder="Enter URL"
                customClasses="form-control"
                value={accountCaptchData.verifyBaseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                }}
              ></RdsInput>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-12 mt-3">
            <label className="mb-2">
              Version<span className="text-danger ms-2">*</span>
            </label>
            <RdsSelectList
              label="Select"
              selectItems={props.versionList}
              selectedValue={accountCaptchData.version}
              size="small"
              onSelectListChange={(e: any) => {
                setVersion(e.target.value);
              }}
            ></RdsSelectList>
          </div>

          <div className="col-xxl-4 col-xl-4 col-lg-4 col-12 mt-3">
            <div className="form-group ">
              <label className="mb-2">
                Score
              </label>
              <RdsInput
                name="score"
                required={true}
                size="medium"
                placeholder="Enter Score"
                customClasses="form-control"
                value={accountCaptchData.score}
                onChange={(e) => {
                  setScore(e.target.value);
                }}
              ></RdsInput>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-12">
            <div className="form-group ">
              <label className="mb-2">
                Site Key
              </label>
              <RdsInput
                name="score"
                labelPositon="top"
                required={true}
                placeholder="Enter URL"
                customClasses="form-control"
                value={accountCaptchData.siteKey}
                onChange={(e) => {
                  setSiteKey(e.target.value);
                }}
              ></RdsInput>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-12">
              <label className="mb-2">
                Site Secret
              </label>
            <RdsInput
              name="score"
              labelPositon="top"
              required={true}
              placeholder="Enter Secret"
              customClasses="form-control"
              value={accountCaptchData.siteSecret}
              onChange={(e) => setSiteScore(e.target.value)}
            ></RdsInput>
          </div>
        </div>
        <div className="border-bottom pb-2 text-muted mt-2 fw-bold">
          <RdsLabel label="External Provider" size="14px"></RdsLabel>
        </div>
        <div className="row pt-3">
          <div className="col-md-12 mb-1">
            <RdsCheckbox
              label="Google"
              checked={externalProvider[0].enabled}
              onChange={(e) => {
                setGoogle(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
          {googleCheckbox}
          <div className="col-md-12 mb-1">
            <RdsCheckbox
              label="Microsoft"
              checked={externalProvider[1].enabled}
              onChange={(e) => {
                setMicrosoft(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
          {microsoftCheckBox}
          <div className="col-md-12 mb-1">
            <RdsCheckbox
              label="Twitter"
              checked={externalProvider[2].enabled}
              onChange={(e) => {
                setTwitter(e.target.checked);
              }}
            ></RdsCheckbox>
          </div>
          {twitterCheckBox}
        </div>
        <div className=" d-flex bottom-0 pt-4 justify-content-end">
          <RdsButton
            class="me-2"
            label="CANCEL"
            type="button"
            isOutline={true}
            colorVariant="primary"
            size="small"
          ></RdsButton>
          <RdsButton
            label="SAVE"
            type="submit"
            onClick={() => {
              props.handleAccountSettings({
                accountCaptchData: accountCaptchData,
                externalProvider: externalProvider,
                accountGeneralData: accountGeneralData,
                twoFactorData: twoFactorData,
              });
            }}
            isOutline={false}
            colorVariant="primary"
            size="small"
          ></RdsButton>
        </div>
      </form>
    </div>
  );
};

export default RdsCompAccount;
