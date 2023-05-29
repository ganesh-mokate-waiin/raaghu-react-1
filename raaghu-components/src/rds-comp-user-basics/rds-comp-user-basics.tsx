import React, { useState, useRef, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsSelectList } from '../rds-elements';
// import img from "./assets/edit-profile";

export interface RdsCompUserBasicsProps {
  userData?: any;
  organizationUnit?: any;
  roles?: any;
  createUser?: any
  isEdit?: boolean;
}

const RdsCompUserBasics = (props: RdsCompUserBasicsProps) => {
  const [organizationUnit, setOrganizationUnit] = useState(
    props.organizationUnit
  );

  const [roles, setRoles] = useState(props.roles);

  const [userData, setUserData] = useState<any>(props.userData);



  const setName = (event: any) => {
    setUserData({ ...userData, name: event.target.value })
    props.createUser({ ...userData, name: event.target.value })
  };

  const setSurname = (event: any) => {
    setUserData({ ...userData, surname: event.target.value })
    props.createUser({ ...userData, surname: event.target.value })
  };

  const setEmail = (event: any) => {
    setUserData({ ...userData, email: event.target.value })
    props.createUser({ ...userData, email: event.target.value })
  };

  const setPassword = (event: any) => {
    setUserData({ ...userData, password: event.target.value })
    props.createUser({ ...userData, password: event.target.value })
  };

  const setUserName = (event: any) => {

    setUserData({ ...userData, userName: event.target.value })
    props.createUser({ ...userData, userName: event.target.value })
  };

  const setPhoneNumber = (event: any) => {
    setUserData({ ...userData, phoneNumber: event.target.value })
    props.createUser({ ...userData, phoneNumber: event.target.value })
  };

  function setOrganizationUnitData(value: any) {

    //setUserData({...userData, organizationUnitIds:[value]})
    //props.createUser()
  }
  function setRolesData(value: any) {

    //setUserData({...userData, roleNames:[value]})
  }
  function handletwoFactorEnable(event: any) {
    //setUserData({...userData, twoFactorEnabled:event.target.checked})
  }
  function handleIsActive(event: any) {
    setUserData({ ...userData, isActive: event.target.checked })
    props.createUser({ ...userData, isActive: event.target.checked })
  }
  function handleLockoutEnabled(event: any) {
    setUserData({ ...userData, lockoutEnabled: event.target.checked })
    props.createUser({ ...userData, lockoutEnabled: event.target.checked })
  }



  useEffect(() => {
    setUserData(props.userData)
  }, [props.userData])

  useEffect(() => {
    setOrganizationUnit(props.organizationUnit)
  }, [props.organizationUnit])

  useEffect(() => {
    setOrganizationUnit(props.organizationUnit);
    setRoles(props.roles)
  }, [props.roles])

  return (
    <>
      <form className="mt-2">
        <div className="flex-column-reverse flex-lg-row flex-md-row row">
          <div className="col-lg-6 col-md-6">
            <RdsInput
              value={userData.name}
              placeholder="Enter Name"
              inputType="text"
              label="Name"
              name="name"
              required={true}
              onChange={(e) => { setName(e) }}
            ></RdsInput>
          </div>
          <div className="col-lg-6 col-md-6">
            <RdsInput
              value={userData.surname}
              placeholder="Enter Surname"
              inputType="text"
              label="Surname"
              name="surName"
              required={false}
              onChange={(e) => { setSurname(e) }}
            ></RdsInput>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="">
              <RdsInput
                value={userData.email}
                placeholder="Enter Email"
                inputType="email"
                label="Email Address"
                name="email"
                required={true}
                onChange={(e) => { setEmail(e) }}
              ></RdsInput>
            </div>
          </div>
          {!props.isEdit && (<div className="col-lg-6 col-md-6">
            <div className="">
              <RdsInput
                value={userData.password}
                inputType="password"
                label="Password"
                placeholder="Enter Password"
                name="password"
                required={true}
                onChange={(e) => { setPassword(e) }}
              ></RdsInput>
            </div>
          </div>)}
        </div>
        <div className="row mb-3">
          <div className="col-lg-6 col-md-6">
            <div className="mb-2">
              <RdsInput
                value={userData.userName}
                placeholder="Enter Username"
                inputType="text"
                label="User Name"
                name="userName"
                required={false}
                onChange={(e) => { setUserName(e) }}
              ></RdsInput>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="mb-2">
              <RdsInput
                value={userData.phoneNumber}
                placeholder="Enter Phone"
                inputType="number"
                label="Phone Number"
                name="phone"
                required={false}
                onChange={(e) => { setPhoneNumber(e) }}
              ></RdsInput>
            </div>
          </div>

        </div>
        {props.isEdit && (<div className="row">
          <div className="mb-2 ">
            <RdsCheckbox
              id="0"
              label="Two Factor Authentication"
              checked={userData.twoFactorEnabled}
              onChange={e => { handletwoFactorEnable(e) }}
            ></RdsCheckbox>
          </div>
        </div>)}
        <div className="row my-2">
          <div className="mb-2 ">
            <RdsCheckbox
              id="0"
              label="Active"
              checked={userData.isActive}
              onChange={e => { handleIsActive(e) }}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="row my-2">
          <div className="mb-2 ">
            <RdsCheckbox
              id="0"
              label="Account Lockout"
              checked={userData.lockoutEnabled}
              onChange={e => { handleLockoutEnabled(e) }}
            ></RdsCheckbox>
          </div>
        </div>
      </form >
    </>
  );
};

export default RdsCompUserBasics;
