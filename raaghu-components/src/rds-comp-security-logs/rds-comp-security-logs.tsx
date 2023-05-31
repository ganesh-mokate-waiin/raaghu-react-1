import React from "react";
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompSecurityLogsProps {
  enablecheckboxselection?: boolean;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
  }[];
  actions?: {
    displayName: string;
    id: string;
  }[];
  tableData?: any[];
  pagination?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
}

const RdsCompSecurityLogs = (props: RdsCompSecurityLogsProps) => {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row">
        <div className="col-md-12">
          <div className="card  border-0">
            <RdsCompDatatable
              actionPosition="right"
              tableHeaders={props.tableHeaders}
              actions={props.actions}
              tableData={props.tableData!}
              pagination={props.pagination!}
              recordsPerPage={props.recordsPerPage}
              recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
              
            ></RdsCompDatatable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdsCompSecurityLogs;
