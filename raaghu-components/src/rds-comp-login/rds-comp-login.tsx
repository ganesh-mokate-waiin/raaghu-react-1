import React, { useEffect, useState } from "react";
import {
  RdsLabel,
  RdsButton,
  RdsInput,
  RdsCheckbox,
  RdsModal,
  RdsAlert,
} from '../rds-elements';
import "./rds-comp-login.css";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
export interface RdsCompLoginProps {
  error?: any;
  getvalidTenantName: string;
  email: string;
  password: string;
  onDismissAlert?: () => any;
  onEmailChange?: () => any;
  onPasswordChange?: () => any;
  onLogin: (email: string, password: string, rememberMe: boolean) => any;
  onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
  onRegister: (isRegisterClicked?: boolean) => void;
  currentTenant: any;
  validTenant: any;
}

const RdsCompLogin = (
  props: RdsCompLoginProps
) => {
  const [email, setEmail] = useState(props.email);
  const [Alert, setAlert] = useState(props.error);
  const navigate = useNavigate();
  const [password, setPassword] = useState(props.password);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);

  useEffect(() => {
    if (props.email) {
      setEmail(props.email);
    }
  }, [props.email]);

  //side effect of props.error
  useEffect(() => {
    setAlert(props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.password) {
      setPassword(props.password);
    }

  }, [props.password]);

  useEffect(() => {
    setCurrentTenant(props.currentTenant);
  }, [props.currentTenant]);

  const onCheckedHandler = (e: any) => {
    setrememberMe(e.target.checked);
  };

  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    }
    return true;
  };
  const isPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };
  const emailhandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.onEmailChange && props.onEmailChange();
    setEmail(event.target.value);
  };
  const passwordhandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.onPasswordChange && props.onPasswordChange();
    setPassword(event.target.value);
  };
  const TenancyNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrentTenant(event.target.value);
  };

  const isFormValid = isPasswordValid(password) && isEmailValid(email);

  const handleSubmit: any = (event: any) => {
    // event.preventDefault();
    props.onLogin(email, password, rememberMe);
    // setEmail("");
    // setPassword("");
  };

  const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {
    setIsForgotPasswordClicked(true);
    navigate("/forgot-password");
    props.onForgotPassword(isForgotPasswordClicked);
    console.log(isForgotPasswordClicked);
  };
  const registerHandler: any = (isRegisterClicked: boolean) => {
    setIsRegisterClicked(true);
    navigate("/register");
    props.onRegister(isRegisterClicked);
    console.log(isRegisterClicked);
  };
  const [checked, setChecked] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(
    checked ? props.currentTenant : "Not Selected"
  );
  return (
    <div>
      <div className="text-center">
        <h2>
          <b> Login </b>
        </h2>
        <div className="pb-1">
          <small className="pb-2 d-flex justify-content-center">
            <RdsLabel
              label={`current tenant:` + props.getvalidTenantName}
            ></RdsLabel>
            <span className="ms-1">
              <RdsModal
                modalId="modal1"
                modalAnimation="modal fade"
                showModalFooter={false}
                showModalHeader={true}
                scrollable={false}
                verticallyCentered={false}
                modalbutton={<a className="link-primary"> (Change)</a>}
                modalTitle="Switch Tenant"
                // saveChangesName={`${
                //   checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                // }`}
                cancelButtonName="CANCEL"
              >
                <div className="text-start  mb-4 border-bottom">
                  <div className="form-check form-switch text-start ps-0 mb-4">
                    {/* <input
                      className="form-check-input"
                      type="rememberMe"
                      role="switch"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    >
                      Switch to tenant
                    </label> */}
                    <RdsCheckbox label={`${checked ? "Switch to the Tenant" : "Switch to the Host"
                      }`}
                      checked={checked} isSwitch={checked}
                      onChange={() => setChecked(!checked)}
                      dataTestId="swtich-checkbox"
                    ></RdsCheckbox>
                  </div>
                  <RdsInput
                    label="Tenancy Name"
                    placeholder="Tenancy Name"
                    inputType="email/text"
                    onChange={TenancyNameChange}
                    value={currentTenant}
                    name={"currentTenant"}
                    required={true}
                    isDisabled={!checked}
                    dataTestId="tenancy-name"
                  ></RdsInput>
                </div>
                <div className=" mb-2 mt-3 d-flex justify-content-end">
                  <RdsButton
                    class="me-2"
                    tooltipTitle={""}
                    type={"button"}
                    label="Cancel"
                    colorVariant="outline-primary"
                    size="small"
                    databsdismiss="modal"
                    dataTestId="cancel"
                  ></RdsButton>
                  <RdsButton
                    class="me-2"
                    label={
                      checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                    }
                    size="small"
                    isDisabled={false}
                    colorVariant="primary"
                    tooltipTitle={""}
                    type={"submit"}
                    databsdismiss="modal"
                    onClick={() => {
                      props.validTenant(currentTenant);
                      setChecked(!checked);
                    }}
                    dataTestId="switch-btn"
                  ></RdsButton>
                </div>
              </RdsModal>
            </span>
          </small>
        </div>
        <div>
          <div className="invalid-popup mb-2 pb-1">
            {Alert.show && (
              <div>
                <RdsAlert
                  dismisable={true}
                  alertmessage={Alert?.message + "   "}
                  colorVariant="danger"
                  onDismiss={props.onDismissAlert}
                  reset={Alert?.show}
                />
              </div>
            )}
          </div>

          <div className="form-group text-start">
            <RdsInput
              label="Email/Username"
              placeholder="Email/Username"
              inputType="email/text"
              onChange={emailhandleChange}
              value={email}
              name={"email"}
              required={true}
              dataTestId="username"
            ></RdsInput>
          </div>

          <div className="form-group text-start ">
            <RdsInput
              required={true}
              label="Password"
              placeholder="Password"
              inputType="password"
              onChange={passwordhandleChange}
              name={"password"}
              value={password}
              dataTestId="password"
            ></RdsInput>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div>
              <div className="form-group mb-3">
                <RdsCheckbox
                  label={"Remember me"}
                  checked={rememberMe}
                  onChange={onCheckedHandler}
                  dataTestId="remember-me"
                ></RdsCheckbox>
              </div>
            </div>
            <div>
              <a
                className="link-primary text-decoration-none float-end"
                href="javascript:void(0)"
                onClick={forgotPasswordHandler}
              >
                Forgot password ?
              </a>
            </div>
          </div>
          <RdsButton
            label="Login"
            colorVariant="primary"
            showLoadingSpinner={true}
            isDisabled={!isFormValid}
            block={true}
            tooltipTitle={""}
            // type="submit"
            onClick={handleSubmit}
            dataTestId="login"
          />
          <div className="mt-3">
            <p>Don't Have An Account  <span><a
              className="link-primary text-decoration-none"
              href="javascript:void(0)"
              onClick={registerHandler}
            >
              Register
            </a></span></p>
          </div>

          <div className="pt-2">
            <RdsLabel
              class="text-mute pt-2 secondary "
              label="©2023 WAi Technologies. All rights reserved"
              size="0.7rem"
            ></RdsLabel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdsCompLogin;
