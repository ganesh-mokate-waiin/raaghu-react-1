import React, { useEffect, useState } from "react"; import {
  RdsAlert,
  RdsButton,
  RdsIcon,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsOffcanvas,
} from "../../../rds-elements";

import {
  RdsCompAlertPopup,
  RdsCompDatatable, RdsCompFormsBasic, RdsCompFormsEmail,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useNavigate } from 'react-router-dom';
import { deleteForms, fetchForms, getForms, Saveforms, getAll2FormsQuestions, SaveFormsSendResponse } from "../../../../libs/state-management/forms/forms-slice";
const Forms = () => {
  const dispatch = useAppDispatch();
  // const forms = useAppSelector((state) => state.persistedReducer.forms);
  const forms = useAppSelector((state) => state.persistedReducer.forms);

  const navigate = useNavigate();
  const [formsData, setFormsData] = useState<any>([])
  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
  const [alertOne, setAlertOne] = useState(false);
  useEffect(() => {
    setAlert({
      showAlert: forms.alert,
      message: forms.alertMessage,
      success: forms.success,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        message: "",
        success: false,
      });
    }, 2000);
  }, [formsData]);
  useEffect(() => {
    dispatch(fetchForms() as any);
  }, [dispatch]);

  useEffect(() => {
    let tempData: any[] = [];
    if (forms.forms) {
      forms.forms.items.map((e: any) => {
        const date = new Date(e.creationTime);
        const creationDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}, ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} ${date.getHours() >= 12 ? "PM" : "AM"}`;
        let updatedDate = '';
        if (e.lastModificationTime) {
          const lastDate = new Date(e.lastModificationTime);
          updatedDate = `${("0" + lastDate.getDate()).slice(-2)}/${("0" + (lastDate.getMonth() + 1)).slice(-2)}/${lastDate.getFullYear()}, ${("0" + lastDate.getHours()).slice(-2)}:${("0" + lastDate.getMinutes()).slice(-2)} ${lastDate.getHours() >= 12 ? "PM" : "AM"}`;
        }
        else {
          updatedDate = '--'
        }
        const item = {
          title: e.title,
          description: e.description,
          creationTime: creationDate,
          id: e.id,
          lastModificationTime: updatedDate
        }
        tempData.push(item);
      })
      setFormsData(tempData)
    }
  }, [forms.forms]);

  const offCanvasHandler = () => { };
  const tableHeaders = [
    {
      displayName: "Title",
      key: "title",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Description",
      key: "description",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Updated At",
      key: "lastModificationTime",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Created At",
      key: "creationTime",
      datatype: "text",
      dataLength: 90,
      required: true,
      sortable: true,
    }
  ];

  const [tableRowId, setTableRowId] = useState('');
  const scopeSelection = (rowData: any, actionId: any) => {

    const rowDataString = String(rowData.id)
    setTableRowId(rowDataString);
    dispatch(getForms(rowDataString) as any);
    dispatch(getAll2FormsQuestions(rowDataString) as any);
    if (actionId === 'view') {
      navigate("/formsView/" + rowDataString);
    }
    setFormsEmailData({...formsEmailData , subject:rowData.title })
  };
  function onDeleteHandler(e: any) {
    dispatch(deleteForms(tableRowId) as any).then((res: any) => {
      dispatch(fetchForms() as any);
    });
    setAlertOne(true);
  }

  const actions = [
    { id: "view", displayName: "View", offId: "view" },
    { id: "send", displayName: "Send", offId: "forms-send-offc" },
    { id: "delete", displayName: "Delete", modalId: "form-delete-off" },
  ];


  const [saveNewFormData, setSaveNewFormData] = useState<any>({title:'',description:''});
  const [basicFormData, setBasicFormData] = useState({
    title: '', description: ''
  });
  function handleNewFormData() {
    dispatch(Saveforms(saveNewFormData) as any).then((res: any) => {
      dispatch(fetchForms() as any);
    })
    setAlertOne(true);
    setBasicFormData({ title: '', description: '' })
  }

  function handleGetFormData(data: any) {
    setSaveNewFormData(data)
  }
  const navtabsSendItems = [
    { label: "Email", tablink: "#nav-email", id: 0 },
    { label: "Link", tablink: "#nav-link", id: 1 },
  ];
  const [showNextSendTab, setShowNextSendTab] = useState(false);
  const [activeNavTabSendId, setActiveNavTabSendId] = useState(0);
  const [copybtn, setCopyBtn] = useState("clipboard")
  function handleCopyLink(event: any) {
    const linkValueToCopy = event.target.baseURI;
    navigator.clipboard.writeText(linkValueToCopy)
      .then(() => {
        console.log('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
    setCopyBtn("check")
  }
  const baseUrl = window.location.origin;
  const url = "formsView/"+tableRowId;
  const body = "I've invited you to fill in a form: " + baseUrl+"/"+ url
  const [formsEmailData, setFormsEmailData] = useState<any>({ to: '', body: body })
  //  useEffect(())
  function handleEmailSubmit(_data: any) {
    
    dispatch(SaveFormsSendResponse(_data) as any);
  }
  return (
    <div className="container-fluid p-0 m-0">
    <div className="row">
    <div className="col-md-12 mb-3 ">
      <div className="row ">
        <div className="col-md-4">
        {alert.showAlert && alertOne && (
                <RdsAlert
                  alertmessage={alert.message}
                  colorVariant={alert.success ? "success" : "danger"}></RdsAlert>
              )}
        </div>
        <div className="col-md-8 d-flex justify-content-end my-1">
        <RdsOffcanvas
                canvasTitle={"NEW FORM"}
                onclick={offCanvasHandler}
                placement="end"
                offcanvasbutton={
                  <div className="d-flex justify-content-end">
                    <RdsButton
                      type={"button"}
                      size="small"
                      label="NEW FORM"
                      icon="plus"
                      iconColorVariant="light"
                      iconFill={false}
                      iconStroke={true}
                      iconHeight="12px"
                      iconWidth="12px"
                      colorVariant="primary"
                      class="me-2"
                      showLoadingSpinner={true}
                    ></RdsButton>
                  </div>
                }
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId="form-new-off"
              >
                <>
                  <RdsCompFormsBasic basicInfo={basicFormData} handleNewFormData={(data: any) => handleGetFormData(data)} />
                  <div className="footer-buttons my-2">
                    <div className="row">
                      <div className="col-md-12 d-flex gap-3">
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
                            isDisabled={saveNewFormData.title == ''}
                            class=""
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            showLoadingSpinner={true}
                            onClick={() => handleNewFormData()}
                          ></RdsButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </RdsOffcanvas>
        </div>
      </div>
    </div>
    
    <div className="col-md-12">
      <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
      <RdsCompDatatable
                   actionPosition="right"
                    tableHeaders={tableHeaders}
                    tableData={formsData}
                    actions={actions}
                    pagination={true}
                    recordsPerPage={5}
                    recordsPerPageSelectListOption={true}
                    onActionSelection={scopeSelection}
                  ></RdsCompDatatable>
          <RdsCompAlertPopup messageAlert="Form will be deleted with all the questions in it, do you confirm?" alertID="form-delete-off" onSuccess={onDeleteHandler} />
    
      </div>
    </div>
    <RdsCompDatatable
                   actionPosition="right"
                    tableHeaders={tableHeaders}
                    tableData={formsData}
                    actions={actions}
                    pagination={true}
                    recordsPerPage={5}
                    recordsPerPageSelectListOption={true}
                    onActionSelection={scopeSelection}
                  ></RdsCompDatatable>
                  <RdsOffcanvas
                    canvasTitle={"SEND FORM"}
                    onclick={offCanvasHandler}
                    placement="end"
                    offcanvaswidth={650}
                    backDrop={false}
                    scrolling={false}
                    preventEscapeKey={false}
                    offId="forms-send-offc"
                  >
                    <>
                      <div className="row">
                        <RdsNavtabs
                          navtabsItems={navtabsSendItems}
                          type="tabs"
                          isNextPressed={showNextSendTab}
                          activeNavTabId={activeNavTabSendId}
                          activeNavtabOrder={(activeNavTabSendId) => {
                            setActiveNavTabSendId(activeNavTabSendId), setShowNextSendTab(false);
                          }}
                        />
                        {activeNavTabSendId == 0 && showNextSendTab === false && (
                          <>
                            <div>
                              <RdsCompFormsEmail formsEmailData={formsEmailData} handleSubmit={(data: any) => { handleEmailSubmit(data) }} ></RdsCompFormsEmail>
                            </div>
                          </>
                        )}
                        {activeNavTabSendId == 1 && showNextSendTab === false && (
                          <>
                            <div className="row ps-2">
                              <div>
                                <RdsLabel label="Link"></RdsLabel>
                              </div>
                              <div className="input-group mb-3 mt-3">
                                <RdsInput value={'http://localhost:8080/formsPreview/'+ tableRowId}></RdsInput>
                                <div className="input-group-text" id="basic-addon12">
                                  <RdsIcon name={copybtn} height="20px" width="20px" fill={false} stroke={true} onClick={handleCopyLink} />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  </RdsOffcanvas>
    </div>
    </div>
  );


}


export default Forms;
