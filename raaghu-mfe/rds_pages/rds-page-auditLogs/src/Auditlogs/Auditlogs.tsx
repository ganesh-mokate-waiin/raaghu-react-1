import React, { useEffect, useReducer, useRef, useState } from "react";
import { RdsCompDatatable } from "../../../rds-components";
import "./Auditlogs.css";
import {
  RdsBadge,
  RdsOffcanvas,
  RdsDatePicker,
  RdsInput,
  RdsLabel,
  RdsSelectList,
  RdsNavtabs,
  RdsButton,
  RdsIcon,
} from "../../../rds-elements";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
  auditLogsData,
  auditActionData,
} from "../../../../libs/state-management/audit-logs/audit-log-slice";
import { useTranslation } from "react-i18next";

export interface RdsPageAuditlogsProps {
  listItem1?: any;
  listItem2?: any;
  deleteEvent?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
  parameterData?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
  ChangeLogparameterData?: (
    event: React.MouseEventHandler<HTMLDivElement>
  ) => void;
  // changeLogs: any;
  // changeLogsHeaders: any;
  isShimmer?: boolean;
}

const Auditlogs = (props: RdsPageAuditlogsProps) => {
  const audituser = useAppSelector((state) => state.persistedReducer.auditLog);
  const [auditData, setAuditData] = useState<any[]>([{}]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();



const Auditpayload = ()=>{
  const payload = {
    userName: selectFilterValue.userName,
    url: selectFilterValue.url,
    minDuration: selectFilterValue.minDuration,
    maxDuration: selectFilterValue.maxDuration,
    httpMethod: selectFilterValue.httpMethod,
    HttpStatusCode: selectFilterValue.HttpStatusCode,
    applicationName: selectFilterValue.applicationName,
    correlationId: selectFilterValue.correlationId,
    exceptions: selectFilterValue.exceptions,
  }
  dispatch(auditLogsData(payload) as any);
  const auditDataTable = audituser.audits.items.map((dataAudit: any) => {
    return {
      id: dataAudit.id,
      httpStatusCode: dataAudit.httpStatusCode,
      userName: dataAudit.userName,
      clientIpAddress: dataAudit.clientIpAddress,
      executionTime: dataAudit.executionTime,
      // executionDuration: dataAudit.executionDuration,
      applicationName: dataAudit.applicationName,
      browserInfo: dataAudit.browserInfo,
      httpMethod: dataAudit.httpMethod,
      url: dataAudit.url,
      clientName: dataAudit.clientName,
      exceptions: dataAudit.exceptions,
      correlationId: dataAudit.correlationId,
      comments: dataAudit.comments,
      // extraProperties : dataAudit.extraProperties
    };
  }, []);
  setAuditData(auditDataTable);
}
  

  useEffect(() => {
    Auditpayload();
  }, [dispatch]);


  const [selectFilterValue, setSelectFilterValue] = useState({
    userName: "",
    url: "",
    minDuration: "",
    maxDuration: "",
    httpMethod: "",
    HttpStatusCode: "",
    applicationName: "",
    correlationId: "",
    exceptions: "",
    executionTime : "",
    startDate:'',
    endDate:''
  });
  const [tableDataRowid, setTableDataRowId] = useState(0);
  const operationActions = [
    { id: "view", displayName: "View", offId: "auditLogs" },
  ];

  const onActionFilter = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      userName: event?.target?.value,
    });
  };

  const onUrlFilter = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      url: event?.target?.value,
    });
  };

  // const onMinDurationFilter = (event: any) => {
  //   setSelectFilterValue({
  //     ...selectFilterValue,
  //     executionDuration: event?.target?.value,
  //   });
  // }; 

  const onApplicationNameFilter = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      applicationName: event?.target?.value,
    });
    return auditData
  };

  const onCorrelationIdFilter = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      correlationId: event?.target?.value,
    });
    return auditData
  };
  const onHttpStatusCode = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      correlationId: event?.target?.value,
    });
    return auditData
  };

  const HttpMethod = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      httpMethod: event?.target?.value,
    });
    return auditData
  };

  const onHasExceptionFilter = (event: any) => {
    setSelectFilterValue({
      ...selectFilterValue,
      exceptions: event?.target?.value,
    });
    return auditData
  };


  const onActionSelection = (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);
    dispatch(auditActionData(rowData.id) as any);
  };

  const AuditTableData = [
    {
      displayName: "Http Request",
      key: "httpStatusCode",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "User",
      key: "userName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "IP Address",
      key: "clientIpAddress",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "Time",
      key: "executionTime",
      datatype: "date",
      sortable: true,
    },
    // {
    //   displayName: "Duration",
    //   key: "executionDuration",
    //   datatype: "number",
    //   sortable: true,
    // },
    {
      displayName: "Application Name",
      key: "applicationName",
      datatype: "text",
      sortable: true,
    },
  ];

  const navtabsItems = [
    { label: "Overall", tablink: " #nav-overall", id: 0 },
    { label: "Actions", tablink: " #nav-action", id: 1 },
  ];

  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [showAction, setShowAction] = useState(false);

  const handleSearch = (event: any) => {
    };
  const dateRangeHandler=  (startEndDate:any) =>{
    
    const [start, end] = startEndDate;
    setSelectFilterValue({
      ...selectFilterValue,
      startDate:start.toISOString(),
      endDate:end.toISOString(),
    }); 

  };
  return (
    <div className="container-fluid p-0 m-0 h-100">
      <div className="row h-100">
        <div className="col-md-12 h-100">
          <div className="card border-0 rounded-0 card-stretch">
            <div className="card-body">
              <div className="align-items-end justify-content-between row">
                <div className="col-xxl-3 col-xl-3 flex-grow-1 mb-4">
                 <RdsDatePicker
                     customDate={dateRangeHandler}
                    selectedDate={selectFilterValue.startDate}
                    type="advanced"
                  ></RdsDatePicker>
                </div>
                <div className="col-xxl-1 col-xl-1 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="User"
                    onChange={onActionFilter}
                  ></RdsInput>
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="Url Filter"
                    onChange={onUrlFilter}
                  ></RdsInput>
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="Min Duration"
                  // onChange={onMinDurationFilter}
                  ></RdsInput>
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="Max Duration"
                    onChange={(event) => handleSearch(event)}
                  ></RdsInput>
                </div>
              </div>
              <div className="justify-content-between row">
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsSelectList
                    label="Http Method"
                    onSelectListChange={HttpMethod}
                    selectItems={[
                      {
                        option: "GET",
                      },
                      {
                        option: "POST",
                      },
                      {
                        option: "DELETE",
                      },
                      {
                        option: "POST",
                      },
                      {
                        option: "HEAD",
                      },
                      {
                        option: "TRACE",
                      },
                    ]}
                  />
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsSelectList
                    label="Http Status Code"
                    onSelectListChange={onHttpStatusCode}
                    selectItems={[
                      {
                        option: "100 - Continue",
                      },
                      {
                        option: "101 - Switching Protocols",
                      },
                      {
                        option: "101 - Switching Protocols",
                      },
                      {
                        option: "103 - Early Hints",
                      },
                      {
                        option: "200 - OK",
                      },
                      {
                        option: "201 - Created",
                      },
                    ]}
                  />
                </div>

                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="Application Name"
                    onChange={onApplicationNameFilter}
                  ></RdsInput>
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsInput
                    placeholder="Correlation ID"
                    onChange={onCorrelationIdFilter}
                  ></RdsInput>
                </div>
                <div className="col-xxl-2 col-xl-2 flex-grow-1 mb-4">
                  <RdsSelectList
                    label="Has Exception"
                    onSelectListChange={onHasExceptionFilter}
                    selectItems={[
                      {
                        option: "Yes",
                      },
                      {
                        option: "No",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="d-xxl-flex d-xl-flex d-lg-flex justify-content-end mt-2">
                <RdsButton
                  type="button"
                  block={false}
                  colorVariant="primary"
                  size="small"
                  isOutline={false}
                  icon = "search"
                  iconFill = {false}
                  iconStroke = {true}
                  class="btn-icon"
                  iconColorVariant = "light"
                  iconHeight = "15px"
                  iconWidth = "15px"
                  onClick={Auditpayload}
                 ></RdsButton>
              </div>

              <div className="row mx-3 my-5">
                <RdsCompDatatable
                  actionPosition="right"
                  classes="table__userTable"
                  tableHeaders={AuditTableData}
                  tableData={auditData}
                  pagination={true}
                  recordsPerPage={10}
                  noDataTitle="Currently you do not have Audit log"
                  onActionSelection={onActionSelection}
                  actions={operationActions}
                  recordsPerPageSelectListOption={true}
                ></RdsCompDatatable>
              </div>
            </div>

            <RdsOffcanvas
              backDrop={true}
              preventEscapeKey={true}
              scrolling={false}
              offId="auditLogs"
              placement="end"
              canvasTitle="Detail"
              className="mx-1"
            >
              <RdsNavtabs
                navtabsItems={navtabsItems}
                type="tabs"
                isNextPressed={showAction}
                activeNavTabId={activeNavTabId}
                activeNavtabOrder={(activeNavTabId) => {
                  setActiveNavTabId(activeNavTabId), setShowAction(false);
                }}
              />
              {activeNavTabId === "0" && showAction === false && (
                <ViewOperationLogsOffCanvas
                  selectedRowData={auditData.filter(
                    (item: any) => item.id == (tableDataRowid || 1)
                  )}
                ></ViewOperationLogsOffCanvas>
              )}
              {(activeNavTabId === "1" || showAction == true) && (
                <ActionOperationLogsOffCanvas
                  selectedRowData={auditData.filter(
                    (item: any) => item.id == (tableDataRowid || 1)
                  )}
                ></ActionOperationLogsOffCanvas>
              )}
            </RdsOffcanvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auditlogs;
const ViewOperationLogsOffCanvas = (selectedRowData: any) => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Http Status Code : </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            {/* <span>{selectedRowData.selectedRowData[0]?.username}</span> */}
            <RdsBadge
              size="small"
              label={selectedRowData.selectedRowData[0]?.httpStatusCode}
              colorVariant="dark"
            ></RdsBadge>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Http Method :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <RdsBadge
              size="small"
              label={selectedRowData.selectedRowData[0]?.httpMethod}
              colorVariant="success"
            ></RdsBadge>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Url :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.url}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Client Name :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.clientName}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Exceptions :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.exceptions}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>User Name :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.userName}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>'Time' :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.executionTime}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Duration :</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.executionDuration}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Browser Info : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            <span>{selectedRowData.selectedRowData[0]?.browserInfo}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Application Name : </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>{selectedRowData.selectedRowData[0]?.applicationName}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Correlation Id : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            <span>{selectedRowData.selectedRowData[0]?.correlationId}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Comments : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            <span>{selectedRowData.selectedRowData[0]?.comments}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Extra properties : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            <span>{selectedRowData.selectedRowData[0]?.extraProperties}</span>
          </div>
        </div>
      </div>
      <div className="footer-buttons my-2">
        <div className="row">
          <div className="col-md-12 d-flex">
            <div>
              <RdsButton
                label="Close"
                type="button"
                colorVariant="primary"
                size="small"
                databsdismiss="offcanvas"
                isOutline={true}
              ></RdsButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ActionOperationLogsOffCanvas = (selectedRowData: any) => {
  return (
    <>
      <div className="row mt-4">
        <h5 className="py-4">
          <RdsLabel label="Http Status Code" />
        </h5>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-4">
            <span>Duration : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            <span>
              {selectedRowData.selectedRowData[0]?.executionDuration} ms
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <span>Parameters : </span>
          </div>
        </div>
        <div className="col-md-6  ">
          <div className="form-group p-2 fs-6 mb-3">
            {/* <span>{selectedRowData.selectedRowData[0]?.extraProperties}</span> */}
          </div>
        </div>
      </div>

      <div className="footer-buttons my-2">
        <div className="row">
          <div className="col-md-12 d-flex">
            <div>
              <RdsButton
                label="Close"
                type="button"
                colorVariant="primary"
                size="small"
                databsdismiss="offcanvas"
                isOutline={true}
              ></RdsButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
