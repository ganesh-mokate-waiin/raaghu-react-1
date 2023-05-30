import React, { useState, useEffect } from "react";
import {
  RdsButton,
  RdsOffcanvas,
  RdsNavtabs,
  RdsProgressBar,
  RdsLabel,
  RdsAlert,
  RdsIcon,
} from "../../../rds-elements";
import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompPollsOption,
  RdsCompPollsQuestion,
} from "../../../rds-components";
import './Polls.css'
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  deletePolls,
  fetchPollsData,
  GetPolls,
  resultData,
  SavePolls,
  UpdatePollsData,
  Widgets,
} from "../../../../libs/state-management/polls/polls-slice";

const Polls = (props: any) => {
  const dispatch = useAppDispatch();
  const polls = useAppSelector((state) => state.persistedReducer.polls);
  const navtabsItems = [
    { label: "Question", tablink: "#nav-question", id: 0 },
    { label: "Option", tablink: "#nav-option", id: 1 },
  ];

  const navtabsItemsEdit = [
    { label: "Question", tablink: "#nav-questionEdit", id: 0 },
    { label: "Option", tablink: "#nav-optionEdit", id: 1 },
  ];

  const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState<any>("0");
  const tableHeaders = [
    {
      displayName: "Question",
      key: "question",
      datatype: "text",
      sortable: true,
      required: true,
      dataLength: 30,
    },
    {
      displayName: "Name",
      key: "name",
      datatype: "text",
      sortable: true,
      required: true,
      dataLength: 30,
    },
    {
      displayName: "Code",
      key: "code",
      datatype: "text",
      sortable: true,
      required: true,
      dataLength: 30,
    },
    {
      displayName: "Vote Count",
      key: "votecount",
      datatype: "number",
      sortable: true,
      required: true,
      dataLength: 30,
    },
  ];
  const actions = [
    { id: "edit", displayName: "Edit", offId: "poll-edit-off" },
    { id: "delete", displayName: "Delete", modalId: "poll-delete-off" },
    { id: "result", displayName: "Show Result", offId: "show-result-off" },
    {
      id: "entity-widgetcode-off",
      displayName: "Copy Widget Code",
      offId: "entity-widgetcode-off",
    },
  ];
  const [questionData, setQuestionData] = useState({
    question: "",
    code: "",
    widget:   null,
    name:  null,
    allowMultipleVote: false,
    showVoteCount: false,
    showResultWithoutGivingVote: false,
    showHoursLeft: false,
    startDate: new Date,
    endDate:  null,
    resultShowingEndDate: null,
  });
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [getCreateNewPollsOptionData, setGetCreateNewPollsOptionData] = useState<any[]>([]);
 const [pollsOptionsData, setPollsOptionsData]= useState([])
 
  function getPollsOptionData(data: any) {
    setPollsOptionsData(data);
  } 
  function getPollsEditOptionData(data: any) {
    setEditPollsOptionData(data);
  } 
  const isCodeValid = (code: any) => {
    if (!code || code.length === 0) {
      return false;
    }
    return true;
  };
  const isQuestionValid = (question: any) => {
    if (!question || question.length === 0) {
      return false;
    }
    return true;
  };

  const isFormValid = isQuestionValid(questionData.question) && isCodeValid(questionData.code);
  const [editQuestionData, setEditQuestionData] = useState({
    question: '',
    code: '',
    name: '',
    widget:'',
    showHoursLeft: false,
    allowMultipleVote: false,
    voteCount : false,
    result:false,
    startDate:'',
    endDate:'',
    resultEndDate:'',
    pollOptions : []
  })
  const[editPollsOptionData, setEditPollsOptionData] = useState([]);

  useEffect(()=>{
    
    if(polls.fetchPollsEdit){
      setEditQuestionData(polls.fetchPollsEdit);
      let tempOptionsData = polls.fetchPollsEdit.pollOptions.map((res:any)=>{
        const item = {
          id:res.id,
          text:res.text,
          order:res.order,
          voteCount:res.voteCount,
          actions: (
            <>
              <div className="d-flex justify-content-center">
                <div className="mx-3">
                <RdsIcon
                  width="17px"
                  height="17px"
                  name="pencil"
                  stroke={true}
                  colorVariant="primary"
                  onClick={()=>{}}
                ></RdsIcon>
                 </div>
                  <RdsIcon
                  width="17px"
                  height="17px"
                  name="delete"
                  stroke={true}
                  colorVariant="danger"
                  onClick={()=>{}}
                ></RdsIcon>
              </div>
            </>
          ),
        }
        return item;
      })
      setEditPollsOptionData(tempOptionsData)
      // 
    }
  },[polls.fetchPollsEdit])

  
  const [pollsResultData, setPollsResultData]=useState<any>([]);
  useEffect(()=>{
    
    if(polls.resultData){
      // polls.resultData.pollResultDetails.map((res:any)=>{
        setPollsResultData(polls.resultData.pollResultDetails)
    }
  },[polls.resultData])
  const[rowDataId, setRowDataId]= useState<any>()
  function scopeSelection(rowData:any , actionId:any) {
    setRowDataId(rowData.id);
    dispatch(resultData(rowData.id)as any)
    dispatch(fetchPollsData(rowData.id) as any)
    if(actionId === 'entity-widgetcode-off'){
      
      dispatch(Widgets() as any).then((res: any) => {
     
        dispatch(GetPolls() as any);
      }); 
    }
  }
  const editDataHandler = () => {
    
    let removeIdsFromPollsOptions= editPollsOptionData.map((res:any, index:number)=>{
      let item:any;
      if(res.id.length > 30){
        item = {
          id:res.id,
          order:index+1,
          text:res.text,
          voteCount:res.voteCount
        }
      }
      else{
        item = {
          order:index+1,
          text:res.text,
          voteCount:res.voteCount
        }
      }
      return item;
    })
    
    const data = {...editQuestionData, pollOptions: removeIdsFromPollsOptions}
    dispatch(UpdatePollsData({ id: rowDataId,body:data }) as any).then(
      (res: any) => {
        if (res.type.includes("rejected")) {
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
            message: "Poll updated Successfully",
            color: "success",
          });
        }
        dispatch(GetPolls() as any);
      }
    );
  };

  const offCanvasHandler = () => {};
  function handleAddNewPoll() {
    const allData = {
      ...questionData, pollOptions: getCreateNewPollsOptionData,
    };
    dispatch(SavePolls(allData) as any).then((res: any) => {
      if (res.type.includes("rejected")) {
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
          message: "Poll added Successfully",
          color: "success",
        });
      }
      dispatch(GetPolls() as any);
    });
   
  }

  //const [getCreateNewPollQuestion, setGetCreateNewPollQuestion] = useState({});
  
  function getPollsQuestion(data: any) {
    setQuestionData(data);
  }

  function deleteHandler(data:any){
    console.log(data);
     dispatch(deletePolls(rowDataId) as any).then((res: any) => {
      if (res.type.includes("rejected")) {
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
          message: "Poll deleted Successfully",
          color: "success",
        });
      }
      dispatch(GetPolls() as any);
    });
  }
  
  useEffect(() => {
    dispatch(GetPolls() as any);
  }, [dispatch]);
  const [getDataPolls, setGetDataPolls] = useState<any>([]);

  useEffect(() => {
    let temp: any[] = [];
    if (polls.GetPolls?.items) {
      polls.GetPolls.items?.map((res: any) => {

        const item = {
          question: res.question,
          code: res.code,
          name: res.name,
          votecount: res.voteCount,
          id: res.id
        };
        temp.push(item);
      });
      setGetDataPolls(temp);
    }
  }, [polls.GetPolls]);


  function getEditPollsQuestionData(data:any){ 
    
    setEditQuestionData(data);
  }
  useEffect(() => {
     const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 2000);
     return () => clearTimeout(timer);
  }, [polls.GetPolls]);
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
                canvasTitle="NEW POLL"
                onclick={offCanvasHandler}
                placement="end"
                offcanvasbutton={
                  <div className="my-1">
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
                      label="New poll"
                    />
                  </div> 
                }
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"polls-add-new"}
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
                {activeNavTabId === "0" && (
                  <RdsCompPollsQuestion
                    widgetList={[
                      { option: "a", value: "a" },
                      { option: "b", value: "b" },
                    ]}
                    getPollsQuestion={(data: any) => getPollsQuestion(data)}
                    questionData={questionData}
                  ></RdsCompPollsQuestion>
                  
                )}
                {activeNavTabId === "1" && (
                  <RdsCompPollsOption
                    optionsData={pollsOptionsData}
                    getPollsOptionData={getPollsOptionData}
                  ></RdsCompPollsOption>
                )}
              </RdsNavtabs>
              <div className="row mt-5 footer-buttons bottom-0 mx-0 ">
                <div className="col-md-2 mx-2">
                  <RdsButton
                    label="Cancel"
                    colorVariant="primary"
                    block={true}
                    size="small"
                    databsdismiss="offcanvas"
                    tooltipTitle={""}
                    type="button"
                    isOutline={true}
                  />
                </div>
                <div className="col-2">
                  <RdsButton
                    label="Save"
                    size="small"
                    isDisabled={!isFormValid}
                    colorVariant="primary"
                    block={true}
                    databsdismiss="offcanvas"
                    tooltipTitle={""}
                    type="button"
                    showLoadingSpinner={true}
                    onClick={handleAddNewPoll}
                  />
                </div>
              </div>
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
              tableData={getDataPolls}
              pagination={true}
              recordsPerPage={10}
              recordsPerPageSelectListOption={true}
              onActionSelection={scopeSelection}
            ></RdsCompDatatable>
             <RdsOffcanvas
              canvasTitle="Edit"
              placement="end"
              offId="poll-edit-off"
              offcanvaswidth={650}
              backDrop={true}
              scrolling={false}
              preventEscapeKey={false}
            >
              <RdsNavtabs
                navtabsItems={navtabsItemsEdit}
                type={"tabs"}
                activeNavTabId={activeNavTabIdEdit}
                activeNavtabOrder={(activeNavTabIdEdit) => {
                  setActiveNavTabIdEdit(activeNavTabIdEdit);
                }}
                justified={false}>
    
                {activeNavTabIdEdit === "0" && (
                  <RdsCompPollsQuestion
                    widgetList={[
                      { option: "a", value: "a" },
                      { option: "b", value: "b" },
                    ]}
                    questionData={editQuestionData}
                    getPollsQuestion={getEditPollsQuestionData}
                  ></RdsCompPollsQuestion>
                )}
    
                {activeNavTabIdEdit === "1" && (
                  <>
                    <RdsCompPollsOption  optionsData={editPollsOptionData}  getPollsOptionData={getPollsEditOptionData}></RdsCompPollsOption>
                  </>
                )}
              </RdsNavtabs>
              <div className="row mt-5 footer-buttons bottom-0 mx-0 ">
                <div className="col-md-2 mx-2">
                  <RdsButton
                    label="Cancel"
                    colorVariant="primary"
                    block={true}
                    size="small"
                    databsdismiss="offcanvas"
                    tooltipTitle={""}
                    type="button"
                    isOutline={true}
                  />
                </div>
                <div className="col-2">
                  <RdsButton
                    label="Save"
                    size="small"
                    colorVariant="primary"
                    block={true}
                    databsdismiss="offcanvas"
                    tooltipTitle={""}
                    type="button"
                    showLoadingSpinner={true}
                    onClick={editDataHandler}
                  />
                </div>
              </div>
            </RdsOffcanvas>
            <RdsOffcanvas
              canvasTitle="Results"
              placement="end"
              offId="show-result-off"
              offcanvaswidth={700}
              backDrop={false}
              scrolling={false}
              preventEscapeKey={false}
            >
              {pollsResultData.length && pollsResultData.map((e:any)=>(<>
                <div className="row mx-4">
                <RdsLabel  label={e.text} size="16px"></RdsLabel>
              </div>
              {/* <div className="row p-4">
                <RdsProgressBar
                  colorVariant="primary"
                  displaypercentage
                  height={15}
                  progressWidth={e.voteCount}
                  role="single"
                  striped="default"
                />
              </div> */}
              <div className="input-group mb-3">
                <div className="form-control border-0">
                <RdsProgressBar
                  colorVariant="primary"
                  displaypercentage
                  height={15}
                  progressWidth={e.voteCount}
                  role="single"
                  striped="default"
                /> 
                </div>
              <div className="input-group-prepend">
        <span className="input-group-text border-0 bg-transparent" id="basic-addon1">
        <RdsLabel  label={`${e.voteCount}%`} size="16px"></RdsLabel>
        </span>
      </div>
    </div>
              </>))}
             
              <div className="footer-buttons justify-content-end bottom-0 pt-0">
                <RdsButton
                  class="me-2"
                  label="CANCEL"
                  type="button"
                  databsdismiss="offcanvas"
                  isOutline={true}
                  colorVariant="primary"
                ></RdsButton>
              </div>
            </RdsOffcanvas>
             <RdsCompAlertPopup
                alertID="poll-delete-off"
                onSuccess={deleteHandler}
              />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Polls;



