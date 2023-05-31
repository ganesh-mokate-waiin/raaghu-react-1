import React, { useEffect, useState } from "react";
import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompFeatures,
} from "../../../rds-components";
import {
  RdsButton,
  RdsOffcanvas,
  RdsInput,
  RdsAlert,
  RdsNavtabs,
} from "../../../rds-elements";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";
import { useTranslation } from "react-i18next";

import {
  fetchEditionData,
  deleteEditionData,
  addEditionData,
  editEditionData,
  fetchFeaturesEdition,
  saveFeaturesEdition,
  restoreToDefaultFeaturesEdition,
} from "../../../../libs/state-management/edition/edition-slice";

interface RdsPageEditionProps {}

const Edition = (props: RdsPageEditionProps) => {
  const [tableDataRowid, setTableDataRowId] = useState("");
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
  const [Data, setData] = useState<any>([]);
  const [val, setVal] = useState("");
  const [alertOne, setAlertOne] = useState(false);
  const { t } = useTranslation();

  const editionuser = useAppSelector(
    (state) => state.persistedReducer.edition
  ) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEditionData() as any);
  }, [dispatch]);

  useEffect(() => {
    if (editionuser.users?.items) {
      const tempData = editionuser.users.items.map((item: any) => {
        return {
          id: item.id,
          name: item.displayName,
        };
      });
      console.log(" tempData ", tempData);
      setData(tempData);
    }
  }, [editionuser.users]);

  useEffect(() => {
    setAlert({
      showAlert: editionuser.alert,
      message: editionuser.alertMessage,
      success: editionuser.success,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        message: "",
        success: false,
      });
    }, 2000);
  }, [editionuser.users]);

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
      { value: true },
      { value: true },
    ]);

  // useEffect(() => {
  //   if (editionuser.featureIdentitySettings) {
  //     let tempFeatureData: any[] = [];
  //     editionuser.featureIdentitySettings.groups.map((item: any) => {
  //       item.features.map((e: any) => {
  //         let data: any = {};
  //         if (e.value == "true" || e.value == "True") {
  //           data = {
  //             name: e.name,
  //             value: true,
  //           };
  //         } else if (e.value == "False" || e.value == "false") {
  //           data = {
  //             name: e.name,
  //             value: false,
  //           };
  //         } else {
  //           data = {
  //             name: e.name,
  //             value: e.value,
  //           };
  //         }
  //         tempFeatureData.push(data);
  //       });
  //     });
  //     console.log("features  data", tempFeatureData);
  //     // compData = tempFeatureData;
  //     setfeatureIdentitySettings(tempFeatureData);
  //   }
  // }, [editionuser.featureIdentitySettings]);

  useEffect(() => {
    if (editionuser.featureIdentitySettings) {
      // setFeaturesData(editionuser.featureIdentitySettings.groups);
      const sample = editionuser.featureIdentitySettings.groups.map((x: any) => {
        return {
          name: x.name,
          displayName: x.displayName,
          features: x.features.map((f: any) => {
            return {
              ...f,
              valueType: {
                name: f.valueType.name,
                validator: f.valueType.validator,
                itemSource: f.valueType.itemSource,
              },
            };
          }),
        };
      });
      setfeatureIdentitySettings(sample);
    }
  }, [editionuser.featureIdentitySettings]);

  const tableHeaders = [
    {
      displayName: t("Edition Name"),
      key: "name",
      datatype: "text",
    },
  ];

  const actions = [
    { id: "editEdition", displayName: "Edit", offId: "edition-edit-off" },
    { id: "delete", displayName: "Delete", modalId: "edition-delete-offc" },
  ];

  const onActionSelection = (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);
    setVal(rowData.name);
    if (actionId === "editEdition") {
      dispatch(fetchFeaturesEdition(rowData.id) as any);
    }
  };

  const deleteHandler = () => {
    dispatch(deleteEditionData(tableDataRowid) as any).then((res: any) => {
      dispatch(fetchEditionData() as any);
    });
    setAlertOne(true);
  };

  const dTo = {
    displayName: value,
  };

  const addDataHandler = () => {
    
    let requestBody = dTo
    dispatch(addEditionData({requestBody}) as any).then((res: any) => {
      dispatch(fetchEditionData() as any);
    });
    setValue("");
    setAlertOne(true);
  };

  const editDataHandler = () => {
    const dTo = {
      displayName: val,
    };
    dispatch(editEditionData({ id: tableDataRowid, dTo: dTo }) as any).then(
      (res: any) => {
        dispatch(fetchEditionData() as any);
      }
    );
    setVal("");
    setAlertOne(true);
  };

  function saveFeature(data: any) {
    console.log("This is data ", data);
    const tempData: any[] = [];
    data.map((e: any) => {
      const item = {
        value: String(e.value),
        name: e.name,
      };
      tempData.push(item);
    });
    const data1 = {
      id: tableDataRowid,
      body: { features: tempData },
    };
    console.log("This is temp Data ", tempData);
    dispatch(saveFeaturesEdition(data1) as any);
  }

  function restoreFeatures(data: any) {
    dispatch(restoreToDefaultFeaturesEdition(tableDataRowid) as any).then(
      (res: any) => {}
    );
  }

  // navtabs

  const navtabsItems = [
    { label: "Basics", tablink: "#nab-basics", id: 0 },
    { label: "Features", tablink: "#nav-features", id: 1 },
  ];
  const [activeEditNavTabId, setActiveEditNavTabId] = useState(0);
  const [showNextEdtiTab, setShowNextEditTab] = useState(false);

  return (
    <div className="container-fluid p-0 m-0 h-100">
      <div className="row">
        <div className="col-lg-8 col-md-8">
          {alert.showAlert && alertOne && (
            <RdsAlert
              alertmessage={alert.message}
              colorVariant={alert.success ? "success" : "danger"}
             ></RdsAlert>
          )}
        </div>
        <div className="col-lg-4 col-md-4">
          <RdsOffcanvas
            canvasTitle="NEW EDITION"
            placement="end"
            offcanvasbutton={
              <div className="d-flex justify-content-end">
                <RdsButton
                  icon="plus"
                  iconColorVariant="light"
                  size="small"
                  type="button"
                  block={false}
                  iconHeight="15px"
                  iconWidth="15px"
                  iconFill={false}
                  iconStroke={true}
                  showLoadingSpinner={true}
                  colorVariant="primary"
                  label="NEW EDITION"
                />
              </div>
            }
            backDrop={true}
            scrolling={false}
            preventEscapeKey={false}
            offId={"Edition"}
          >
            <div>
              <div className="pt-3">
                <RdsInput
                  size="medium"
                  inputType="text"
                  placeholder="Add Placeholder"
                  label="Edition Name"
                  labelPositon="top"
                  id=""
                  value={value}
                  required={true}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                ></RdsInput>
                <div className="d-flex footer-buttons">
                  <RdsButton
                    label="CANCEL"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2"
                  ></RdsButton>
                  <RdsButton
                    label="SAVE"
                    type={"button"}
                    size="small"
                    showLoadingSpinner={true}
                    databsdismiss="offcanvas"
                    isDisabled={value === ""}
                    colorVariant="primary"
                    class="me-2"
                    onClick={addDataHandler}
                  ></RdsButton>
                </div>
              </div>
            </div>
          </RdsOffcanvas>
        </div>
      </div>
      <div className="card p-3 border-0 rounded-0 card-full-stretch-wthlabel mt-3">
        <RdsCompDatatable
         actionPosition="right"
          tableHeaders={tableHeaders}
          actions={actions}
          tableData={Data!}
          pagination={true}
          recordsPerPage={10}
          onActionSelection={onActionSelection}
          recordsPerPageSelectListOption={true}
          noDataTitle={"There is no editions available, Click on New Edition to add."}
          noDataheaderTitle={"No Edition Available"}
        ></RdsCompDatatable>
        <RdsCompAlertPopup
          alertID="edition-delete-offc"
          onSuccess={deleteHandler}
        />

        <RdsOffcanvas
          canvasTitle="Edit Edition"
          placement="end"
          offId="edition-edit-off"
          backDrop={true}
          scrolling={false}
          preventEscapeKey={false}
          className="overflow-hidden"
        >
          <RdsNavtabs
            navtabsItems={navtabsItems}
            type="tabs"
            isNextPressed={showNextEdtiTab}
            activeNavTabId={activeEditNavTabId}
            activeNavtabOrder={(activeEditNavTabId) => {
              setActiveEditNavTabId(activeEditNavTabId),
                setShowNextEditTab(false);
            }}
          />
          {activeEditNavTabId == 0 && showNextEdtiTab === false && (
            <div className="pt-3 mt-3 ps-2 pe-2">
              <RdsInput
                size="medium"
                inputType="text"
                placeholder="Add Placeholder"
                label="Edition Name"
                labelPositon="top"
                id=""
                value={val}
                required={true}
                onChange={(e) => {
                  setVal(e.target.value);
                }}
              ></RdsInput>
              
            </div>
          )}
          {(activeEditNavTabId == 1 || showNextEdtiTab == true) && (
            <>
              <RdsCompFeatures
                featuresData={featureIdentitySettingsData}
                onFeatureSelection={saveFeature}
                // featureIdentitySettingsData1={featureIdentitySettingsData}
                // twoFactorList={[
                //   { option: "Optional", value: "Optional" },
                //   { option: "Disabled", value: "Disabled" },
                //   { option: "Forced", value: "Forced" },
                // ]}
                // saveFeature={saveFeature}
                // restoreFeatures={restoreFeatures}
              />
            </>
          )}
          <div className="d-flex footer-buttons">
                <RdsButton
                  label="CANCEL"
                  databsdismiss="offcanvas"
                  type={"button"}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  class="me-2"
                ></RdsButton>
                <RdsButton
                  label="SAVE"
                  type={"button"}
                  size="small"
                  databsdismiss="offcanvas"
                  isDisabled={val === ""}
                  colorVariant="primary"
                  class="me-2"
                  onClick={editDataHandler}
                ></RdsButton>
              </div>
        </RdsOffcanvas>
      </div>
    </div>
  );
};
export default Edition;
