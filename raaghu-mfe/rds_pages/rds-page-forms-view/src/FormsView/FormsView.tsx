import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RdsAlert,
  RdsButton,
  RdsIcon,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsOffcanvas,
} from "../../../rds-elements";

import {
  RdsCompFormsEmail,
  RdsCompFormsResponse,
  RdsCompFormsSettings, RdsCompQuestions,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { fetchForms, SaveformsQuestions, updateForms, getAll2FormsQuestions, updateFormsQuestions, deleteFormsQuestions, getFormsSettings, getForms, updateFormsSettings, SaveFormsSendResponse, getFormsResponses, getFormsResponsesCount } from "../../../../libs/state-management/forms/forms-slice";
import { useNavigate } from "react-router-dom";
const FormsView = (props: any) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  // const forms = useAppSelector((state) => state.persistedReducer.forms);
  const forms = useAppSelector((state) => state.persistedReducer.forms);


  useEffect(() => {
    dispatch(fetchForms() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFormsSettings(props.id) as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFormsResponses(props.id) as any);
  }, [dispatch])

  useEffect(() => {
    dispatch(getFormsResponsesCount(props.id) as any);
  }, [dispatch])
  const [alertOne, setAlertOne] = useState(false);
  const [basicEditFormData1, setbasicEditFormData] = useState<any>();
  const [tempEditFormData, setTempEditFormData] = useState<any>();
  const [tempQuestionsData, setTempQuestionsData] = useState<any>([]);
  const [tempSaveQuestionsData, setTempSaveQuestionsData] = useState<any>([]);
  function getEditDataFromQuestionComponent(data: any) {
    setTempEditFormData(data);
  }

  function getQuestionsEditDataFromQuestionComp(data: any) {

    setTempSaveQuestionsData(data);
  }
  const [formSettingData, setFormSettingData] = useState({
  });
  const [updatedFormSettingData, setUpdatedFormSettingData] = useState({
  })
  useEffect(() => {
    if (forms.formQuestionEdit) {
      setTempQuestionsData(forms.formQuestionEdit);
    }
  }, [forms.formQuestionEdit]);

  useEffect(() => {
    if (forms.getSettings) {
      setFormSettingData(forms.getSettings);
    }
  }, [forms.getSettings]);

  function handleGetFormSettings(_data: any) {
    setUpdatedFormSettingData(_data);

  }
  function handleFormSettings() {
    const data = {
      id: props.id,
      body: updatedFormSettingData
    }
    dispatch(updateFormsSettings(data) as any)
  }

  useEffect(() => {
    if (forms.editForms) {
      const tempData = { ...forms.editForms }
      setbasicEditFormData(tempData)
      setTempEditFormData(tempData);
      setFormsEmailData({ ...formsEmailData, subject: forms.editForms.title })
      // setFormTitle(forms.editForms.title)
    }
  }, [forms.editForms]);
  function handleCancleQuestion() {
    navigate("/forms");
  }
  function handleEditQuestion() {
    const { description, title } = tempEditFormData;
    const forms = {
      id: props.id,
      body: { description, title }
    };
    dispatch(updateForms(forms) as any).then((res: any) => {
      tempSaveQuestionsData.map((res: any) => {
        if (res.id) {
          if (res.isEdit) {
            const data = {
              id: res.id,
              body: { ...res, formId: props.id }
            };
            dispatch(updateFormsQuestions(data) as any)
              .then((res: any) => {
                dispatch(getAll2FormsQuestions(props.id) as any);
                setAlertOne(true);
              });
          } else { }
        } else {
          const data = {
            id: props.id,
            body: { ...res, formId: props.id }
          };
          dispatch(SaveformsQuestions(data) as any)
            .then((res: any) => {
              dispatch(getAll2FormsQuestions(props.id) as any);
              setAlertOne(true);
            });
        }
      });
      setAlertOne(true);
    })
    setAlertOne(true);
  }
  function deleteQuestion(data: any) {
    dispatch(deleteFormsQuestions(data.id) as any).then((res: any) => {
      dispatch(getAll2FormsQuestions(props.id) as any);
    })
  }
  function handlePreview(id: any) {
    navigate("/formsPreview/" + id);
  }
  const offCanvasHandler = () => { };
  const navtabsEditItems = [
    { label: "Questions", tablink: "#nav-home", id: 0 },
    { label: "Responses", tablink: "#nav-responses", id: 1 },
  ];
  const [showNextTab, setShowNextTab] = useState(false);
  const [activeNavTabEditId, setActiveNavTabEditId] = useState("0");

  const navtabsSendItems = [
    { label: "Email", tablink: "#nav-email", id: 0 },
    { label: "Link", tablink: "#nav-link", id: 1 },
  ];
  const [showNextSendTab, setShowNextSendTab] = useState(false);
  const [activeNavTabSendId, setActiveNavTabSendId] = useState("0");
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
  const url = "formsView/" + props.id;
  const body = "I've invited you to fill in a form: " + baseUrl + "/" + url
  const [formsEmailData, setFormsEmailData] = useState<any>({ to: '', body: body })
  function handleEmailSubmit(_data: any) {
    dispatch(SaveFormsSendResponse(_data) as any);
  }

  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
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

  }, [forms.alertMessage]);

  return (
    <>
      <div className="row">
        <div className=" col-md-6">
          {alert.showAlert && alertOne && (
            <RdsAlert
              alertmessage={alert.message}
              colorVariant={alert.success ? "success" : "danger"}
            ></RdsAlert>
          )}
        </div>
        <div className="col d-flex justify-content-end mb-3">
          <RdsOffcanvas
            canvasTitle={"SEND FORM"}
            onclick={offCanvasHandler}
            placement="end"
            offcanvaswidth={650}
            offcanvasbutton={
              <div className="d-flex justify-content-end">
                <RdsButton
                  type={"button"}
                  size="small"
                  label="SEND"
                  icon="envelope"
                  iconColorVariant="light"
                  iconFill={false}
                  iconStroke={true}
                  iconHeight="15px"
                  iconWidth="15px"
                  colorVariant="primary"
                  isOutline={true}
                  showLoadingSpinner={true}
                  class="me-2"
                ></RdsButton>
              </div>
            }
            backDrop={false}
            scrolling={false}
            preventEscapeKey={false}
            offId="sendForm"
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
                {activeNavTabSendId === "0" && showNextSendTab === false && (
                  <>
                    <div>
                      <RdsCompFormsEmail formsEmailData={formsEmailData} handleSubmit={(data: any) => { handleEmailSubmit(data) }} ></RdsCompFormsEmail>
                    </div>
                  </>
                )}
                {activeNavTabSendId === "1" && showNextSendTab === false && (
                  <>
                    <div className="row ps-4">
                      <div>
                        <RdsLabel label="Link"></RdsLabel>
                      </div>
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" value={`${baseUrl}/formsPreview/${props.id}`} />
                          <span className="input-group-text">
                          <RdsIcon classes="cursor-pointer" name={copybtn} height="20px" width="20px" fill={false} stroke={true} onClick={handleCopyLink} />

                          </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          </RdsOffcanvas>
          <RdsButton
            type={"button"}
            size="small"
            label="PREVIEW"
            icon="eye"
            iconColorVariant="light"
            iconFill={false}
            iconStroke={true}
            iconHeight="12px"
            iconWidth="12px"
            colorVariant="primary"
            isOutline={true}
            onClick={() => handlePreview(props.id)}
            class="me-2"
            id="previewButton"
          ></RdsButton>
          <RdsOffcanvas
            canvasTitle={"FORM SETTINGS"}
            onclick={offCanvasHandler}
            placement="end"
            offcanvaswidth={650}
            offcanvasbutton={
              <div className="d-flex justify-content-end">
                <RdsButton
                  type={"button"}
                  size="small"
                  label="Settings"
                  icon="gear"
                  iconColorVariant="light"
                  iconFill={false}
                  iconStroke={true}
                  iconHeight="15px"
                  iconWidth="15px"
                  colorVariant="primary"
                  class="me-2"
                ></RdsButton>
              </div>
            }
            backDrop={false}
            scrolling={false}
            preventEscapeKey={false}
            offId="viewForm"
          >
            <>
              <div className="row ps-4">
                <RdsCompFormsSettings handleFormSettings={(data: any) => handleGetFormSettings(data)} formsSettingData={formSettingData} ></RdsCompFormsSettings>
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
                          class="ms-2"
                          colorVariant="primary"
                          databsdismiss="offcanvas"
                          onClick={() => handleFormSettings()}
                        ></RdsButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </RdsOffcanvas>

        </div>

        <div className="col-md-12 mb-3">
          <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">

            <div className="container-fluid">
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
                <>
                  <div>
                    <RdsCompQuestions basicEditFormData={basicEditFormData1} formQuestionsData={tempQuestionsData} getBasicEditDataFromQuestionComp={(data: any) => { getEditDataFromQuestionComponent(data) }} getQuestionsEditDataFromQuestionComp={(data: any) => { getQuestionsEditDataFromQuestionComp(data) }} deleteQuestion={(data: any) => { deleteQuestion(data) }}></RdsCompQuestions>
                    <div className="bottom-0 position-absolute my-5">
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <RdsButton
                            label="Cancel"
                            type="button"
                            colorVariant="primary"
                            size="small"
                            databsdismiss="offcanvas"
                            isOutline={true}
                            onClick={handleCancleQuestion}
                          ></RdsButton>
                          <RdsButton
                            label="SAVE"
                            type="button"
                            isOutline={false}
                            size="small"
                            colorVariant="primary"
                            onClick={handleEditQuestion}
                            class="ms-3"
                          ></RdsButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeNavTabEditId === "1" && showNextTab === false && (
                <>
                  <RdsCompFormsResponse ></RdsCompFormsResponse>
                </>)}
            </div>


          </div>
        </div>
      </div>

    </>
  );
};

export default FormsView;
