import React, { useEffect, useState } from "react";
import {
  RdsAlert,
  RdsBadge,
  RdsButton,
  RdsCheckbox,
  RdsIcon,
  RdsInput,
  RdsOffcanvas,
} from "../../../rds-elements";
import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompNewLanguage,
} from "../../../rds-components";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  deleteLanguage,
  fetchCultureList,
  defaultLanguage,
  fetchLanguages,
  postNewLanguage,
  updateLanguage,
} from "../../../../libs/state-management/public.api";

const tableHeaders = [
  {
    displayName: "Display Name",
    key: "code",
    datatype: "text",
    sortable: true,
  },
  {
    displayName: "Culture Name",
    key: "languageName",
    datatype: "children",
    sortable: true,
  },
  {
    displayName: "UI Culture Name",
    key: "languageName",
    datatype: "children",
    sortable: true,
  },
  {
    displayName: "Enabled",
    key: "isenabled",
    datatype: "children",
    sortable: false,
  },
];
const actions = [
  { id: "edit", displayName: "Edit", offId: "language-edit-off" },
  { id: "delete", displayName: "Delete", modalId: "language-delete-off" },
  { id: "defaa", displayName: "set as default language" },
  {id: "add", displayName: "New Language", offId: "new-language"}
];

export interface LanguageProps {
  onActionSelection?(arg: any): void;
}

const Language = (props: LanguageProps) => {
  const [Data, setData] = useState<any>([{}]);

  const [dataEmit, setdataEmit] = useState<{
    check: boolean;
    displayName: any;
    id: any;
    flag: any;
  }>({
    check: true || false,
    displayName: "",
    id: "",
    flag: "",
  });

  const [formValid, setformValid] = useState(true);

  useEffect(() => {
    if (dataEmit.displayName && dataEmit.displayName.trim() !== "") {
      setformValid(false);
    } else {
      setformValid(true);
    }
  }, [dataEmit.displayName]);
  const [name, setname] = useState<
    {
      option: string;
      value: string;
    }[]
  >([{ option: "", value: "" }]);

  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

  // const [data,setdata] = useState(useAppSelector((state) => state.persistedReducer.language))
  const data = useAppSelector((state) => state.persistedReducer.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLanguages() as any);
  }, []);

  useEffect(() => {
    if (data.languages?.items != null) {
      const tempData = data.languages.items.map((item: any) => {
        return {
          id: item.id,
          code: (
            <>
              {item.isDefaultLanguage ? (
                <span className=" d-flex align-items-center ">
                  <h5 className="m-0">{item.displayName}</h5>
                  <RdsBadge
                    label={"Default"}
                    size={"medium"}
                    badgeType={"rectangle"}
                    colorVariant={"success"}
                  ></RdsBadge>
                </span>
              ) : (
                <>{item.displayName}</>
              )}
            </>
          ),
          languageName: item.cultureName,
          enable: item.isEnabled,
          flag: item.flagIcon,
          name: item.cultureName,
          isDefault: item.isDefaultLanguage,
          isenabled: (
            <>
              {item.isEnabled ? (
                <div>
                  <RdsIcon
                    name="check"
                    height="17px"
                    width="15px"
                    colorVariant="success"
                    strokeWidth="3px"
                  />
                </div>
              ) : (
                <div>
                  <RdsIcon
                    name="cancel"
                    height="17px"
                    width="15px"
                    colorVariant="danger"
                    strokeWidth="3px"
                  />
                </div>
              )}
            </>
          ),
          creationTime: (
            <>
              {item.flagIcon ? (
                <RdsIcon
                  name={item.flagIcon}
                  fill={false}
                  stroke={true}
                  height="20px"
                  width="20px"
                ></RdsIcon>
              ) : (
                ""
              )}
            </>
          ),
        };
      });
      setData(tempData);
    }
    if (data.cultureList[1]) {
      const tempName = data.cultureList.map((items: any) => {
        return {
          option: items.displayName,
          value: items.name,
        };
      });
      setname(tempName);
    }
  }, [data.cultureList, data.languages]);

  let cultureModel = {
    isEnabled: false,
    cultureName: "",
    displayName: "",
    uiCultureName: "",
    flagIcon: "",
  };

  const onSaveHandler = (data: {
    check: boolean;
    name: string;
    item: string;
    displayName: string;
  }) => {
    cultureModel.isEnabled = data.check;
    cultureModel.cultureName = data.name;
    cultureModel.displayName = data.displayName;
    cultureModel.uiCultureName = data.item;
    cultureModel.flagIcon = data.name;

    dispatch(postNewLanguage(cultureModel) as any).then((res: any) => {
      if (res.type == "language/postNewLanguage/rejected") {
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
          message: "Language added Successfully",
          color: "success",
        });
      }
      dispatch(fetchLanguages() as any);
    });

    setname([]);
  };
  const model = {
    isEnabled: false,
    displayName: "",
    flagIcon: "",
  };

  const onEditHandler = (data: {
    check: boolean;
    displayName: string;
    flag: string;
    id: string;
  }) => {
    model.displayName = data.displayName;
    model.isEnabled = data.check;
    model.flagIcon = data.flag;
    const idd = data.id;
    dispatch(updateLanguage({ idd, model }) as any).then((res: any) => {
      dispatch(fetchLanguages() as any);
    });
    setAlert({
      ...Alert,
      show: true,
      message: "Languages edited Succesfully",
      color: "success",
    });
  };

  const onActionSelection = (rowData: any, actionId: any) => {
    setdataEmit({
      ...dataEmit,
      displayName: rowData.name,
      check: rowData.enable,
      flag: rowData.flag,
      id: rowData.id,
    });

    if (actionId == "defaa") {
      dispatch(defaultLanguage(rowData.id) as any).then((res: any) => {
        dispatch(fetchLanguages() as any);
      });
      setAlert({
        ...Alert,
        show: true,
        message: "Languages set as default Succesfully",
        color: "success",
      });
    }
  };

  const onNewLangHandler = () => {
    
    dispatch(fetchCultureList() as any);
  };

  const onDeleteHandler = () => {
    dispatch(deleteLanguage(dataEmit.id) as any).then((res: any) => {
      dispatch(fetchLanguages() as any);
    });
    setAlert({
      ...Alert,
      show: true,
      message: "Languages deleted Succesfully",
      color: "success",
    });
  };

  const inputChangeHandler = (event: any) => {
    setdataEmit({ ...dataEmit, displayName: event.target.value });
  };
  const checkboxHandler = (event: any) => {
    setdataEmit({ ...dataEmit, check: event.target.checked });
  };

  useEffect(() => {
    // Set a 3-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [data.languages]);

  return (
    <>
      <div className="container-fluid p-0 m-0">
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
                        type={"button"}
                        label="New Language"
                        iconColorVariant="light"
                        size="small"
                        colorVariant="primary"
                        icon="plus"
                        iconFill={false}
                        iconStroke={true}
                        databstarget="offcanvas"
                        databsdismiss="offcanvas"
                        iconHeight="12px"
                        onClick={onNewLangHandler}
                        showLoadingSpinner={true}
                        iconWidth="12px"
                      ></RdsButton>
                    </div>
                  }
                  placement={"end"}
                  backDrop={true}
                  scrolling={false}
                  preventEscapeKey={false}
                  offId={"new-language"}
                  canvasTitle={"New Language"}
                >
                  <RdsCompNewLanguage
                    onSaveHandler={onSaveHandler}
                    placeholder="Select Country"
                    languageItems={name}
                    languageNames={name}
                    onClick={undefined}
                    check={false}
                    edit={false}
                  ></RdsCompNewLanguage>
                </RdsOffcanvas>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
              <RdsCompDatatable
                actionPosition="right"
                classes="table__userTable"
                tableHeaders={tableHeaders}
                pagination={true}
                tableData={Data}
                actions={actions}
                onActionSelection={onActionSelection}
                recordsPerPage={10}
                recordsPerPageSelectListOption={true}
                noDataTitle={"There is no languages available, Click on New Scopes to add."}
                noDataheaderTitle={"No Languages Available."}
              ></RdsCompDatatable>
              <RdsOffcanvas
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"language-edit-off"}
                canvasTitle={"Edit Language"}
              >
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group mt-3">
                        <RdsInput
                          size="small"
                          label="Display Name"
                          placeholder="Enter Display Name"
                          value={dataEmit.displayName}
                          onChange={inputChangeHandler}
                          required={true}
                        ></RdsInput>
                      </div>
                    </div>
                  </div>

                  <RdsCheckbox
                    label="is Enabled"
                    checked={dataEmit.check}
                    onChange={checkboxHandler}
                  ></RdsCheckbox>
                </form>

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
                          isDisabled={formValid}
                          class="ms-2"
                          colorVariant="primary"
                          databsdismiss="offcanvas"
                          onClick={() => onEditHandler(dataEmit)}
                        ></RdsButton>
                      </div>
                    </div>
                  </div>
                </div>
              </RdsOffcanvas>

              <RdsCompAlertPopup
                alertID={"language-delete-off"}
                onSuccess={onDeleteHandler}
              ></RdsCompAlertPopup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
