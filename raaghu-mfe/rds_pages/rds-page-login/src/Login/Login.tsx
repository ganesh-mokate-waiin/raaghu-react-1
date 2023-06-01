import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {RdsCompLogin} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { configurationService, localizationService, validateTenantByName } from "raaghu-react-core";

import {
  callLoginAction,
  invalidCredentialAction,
} from "../../../../libs/public.api";
import { Translation, useTranslation } from "react-i18next";
import { RdsDropdownList } from "../../../rds-elements";
import { RdsLabel } from "../../../rds-elements";
export interface LoginProps {
  onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const [Alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t,i18n } = useTranslation();
  const loginData = useAppSelector((state) => state.persistedReducer.host);
  useEffect(() => {
    setAlert({
      ...Alert,
      message: loginData.invalidCredential?.message,
      show: loginData.invalidCredential?.invalid,
    });
  }, [loginData.invalidCredential]);
  useEffect(() => {
    dispatch(callLoginAction(null) as any);
    dispatch(invalidCredentialAction({ invalid: false, message: "" }) as any);
  }, []);

  function loginHandler(email: any, password: any, rememberMe: boolean) {
    dispatch(callLoginAction({ email, password }) as any);
    localStorage.setItem("rememberMe", 'true');
  }

  const [validateTenantName, setValidateTenantName] = useState("Not Selected");
  function validateTenant(data: any) {
    validateTenantByName(data).then((res) => {
      if (res.isActive) {
        setValidateTenantName(data);
      } else {
        setValidateTenantName("Not Selected");
      }
     
    }
    ).catch((err)=>{
      setValidateTenantName("Not Selected")
    })

    
  }
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("currentLang")|| "en-GB");
  const [currentLanguageIcon, setCurrentLanguageIcon] = useState("");
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("");
  const [languageData, setLanguageData] = useState<any[]>([]);

  const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {};
  const registerHandler: any = (isRegisterClicked: boolean) => {};


  const handlerDismissAlert = () => {
    dispatch(
      invalidCredentialAction({
        invalid: false,
        message: "",
      }) as any
    );
  };
  const emailHandler =()=>{
    handlerDismissAlert()
  }
  const passwordHandler =()=>{
    handlerDismissAlert()
  }

  const configLocalization=()=> {
    configurationService(currentLanguage).then(async (res: any) => {
      if(currentLanguage=="ar"){
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      }
      else {
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      }

      const tempdata: any[] = await res.localization?.languages?.map(
        (item: any) => {
          return {
            label: item.displayName,
            val: item.cultureName,
            icon:
              item.flagIcon !== null
                ? item.flagIcon
                : item.twoLetterISOLanguageName,
            iconWidth: "20px",
            iconHeight: "20px",
          };
        }
      );
      let index = tempdata.findIndex((item: any) => item.val === currentLanguage);
      index = index == -1 ? 0 : index;
      setCurrentLanguageLabel(tempdata[index].label);
      setCurrentLanguageIcon(tempdata[index].icon);
      setLanguageData(tempdata);

      localizationService(currentLanguage).then((resp: any) => {
        let data2 = {};
        const translation = resp?.resources;
        if (translation) {
          Object.keys(translation).forEach((key) => {
            Object.keys(translation[key].texts).map((k1) => { 
              let k2 = k1.replace(/[a-zA-Z]{0,20}[^\w\s]/gi,"");
              let k4 = k2.replace(/([a-z])([A-Z])/g, '$1 $2');
              let value1 = translation[key].texts[k1];
              data2 = { ...data2, [k4]: value1 };
            });
          });
          i18n.addResourceBundle(
            currentLanguage,
            "translation",
            data2,
            false,
            true
          );
          i18n.changeLanguage(currentLanguage);
        }
      });
    });
  }
  useEffect(() => {
    configLocalization();
  }, [currentLanguage]);

  
  const onClickHandler = (e: any, val: any) => {
    localStorage.setItem("currentLang",val)
    setCurrentLanguage(val);
  };

  return (
    <div className="login-background">
      <div className="align-items-center d-flex justify-content-center vh-100 m-auto login-container login">
        <div className="container-fluid m-2">
          <div className="bg-white row rounded-3 ">
            <div className="col-md-6">
              <div className="py-4 px-3">
              <div className="col-md-1 ps-2 justify-content-end w-100">
                <RdsDropdownList
              labelIcon={currentLanguageIcon}
              labelIconWidth='18px'
              labelIconHeight='18px'
              placeholder={currentLanguageLabel}
              icon={currentLanguageIcon}
              iconFill={false}
              iconStroke={false}
              isIconPlaceholder={true}
              isPlaceholder={false}
              id={"languageDropdown"}
              listItems={languageData}
              onClick={onClickHandler}
            ></RdsDropdownList> 
                </div>
                <div className="pb-4">
                  <div className="text-center">
                    <img src="./assets/raaghu_text_logo.svg"></img>
                  </div>
                </div>
                <RdsCompLogin
                  email={"" || loginData.callLogin?.email}
                  password={"" || loginData.callLogin?.password}
                  onLogin={loginHandler}
                  onEmailChange={emailHandler}
                  onPasswordChange={passwordHandler}
                  error={Alert}
                  onDismissAlert={handlerDismissAlert}
                  onForgotPassword={forgotPasswordHandler}
                  validTenant={validateTenant}
                  getvalidTenantName={validateTenantName}
                  currentTenant={""}
                  onRegister={registerHandler}                />
              </div>
            </div>
            <div
              className="col-md-6 order-1 order-sm-2 rounded-end position-relative align-items-center p-0 login-card-height d-none d-lg-block"
              style={{
                backgroundImage: "url(../assets/bg_1.png)",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#000;",
              }}
            >
              <video id="myVideo" className="video" autoPlay muted loop>
                <source src="../assets/Comp1.mp4" type="video/mp4" />
              </video>
              <div className="raghu1">
                <img src="../assets/fg_raaghu.png"></img>
              </div>
              <div className="wrap">
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
