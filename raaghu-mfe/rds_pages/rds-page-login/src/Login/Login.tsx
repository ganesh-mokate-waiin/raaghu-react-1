import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {RdsCompLogin} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { validateTenantByName } from "raaghu-react-core";
import {
  callLoginAction,
  invalidCredentialAction,
} from "../../../../libs/public.api";
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
  const { i18n } = useTranslation();
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

  const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {};
  const registerHandler: any = (isRegisterClicked: boolean) => {};
  const { t } = useTranslation();

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

  return (
    <div className="login-background">
      <div className="align-items-center d-flex justify-content-center vh-100 m-auto login-container">
        <div className="container-fluid m-2">
          <div className="bg-white row rounded-3 ">
            <div className="col-md-6">
              <div className="py-4 px-3">
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
