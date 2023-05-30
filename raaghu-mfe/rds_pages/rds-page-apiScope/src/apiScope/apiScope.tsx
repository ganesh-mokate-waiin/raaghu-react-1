import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  RdsCompApiScopeBasicResource,
  RdsCompDatatable,
  RdsCompAlertPopup,
} from "../../../rds-components";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
  RdsButton,
  RdsOffcanvas,
  RdsAlert,
  RdsModal,
} from "../../../rds-elements";
import {
  fetchScopesData,
  deleteScopesData,
  getScopesData,
  updateScopesData,
  editScopesData,
} from "../../../../libs/state-management/apiScope/apiScope-slice";

const ApiScope = () => {
  const [scopeData, setScopeData] = useState<any[]>([{}]);
  const [editscopeData, setEditScopeData] = useState({
    id: "",
    name: "",
    displayName: "",
    description: "",
    resources: [""],
  });
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [tableDataid, setTableDataRowId] = useState(0);
  //object destructuring of useTranslation hook
  const { t } = useTranslation();

  //get state from global store
  const scopeUser = useAppSelector((state) => state.persistedReducer.scopes);

  //Dispatch action
  const dispatch = useAppDispatch();

  //all useEffects
  useEffect(() => {
    dispatch(fetchScopesData() as any);
  }, [dispatch]);

  useEffect(() => {
    if (scopeUser.users?.items) {
      const setData1 = scopeUser.users.items.map((scope: any) => {
        return {
          id: scope.id,
          name: scope.name,
          displayName: scope.displayName,
          description: scope.description,
        };
      });
      setScopeData(setData1);
    }
  }, [scopeUser.users]);

  useEffect(() => {
    if (scopeUser.editScope?.id != null) {
      setEditScopeData({
        id: scopeUser.editScope.id,
        name: scopeUser.editScope.name,
        displayName: scopeUser.editScope.displayName,
        description: scopeUser.editScope.description,
        resources: scopeUser.editScope.resources,
      });
    }
  }, [scopeUser.editScope]);

  useEffect(() => {
    // Set a 3-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);

    return () => clearTimeout(timer);
  }, [scopeUser.users]);

  //Selection of action for data table
  const handlerActionSelection = (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);

    dispatch(editScopesData(rowData.id) as any);
  };
  //delete the scope
  const handlerDeleteScope = () => {
    dispatch(deleteScopesData(tableDataid) as any).then((res: any) => {
      if (res.type == "Scopes/deleteScopesData/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Scope deleted Successfully",
          color: "success",
        });
      }
      dispatch(fetchScopesData() as any);
    });
  };
  //Add the scope
  const handlerAddScope = (data: any) => {
    const newDto = {
      name: data.email,
      displayName: data.fullname,
      description: data.message,
      resources: data.resources,
    };
    dispatch(getScopesData(newDto) as any).then((res: any) => {
      if (res.type == "Scopes/getScopesData/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Scope Added Successfully",
          color: "success",
        });
      }
      dispatch(fetchScopesData() as any);
    });
  };
  //Edit the scope
  const handlerEditScope = (data: any) => {
    const editDto = {
      name: data.email,
      displayName: data.fullname,
      description: data.message,
    };
    dispatch(
      updateScopesData({ id: tableDataid, updateScopeDto: editDto }) as any
    ).then((res: any) => {
      if (res.type == "Scopes/updateScopesData/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Scope edited Successfully",
          color: "success",
        });
      }
      dispatch(fetchScopesData() as any);
    });
  };

  //headers for data table
  const tableHeaders = [
    {
      displayName: t("Name"),
      key: "name",
      datatype: "text",
      sortable: false,
    },
    {
      displayName: t("Display Name"),
      key: "displayName",
      datatype: "text",
      sortable: false,
    },
    {
      displayName: t("Description"),
      key: "description",
      datatype: "text",
      sortable: false,
    },
  ];
  //Actions for data table
  const actions = [
    { id: "edit", displayName: "Edit", offId: "apiScope-edit-off" },
    { id: "history", displayName: "Change History", modalId: "apiScope-change_history-off" },
    { id: "delete", displayName: "Delete", modalId: "apiScope-delete-off" },
  ];

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 mb-3 ">
        <div className="row ">
          <div className="col-md-4">
            {Alert.show && (
              <RdsAlert
                alertmessage={Alert.message}
                colorVariant={Alert.color}
              ></RdsAlert>
            )}
          </div>
          <div className="col-md-8 d-flex justify-content-end ">
            <RdsOffcanvas
              offcanvasbutton={
                <div className="my-1">
                  <RdsButton
                    icon="plus"
                    label={t("New Scope") || ""}
                    iconColorVariant="light"
                    iconHeight="15px"
                    iconWidth="15px"
                    iconFill={false}
                    iconStroke={true}
                    block={false}
                    size="small"
                    type="button"
                    showLoadingSpinner={true}
                    colorVariant="primary"
                  ></RdsButton>
                </div>
              }
              placement={"end"}
              backDrop={true}
              scrolling={false}
              preventEscapeKey={false}
              offId={"apiScope1"}
              canvasTitle={"New Scope"}
            >
              <RdsCompApiScopeBasicResource
                onSuccess={handlerAddScope}
                email=""
                fullname=""
                message=""
              />
            </RdsOffcanvas>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
          <RdsCompDatatable 
           actionPosition="right"
            tableHeaders={tableHeaders}
            actions={actions}
            tableData={scopeData}
            pagination={true}
            recordsPerPage={10}
            recordsPerPageSelectListOption={true}
            onActionSelection={handlerActionSelection}
          ></RdsCompDatatable>
          <RdsOffcanvas
            backDrop={true}
            preventEscapeKey={true}
            scrolling={false}
            offId="apiScope-edit-off"
            placement="end"
            canvasTitle="Edit Scope"
            children={
              <RdsCompApiScopeBasicResource
                onSuccess={handlerEditScope}
                email={editscopeData.name}
                fullname={editscopeData.displayName}
                message={editscopeData.description}
              />
            }
          ></RdsOffcanvas>
          <RdsModal
            modalId="apiScope-change_history-off"
            size="large"
            // modalTitle="Volo.Abp.OpenIddict.Scopes.OpenIddictScope"
            modalAnimation="modal fade"
            showModalHeader={false}
          >
            <h4>Volo.Abp.OpenIddict.Scopes.OpenIddictScope</h4>
            <p>({editscopeData.id})</p>
            <p className="text-center">No Change(s)</p>
            <div className="text-end">
              <RdsButton
                type={"button"}
                colorVariant="primary"
                label="Close"
                databsdismiss="modal"
                databstarget="apiScope-change_history-off"
              ></RdsButton>
            </div>
          </RdsModal>
          <RdsCompAlertPopup
            alertID="apiScope-delete-off"
            messageAlert="The selected Resource will be Deleted Permanently "
            alertConfirmation="Are you sure"
            deleteButtonLabel="Yes"
            onSuccess={handlerDeleteScope}
          />
        </div>
      </div>
    </div></div>
  );
};

export default ApiScope;
