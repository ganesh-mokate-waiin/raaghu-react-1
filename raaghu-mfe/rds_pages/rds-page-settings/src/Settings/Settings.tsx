import React, { useState, useEffect } from "react";
import {
  RdsNavtabs,
} from "../../../../../raaghu-elements/src/index";
import {
  RdsCompIdentityManagement,
  RdsCompEmail,
  RdsCompAccount,
  RdsCompFeatureManagement,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  fetchAccountGeneralSettings,
  fetchCaptchaSettings,
  fetchEmailSettings,
  fetchExternalProviderSettings,
  fetchFeaturesSettings,
  fetchIdentitySettings,
  fetchTwoFactorSettings,
  restoreToDefaultFeaturesSettings,
  saveAccountCaptchaSettings,
  saveAccountExternalProviderSettings,
  saveAccountGeneralSettings,
  saveAccountTwoFactorSettings,
  saveEmailSettings,
  saveFeaturesSettings,
  saveIdentitySettings,
} from "../../../../libs/state-management/settings/settings-slice";
import { useTranslation } from "react-i18next";

interface RdsCompSettingsProps { }
const navtabsItems = [
  { label: "Email Settings", tablink: "#nav-home", id: 0 },
  { label: "Identity Management", tablink: "#nav-profile", id: 1 },
  { label: "Account", tablink: "#nav-profile", id: 2 },
  { label: "Feature Management", tablink: "#nav-profile", id: 3 },
];
const Settings = (props: RdsCompSettingsProps) => {
  const data = useAppSelector((state) => state.persistedReducer.settings);
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [emailSettings, setEmailSettings] = useState<any>({
    defaultFromDisplayName: "",
    defaultFromAddress: "",
    smtpHost: "",
    smtpPort: "",
    smtpEnableSsl: false,
    smtpUseDefaultCredentials: false,
    smtpUserName: "",
    smtpPassword: "",
    smtpDomain: "",
  });
  const { t } = useTranslation();

  const [identitySettings, setIdentitySettings] = useState<any>({
    lockout: {
      allowedForNewUsers: false,
      lockoutDuration: 10,
      maxFailedAccessAttempts: "",
    },
    password: {
      requiredLength: "",
      requiredUniqueChars: "",
      requireDigit: false,
      requireNonAlphanumeric: false,
      requireUppercase: false,
      requireLowercase: false,
    },
    signIn: {
      requireConfirmedEmail: false,
      requireConfirmedPhoneNumber: false,
      enablePhoneNumberConfirmation: false,
    },
    user: {
      isEmailUpdateEnabled: false,
      isUserNameUpdateEnabled: false,
    },
  });
  const [accountGeneralSettings, setAccountGeneralSettings] = useState<any>({
    enableLocalLogin: false,
    isSelfRegistrationEnabled: false,
  });
  const [accountTwoFactorSettings, setAccountTwoFactSettings] = useState<any>({
    isRememberBrowserEnabled: false,
    twoFactorBehaviour: 1,
    usersCanChange: false,
  });
  const [accountCaptchaSettings, setAccountCaptchaSettings] = useState<any>({
    score: "",
    siteKey: "",
    siteSecret: "",
    useCaptchaOnLogin: false,
    useCaptchaOnRegistration: false,
    verifyBaseUrl: "",
    version: "",
  });
  const [externalProviderSettings, setExternalProviderSettings] = useState<any>(
    [
      {
        enabled: false,
        name: "google",
        properties: [{ name: "ClientId", value: "" }],
        secretProperties: [{ name: "clientSecret", value: "" }],
      },
      {
        enabled: false,
        name: "microsoft",
        properties: [{ name: "ClientId", value: "" }],
        secretProperties: [{ name: "clientSecret", value: "" }],
      },
      {
        enabled: false,
        name: "twitter",
        properties: [{ name: "ConsumerId", value: "" }],
        secretProperties: [{ name: "ConsumerSecret", value: "" }],
      },
    ]
  );

  const [featureIdentitySettingsData, setfeatureIdentitySettings] =
    useState<any>([
      { value: "Optional" },
      { value: 8 },
      { value: true },
      { value: true },
      { value: true },
      { value: true },
      { value: true },
      { value: true },
    ]);

  const dispatch = useAppDispatch();
  function handleEmailSubmit(formData: any) {
    console.log("function of parent component", formData);
    dispatch(saveEmailSettings(formData) as any);
  }
  function saveIdentityData(data: any) {
    dispatch(saveIdentitySettings(data) as any);
  }

  function saveAccountData(data: any) {
    dispatch(saveAccountGeneralSettings(data.accountGeneralData) as any);
    dispatch(saveAccountTwoFactorSettings(data.twoFactorData) as any);
    dispatch(saveAccountCaptchaSettings(data.accountCaptchData) as any);
    dispatch(saveAccountExternalProviderSettings(data.externalProvider) as any);
  }

  useEffect(() => {

    dispatch(fetchEmailSettings() as any);

    dispatch(fetchIdentitySettings() as any);

    dispatch(fetchAccountGeneralSettings() as any);

    dispatch(fetchTwoFactorSettings() as any);

    dispatch(fetchCaptchaSettings() as any);

    dispatch(fetchExternalProviderSettings() as any);

    dispatch(fetchFeaturesSettings() as any);
  }, [dispatch]);

  useEffect(() => {
    if (data.emailSettings) {
      setEmailSettings(data.emailSettings);
    }
  }, [data.emailSettings]);

  useEffect(() => {
    if (data.identitySettings) {
      setIdentitySettings(data.identitySettings);
    }
  }, [data.identitySettings]);

  useEffect(() => {
    if (data.accountGeneralSettings) {
      setAccountGeneralSettings(data.accountGeneralSettings);
    }
  }, [data.accountGeneralSettings]);

  useEffect(() => {
    if (data.accountTwoFactorSettings) {
      setAccountTwoFactSettings(data.accountTwoFactorSettings);
    }
  }, [data.accountTwoFactorSettings]);

  useEffect(() => {
    if (data.accountCaptchaSettings) {
      setAccountCaptchaSettings(data.accountCaptchaSettings);
    }
  }, [data.accountCaptchaSettings]);

  useEffect(() => {
    if (data.accountExternalProvider) {
      let a = JSON.parse(
        JSON.stringify(data.accountExternalProvider.settings[0])
      );
      let b = JSON.parse(
        JSON.stringify(data.accountExternalProvider.settings[1])
      );
      let c = JSON.parse(
        JSON.stringify(data.accountExternalProvider.settings[2])
      );
      let temp = [];
      temp.push(a);
      temp.push(b);
      temp.push(c);
      setExternalProviderSettings(temp);
    }
  }, [data.accountExternalProvider]);

  useEffect(() => {
    if (data.featureIdentitySettings) {
      let tempFeatureData: any[] = [];
      data.featureIdentitySettings.groups.map((item: any) => {
        item.features.map((e: any) => {
          let data: any = {};
          if (e.value == "true" || e.value == "True") {
            data = {
              name: e.name,
              value: true,
            };
          } else if (e.value == "False" || e.value == "false") {
            data = {
              name: e.name,
              value: false,
            };
          } else {
            data = {
              name: e.name,
              value: e.value,
            };
          }
          tempFeatureData.push(data);
        });
      });
      console.log("features  data", tempFeatureData);
      // compData = tempFeatureData;
      setfeatureIdentitySettings(tempFeatureData);
    }
  }, [data.featureIdentitySettings]);

  function saveFeature(data: any) {

    const tempData: any[] = []
    data.map((e: any) => {
      const item = {
        value: String(e.value),
        name: e.name
      }
      tempData.push(item);
    })
    dispatch(saveFeaturesSettings({ features: tempData }) as any);
  }

  function restoreFeatures(data: any) {

    dispatch(restoreToDefaultFeaturesSettings(data) as any).then((res: any) => {
      dispatch(fetchFeaturesSettings() as any);
    });
  }

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row h-100">
        <div className="col-md-12">
          <div className="card border-0 px-4 gutter-b position-relative rounded-0 card-full-stretch">
            <RdsNavtabs
              navtabsItems={navtabsItems}
              type="tabs"
              activeNavtabOrder={(activeNavTabId) => {
                setActiveNavTabId(activeNavTabId);
              }}>
            </RdsNavtabs>
            {activeNavTabId == "0" && (
              <RdsCompEmail
                handleSubmit={(formData: any) => {
                  handleEmailSubmit(formData);
                }}
                emailSettings={emailSettings}>
              </RdsCompEmail>
            )}
            {activeNavTabId == "1" && (
              <RdsCompIdentityManagement
                handleIdentity={(data: any) => {
                  saveIdentityData(data);
                }}
                lockoutSettings={identitySettings.lockout}
                passwordSettings={identitySettings.password}
                signSettings={identitySettings.signIn}
                userSettings={identitySettings.user}
              ></RdsCompIdentityManagement>
            )}
            {activeNavTabId == "2" && (
              <RdsCompAccount
                versionList={[
                  { option: "2", value: 2 },
                  { option: "3", value: 3 },
                ]}
                twoFactList={[
                  { option: "Optional", value: 0 },
                  { option: "Disabled", value: 1 },
                  { option: "Forced", value: 2 },
                ]}
                accountGeneralSettings={accountGeneralSettings}
                accountTwoFactorSettings={accountTwoFactorSettings}
                accountCaptchaSettings={accountCaptchaSettings}
                accountExternalProvider={externalProviderSettings}
                handleAccountSettings={(data: any) => {
                  saveAccountData(data);
                }}
              ></RdsCompAccount>
            )}
            {activeNavTabId == "3" && (
              <RdsCompFeatureManagement
                featureIdentitySettingsData1={featureIdentitySettingsData}
                twoFactorList={[
                  { option: "Optional", value: "Optional" },
                  { option: "Disabled", value: "Disabled" },
                  { option: "Forced", value: "Forced" },
                ]}
                saveFeature={saveFeature}
                restoreFeatures={restoreFeatures}
              ></RdsCompFeatureManagement>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
