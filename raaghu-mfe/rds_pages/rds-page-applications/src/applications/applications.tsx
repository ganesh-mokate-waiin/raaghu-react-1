import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsNavtabs,
  RdsOffcanvas,
  RdsInput,
  RdsAlert
} from "../../../rds-elements";
import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompApplicationBasic,
  RdsCompPermissionTree,
  RdsCompApplicationWorkflows,
  RdsCompApplicationScopes
} from "../../../rds-components";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { fetchApplications, deleteApplications, saveApplications, getScopes, getApplications, updateApplications, getPermission, updatePermission } from "../../../../libs/state-management/applications/applications-slice";

const Applications = () => {
  const dispatch = useAppDispatch();
  const offCanvasHandler = () => { };
  const application = useAppSelector((state) => state.persistedReducer.applications);
  const [applicationId, setApplicationId] = useState("");
  const [permissionKeyName, setPermissionKeyName] = useState("");
  const [activeNavTabId, setActiveNavTabId] = useState();
  const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState<any>(0);
  const [editApplicationData, setEditApplicationData] = useState<any>({});
  const { t } = useTranslation();
  const [basicApplicationData, setBasicApplicationData] = useState<any>({
    clientId: '',
    displayName: '',
    type: '',
    clientSecret: '',
    consentType: '',
    postLogoutRedirectUris: [''],
    redirectUris: [''],
    allowPasswordFlow: false,
    allowClientCredentialsFlow: false,
    allowAuthorizationCodeFlow: false,
    allowRefreshTokenFlow: false,
    allowHybridFlow: false,
    allowImplicitFlow: false,
    allowLogoutEndpoint: false,
    allowDeviceEndpoint: false,
    scopes: [''],
    clientUri: '',
    logoUri: '',
  })


  useEffect(() => {
    dispatch(fetchApplications() as any);
    dispatch(getScopes() as any);

  }, [dispatch]);

  useEffect(() => {
    let tempData: any[] = [];
    if (application.applications?.items) {
      application.applications.items.map((e: any) => {
        const item = {
          id: e.id,
          clientId: e.clientId,
          displayName: e.displayName,
          type: e.type
        }
        tempData.push(item);
      })
      setApplicationData(tempData)
    }
  }, [application.applications]);

  useEffect(() => {
    let tempScopes: any[] = [];
    if (application.scopes && application.scopes.length > 0) {
      application.scopes.map((e: any) => {
        const item = {
          id: e.id,
          label: e.name,
          value: e.name
        }
        tempScopes.push(item);
      })
      setScopesListData(tempScopes);
    }
  }, [application.scopes]);

  useEffect(() => {
    if (application.permission && application.permission.groups.length > 0) {
      setPermissionListData(application.permission.groups);
    }
  }, [application.permission]);

  useEffect(() => {
    if (application.editApplication) {
      const tempData = { ...application.editApplication }
      setEditApplicationData(tempData)
    }
  }, [application.editApplication]);

  const [tableDataId, setTableDataRowId] = useState(0);
  const [tableDisplayName, settableDisplayName] = useState();
  const scopeSelection = (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);
    settableDisplayName(rowData.clientId);
    const tempApplicationId = String(rowData.id)

    setTableDataRowId(rowData.id);
    setApplicationId(tempApplicationId)
    setPermissionKeyName(rowData.clientId)
    dispatch(getApplications(tempApplicationId) as any);
    dispatch(getPermission(rowData.clientId) as any);
  };
  function onDeleteHandler(e: any) {
    const tableDataIndex = String(tableDataId)
    dispatch(deleteApplications(tableDataIndex) as any).then((res: any) => {
      dispatch(fetchApplications() as any);
    })
    e.preventDefault();
  }

  function handleApplicationSubmit(basicApplicationData: any) {


    dispatch(saveApplications(basicApplicationData) as any).then((res: any) => {
      dispatch(fetchApplications() as any);
    })
    setBasicApplicationData({
      clientId: '',
      displayName: '',
      clientUri: '',
      clientSecret: '',
      logoUri: '',
      consentType: '',
      postLogoutRedirectUris: [''],
      redirectUris: [''],
      allowAuthorizationCodeFlow: false,
      allowDeviceEndpoint: false,
      allowImplicitFlow: false,
      allowHybridFlow: false,
      allowPasswordFlow: false,
      allowClientCredentialsFlow: false,
      allowLogoutEndPoint: false,
      allowRefreshTokenFlow: false,
      type: '',
      scopes: [''],
    })
    setAlertOne(true);
  }

  function handleEditSubmit(data: any) {
    const payload = {
      id: applicationId,
      body: data
    }
    dispatch(updateApplications(payload) as any).then((res: any) => {
      dispatch(fetchApplications() as any);
    })
    setAlertOne(true);
  }

  function SelectesPermissions(permissionsData: any) {
    setSelectedPermissionListData(permissionsData)
  }

  function handleSelectesPermission() {

    const permissions: any = {
      key: permissionKeyName,
      permissions: {
        permissions: selectedPermissionListData
      }
    }
    dispatch(updatePermission(permissions) as any);
    setAlertOne(true);
  }


  const tableHeaders = [
    {
      displayName: "Client Id",
      key: "clientId",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Display Name",
      key: "displayName",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Type",
      key: "type",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    }
  ];

  const actions = [
    { id: "edit", displayName: "Edit", offId: "application-edit-off" },
    { id: "delete", displayName: "Delete", modalId: "application-delete-off" },

  ];
  const navtabsItems = [
    { label: "Basics", tablink: "#nav-home", id: 0 },
    { label: "Workflows", tablink: "#nav-role", id: 1 },
    { label: "Scopes", tablink: "#nav-org", id: 2 },
  ];

  const navtabsEditItems = [
    { label: "Basics", tablink: "#nav-home", id: 0 },
    { label: "Workflows", tablink: "#nav-role", id: 1 },
    { label: "Scopes", tablink: "#nav-org", id: 2 },
    { label: "Permissions", tablink: "#nav-profile", id: 3 }
  ];

  const [applicationData, setApplicationData] = useState<any>([]);
  const [scopesListData, setScopesListData] = useState<any>([]);
  const [permissionListData, setPermissionListData] = useState<any>([]);
  const [selectedPermissionListData, setSelectedPermissionListData] = useState<any>([]);
  // const offCanvasHandler = () => { };
  const [activeNavTabEditId, setActiveNavTabEditId] = useState("0");

  const [showNextTab, setShowNextTab] = useState(false);
  const typeList: any[] = [
    { option: 'Confidential client', value: 'confidential' },
    { option: 'Public client', value: 'public' },
  ];

  const consentType: any[] = [
    { option: 'Explicit consent', value: 'explicit' },
    { option: 'External consent', value: 'external' },
    { option: 'Implicit consent', value: 'implicit' },
    { option: 'Systematic consent', value: 'systematic' },
  ]
  // const [selctedValue , setselctedValue] = useState({claimType : 12 , claimValue:2})
  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
  const [alertOne, setAlertOne] = useState(false);
  useEffect(() => {

    setAlert({
      showAlert: application.alert,
      message: application.alertMessage,
      success: application.success,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        message: "",
        success: false,
      });
    }, 2000);
  }, [applicationData]);
  return (
    <>
      <div className="container-fluid p-0 m-0">

        <div className="row">
          <div className=" col-md-10">
            {alert.showAlert && alertOne && (
              <RdsAlert
                alertmessage={alert.message}
                colorVariant={alert.success ? "success" : "danger"}
              ></RdsAlert>
            )}
          </div>
          <div className="col d-flex justify-content-end mb-3">
            {/* <RdsOffcanvas
              canvasTitle={"New Application"}
              // onclick={offCanvasHandler}
              placement="end"
              
              offcanvasbutton={               
                <div className="d-flex justify-content-end">
                  <RdsButton
                    type={"button"}
                    size="small"
                    label="NEW APPLICATION"
                    icon="plus"
                    iconColorVariant="light"
                    iconFill={false}
                    iconStroke={true}
                    iconHeight="12px"
                    iconWidth="12px"
                    colorVariant="primary"
                    showLoadingSpinner={true}
                  ></RdsButton>
                </div>
              }
              backDrop={true}
              scrolling={false}
              preventEscapeKey={false}
              offId="application"
            >
                <RdsCompApplicationBasic handleSubmit={(basicApplicationData: any) => { handleApplicationSubmit(basicApplicationData) }} basicData={basicApplicationData} typeList={typeList} scopesList={scopesListData} consentType={consentType}></RdsCompApplicationBasic>
              
            </RdsOffcanvas> */}


            <RdsButton
              label="NEW APPLICATION"
              showLoadingSpinner={true}
              databstoggle="offcanvas"
              databstarget="#applicationOffcanvas"
              icon={"plus"}
              iconColorVariant="light"
              iconHeight="12px"
              iconWidth="12px"
              iconFill={false}
              iconStroke={true}
              block={false}
              size="small"
              type="button"
              colorVariant="primary"
            ></RdsButton>
            <RdsOffcanvas
              backDrop={true}
              scrolling={true}
              preventEscapeKey={false}
              canvasTitle={"New Application"}
              offId="applicationOffcanvas"
              placement={"end"}
            // onClose={(e) => {
            //   offcanvasClose();
            // }}
            >
              <RdsNavtabs
                navtabsItems={navtabsItems}
                type={"tabs"}
                activeNavTabId={activeNavTabId}
                activeNavtabOrder={(activeNavTabId) => {
                  setActiveNavTabId(activeNavTabId);
                }}
                justified={false}
              >
                {activeNavTabId == 0 && (
                  <RdsCompApplicationBasic handleSubmit={(basicApplicationData: any) => { handleApplicationSubmit(basicApplicationData) }} basicData={basicApplicationData} typeList={typeList} scopesList={scopesListData} consentType={consentType}></RdsCompApplicationBasic>
                )}
                {activeNavTabId == 1 && (
                  <>
                    <RdsCompApplicationWorkflows consentType={consentType} basicData={basicApplicationData} typeList={[]} scopesList={[]} handleSubmit={function (event: any): void {
                      throw new Error("Function not implemented.");
                    }}></RdsCompApplicationWorkflows>
                  </>
                )}
                {activeNavTabId == 2 && (
                  <>
                    <RdsCompApplicationScopes scopesList={scopesListData}></RdsCompApplicationScopes>
                  </>
                )}
              </RdsNavtabs>
              <div className="footer-buttons bottom-0 pt-0 d-flex">
                <RdsButton
                  class="me-2"
                  label="CANCEL"
                  type="button"
                  databsdismiss="offcanvas"
                  isOutline={true}
                  size="small"
                  colorVariant="primary"
                ></RdsButton>
                <RdsButton
                  class="me-2"
                  label="SAVE"
                  type="button"
                  size="small"
                  //isDisabled={!isFormValid}
                  isOutline={false}
                  colorVariant="primary"
                  //onClick={createNewUser}
                  showLoadingSpinner={true}
                  databsdismiss="offcanvas"
                ></RdsButton>
              </div>
            </RdsOffcanvas>

            <RdsOffcanvas
              canvasTitle="Edit Application"
              onclick={offCanvasHandler}
              placement="end"
              offId="application-edit-off"
              backDrop={true}
              scrolling={false}
              // onClose={(e) => {
              //   offcanvasClose();
              // }}
              preventEscapeKey={false}
            >
              <RdsNavtabs
                navtabsItems={navtabsEditItems}
                type={"tabs"}
                activeNavTabId={activeNavTabIdEdit}
                activeNavtabOrder={(activeNavTabIdEdit) => {
                  setActiveNavTabIdEdit(activeNavTabIdEdit);
                }}
                justified={false}
              >
                {activeNavTabEditId == 0 &&
                  <RdsCompApplicationBasic handleSubmit={(editApplicationData: any) => { handleEditSubmit(editApplicationData) }} basicData={editApplicationData} typeList={typeList} scopesList={scopesListData} consentType={consentType} ></RdsCompApplicationBasic>
                }

                {activeNavTabEditId == 1 && (
                  <>
                    <RdsCompApplicationWorkflows consentType={consentType} basicData={editApplicationData} typeList={[]} scopesList={[]} handleSubmit={function (event: any): void {
                      throw new Error("Function not implemented.");
                    }}></RdsCompApplicationWorkflows>
                  </>
                )}

                {activeNavTabEditId == 2 && (
                  <>
                    <RdsCompApplicationScopes scopesList={scopesListData}></RdsCompApplicationScopes>
                  </>
                )}

                {(activeNavTabEditId == 3 || showNextTab == true) && (
                  <>
                    <RdsCompPermissionTree permissions={permissionListData} selectedPermissions={(SelectesPermission: any) => { SelectesPermissions(SelectesPermission) }}></RdsCompPermissionTree>
                    <div className="footer-buttons my-2">
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <div>
                            <RdsButton
                              label="Cancel"
                              type="button"
                              colorVariant="primary"
                              size="small"
                              databsdismiss="offcanvas"
                              isOutline={true}
                            ></RdsButton>
                          </div>
                          <div>
                            <RdsButton
                              label="Save"
                              type="button"
                              size="small"
                              // isDisabled={formValid}
                              class="ms-2"
                              colorVariant="primary"
                              databsdismiss="offcanvas"
                              onClick={handleSelectesPermission}
                            ></RdsButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                )}

              </RdsNavtabs>

              <div className="footer-buttons justify-content-end bottom-0 pt-0">
                <RdsButton
                  class="me-2"
                  label="CANCEL"
                  type="button"
                  size="small"
                  databsdismiss="offcanvas"
                  isOutline={true}
                  colorVariant="primary"
                ></RdsButton>
                <RdsButton
                  class="me-2"
                  label="SAVE"
                  type="button"
                  size="small"
                  isOutline={false}
                  colorVariant="primary"
                  //onClick={updateUserData}
                  showLoadingSpinner={true}
                  databsdismiss="offcanvas"
                ></RdsButton>
              </div>
            </RdsOffcanvas>

          </div>

          <div className="col-md-12 mb-3">
            <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
              <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={applicationData}
                actions={actions}
                pagination={true}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                onActionSelection={scopeSelection}
              ></RdsCompDatatable>
              {/* <RdsOffcanvas
                canvasTitle={"Edit APPLICATION"}
                // onclick={offCanvasHandler}
                placement="end"
                
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId="application-edit-off"
              >
                <RdsNavtabs
                  navtabsItems={navtabsEditItems}
                  type="tabs"
                  isNextPressed={showNextTab}
                  activeNavTabId={activeNavTabEditId}
                  activeNavtabOrder={(activeNavTabEditId) => {
                    setActiveNavTabEditId(activeNavTabEditId), setShowNextTab(false);
                  }}
                />
                {activeNavTabEditId === "0" && showNextTab === false && (
                  <RdsCompApplicationBasic handleSubmit={(editApplicationData: any) => { handleEditSubmit(editApplicationData) }} basicData={editApplicationData} typeList={typeList} scopesList={scopesListData} consentType={consentType} ></RdsCompApplicationBasic>
                )}
                {(activeNavTabEditId === "1" || showNextTab == true) && (
                  <>
                    <RdsCompPermissionTree permissions={permissionListData} selectedPermissions={(SelectesPermission: any) => { SelectesPermissions(SelectesPermission) }}></RdsCompPermissionTree>
                    <div className="footer-buttons my-2">
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <div>
                            <RdsButton
                              label="Cancel"
                              type="button"
                              colorVariant="primary"
                              size="small"
                              databsdismiss="offcanvas"
                              isOutline={true}
                            ></RdsButton>
                          </div>
                          <div>
                            <RdsButton
                              label="Save"
                              type="button"
                              size="small"
                              // isDisabled={formValid}
                              class="ms-2"
                              colorVariant="primary"
                              databsdismiss="offcanvas"
                              onClick={handleSelectesPermission}
                            ></RdsButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                )}
              </RdsOffcanvas> */}

              <RdsCompAlertPopup alertID="application-delete-off" onSuccess={onDeleteHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;

