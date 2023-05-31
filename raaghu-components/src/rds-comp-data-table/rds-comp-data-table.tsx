import React, { MouseEvent, useState, useEffect, useRef } from "react";
import {
  RdsIcon,
  RdsBadge,
  RdsInput,
  RdsButton,
  RdsPagination,
  RdsIllustration,
  RdsAvatar
} from '../rds-elements';
import "./rds-comp-data-table.css";


export interface RdsCompDatatableProps {
  enablecheckboxselection?: boolean;
  noDataTitle?: string,
  noDataheaderTitle?:string,
  classes?: string;
  swapRows?: any
  isSwap?: any
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
    offId?: string;
    modalId?: string;
  }[];
  tableData: any[];
  pagination: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection?: (
    rowData: any,
    actionId: any
  ) => void;
  onRowSelect?: (data: any) => void
  tableStyle?: any;
  alignmentType?: any;
  actionPosition?:"right"|"left",

  // onSortSelection(arg: {
  //    sortClickEvent: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>;
  //    sortOrder: string;
  // }): void;
}
const RdsCompDatatable = (props: RdsCompDatatableProps) => {
  const [data, setData] = useState(props.tableData);
  const [array, setArray] = useState<boolean[]>([])

  // function openCloseDropDown(data: any) {
  //   let tempArray: boolean[] = [];
  //   array?.map((res: any, index: number) => {
  //     if (index == data) {
  //       tempArray.push(!array[data]);
  //     }
  //     else {
  //       tempArray.push(false);
  //     }
  //   })
  //   setArray(tempArray);
  // }

  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean;
  useEffect(() => {
    if (!sort) {
      setData(props.tableData);
      let tempArray: boolean[] = [];
      props?.tableData?.map(res => {
        tempArray.push(false);
      })
      setArray(tempArray);
    }

  }, [props.tableData]);

  // useEffect(() => {
  //   const a = document.querySelectorAll('[data-bs-toggle]');
  //   a.forEach((element)=>{
  //     element.addEventListener('click',()=>{
        
  //       const b = document.querySelectorAll('.offcanvas-backdrop')
  //       b.forEach((el: any, index: number) => {
  //         if (index != 0) {
  //           el.classList.remove('offcanvas-backdrop');
  //           el.classList.remove('fade');
  //           el.classList.remove('show');
  //         }
  //       })
  //     })
  //   })
  // }, [array])

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
    setRowStatus({
      startingRow: (currentPage - 1) * recordsPerPage, //0-index
      endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
    });
  };

  const [html, setHtml] = useState("");
  const [index, setIndex] = useState(-1);
  const handleMouseUp = (e: any) => {
    if (props.isSwap) {

      console.log("Mouse Up-> ");
      const index1 = e.currentTarget.parentElement.rowIndex;
      const index2 = index;
      if (index1 === index2) {
        e.preventDefault();
        return;
      }
      props.swapRows(index, index1);

    }
    return;
  };
  const draggingItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const handleDragStart = (e: any, position: any) => {
    if (props.isSwap) {
      draggingItem.current = position;
    }
  };
  const handleDragEnter = (e: any, position: any) => {
    if (props.isSwap) {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
      const listCopy = [...data];
      const draggingItemContent = listCopy[draggingItem.current];
      listCopy.splice(draggingItem.current, 1);
      listCopy.splice(dragOverItem.current, 0, draggingItemContent);
      console.log(draggingItem.current, "      ", dragOverItem.current);

      draggingItem.current = dragOverItem.current;
      dragOverItem.current = null;
      props.swapRows(listCopy)
      setData(listCopy);
    }
  };

  const actionOnClickHandler = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number,
    action: {
      displayName: string;
      id: string;
      offId?: string;
      modalId?: string;
    }
  ) => {
    if(action.offId !=undefined){
    const allBackdrops = document.querySelectorAll('.offcanvas-backdrop')
    if (allBackdrops.length > 1) {
      for (let i = 0; i < allBackdrops.length - 1; i++) {
        allBackdrops[i].remove();
      }
    }}

    let tempArray: boolean[] = [];
    array.map((res: any) => {
      tempArray.push(false);
    })
    setArray(tempArray);
    if (
      action.id == "edit" &&
      action.offId != undefined &&
      action.modalId != undefined
    ) {
      let tempData = data?.map((Data) => {
        if (Data.id == tableDataRowIndex) {
          return { ...Data, isEndUserEditing: true };
        } else {
          return { ...Data };
        }
      });
      setData(tempData);
    }
    props.onActionSelection != undefined &&
      props.onActionSelection(tableDataRow, action.id);
  };
  let tempData: any;
  const onInputChangeHandler = (
    e: any,
    tableDataRow: any,
    tableHeader: any,
    key: any,
    tableDataRowIndex: number
  ) => {
    tempData = data?.map((Data) => {
      if (Data.id == tableDataRowIndex) {
        const obj = Object.assign({}, Data);
        obj[key] = e.target.value;
        return obj;
      } else {
        return { ...Data };
      }
    });
  };

  const onEditCheck = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number
  ) => {
    let tempata = tempData?.map((Data: any) => {
      if (Data.id == tableDataRowIndex) {
        return { ...Data, isEndUserEditing: false };
      } else {
        return { ...Data };
      }
    });
    setData(tempata);
  };

  const onEditClose = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number
  ) => {
    let tempData = data?.map((Data) => {
      if (Data.id == tableDataRowIndex) {
        return { ...Data, isEndUserEditing: false };
      } else {
        return { ...Data };
      }
    });
    setData(tempData);
  };
  const handleChange = (e: any) => {
    let tempUser
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = data?.map((user) => {
        return { ...user, selected: checked };
      });
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser)
    } else {
      tempUser = data?.map((user) =>
        user.id == name ? { ...user, selected: checked } : user
      );
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser)
    }
  };

  const onSortClickHandler = (
    event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    sortOrder: string,
    col: string
  ) => {
    const sorted = [...data].sort((a, b) => {
      if (a[col] === undefined) return 1;
      if (b[col] === undefined) return -1;
      if (a[col] === undefined && b[col] === undefined) return 0;
      return (
        a[col].toString().localeCompare(b[col].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "ascending" ? 1 : -1)
      );
    });
    setData(sorted);
    sort = true;
  };
  let Classes = props.classes;

  let actionPosition =props.hasOwnProperty("actionPosition")&&props.actionPosition ==="right"?true:false;

  return (
    <>
      {data?.length == 0 && (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <RdsIllustration           
            label={props.noDataheaderTitle}
            subLabel={props.noDataTitle} 
            colorVariant="light"
          />
        </div>
      )}

      {data?.length > 0 && (<>
        <div className="sm-datatable">
          <table
            className={`table  table-hover table-bordered table-responsive  ${Classes} `}
            id="sortTable"
            width="400px"
          >
            <thead className="text-nowrap">
              <tr className="align-middle " >
              {actionPosition!=true&&props.tableHeaders &&
                  props.tableHeaders?.length > 0 &&
                  props.actions &&
                  props.actions?.length > 0 && (
                    <th
                      className="text-center fw-bold"
                    >
                      Actions
                    </th>
                  )}
                {props.isSwap && (<th></th>)}
                {props.enablecheckboxselection && (
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect"
                      checked={
                        data.filter((user) => user?.selected == true)?.length ==
                        data?.length
                      }
                      onChange={handleChange}
                    />
                  </th>
                )}
                {props?.tableHeaders?.map((tableHeader, index) => (
                  <th scope="col" key={"tableHeader-" + index} >
                    <div className="align-items-center d-flex">
                      <span className="fw-bold">
                        {tableHeader.displayName}
                      </span>
                      <div className="header-options mobile-header-option cursor-pointer ps-1">
                        {tableHeader.sortable && (
                          <span className="px-2 d-flex">
                            <span
                              onClick={(e) =>
                                onSortClickHandler(e, "ascending", tableHeader.key)
                              }
                            >
                              <RdsIcon
                                name={"up"}
                                height="12px"
                                width="12px"
                                stroke={true}
                              />
                            </span>
                            <span
                              onClick={(e) =>
                                onSortClickHandler(e, "descending", tableHeader.key)
                              }
                            >
                              <RdsIcon
                                name={"down"}
                                height="12px"
                                width="12px"
                                stroke={true}
                              />
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                {actionPosition&&props.tableHeaders &&
                  props.tableHeaders?.length > 0 &&
                  props.actions &&
                  props.actions?.length > 0 && (
                    <th
                      className="text-center fw-bold"
                    >
                      Actions
                    </th>
                  )}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data?.map(
                (tableDataRow, index) =>
                  (props.pagination
                    ? typeof rowStatus.endingRow != "undefined" &&
                    index >= rowStatus.startingRow &&
                    index < rowStatus.endingRow
                    : true) &&
                  (
                    
                    <tr
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      draggable
                      key={"tableRow-" + index}>
                         {actionPosition!=true&&props.actions && props.actions?.length > 0 && (
                        <td className="align-middle text-center">
                          {!tableDataRow.isEndUserEditing ? (
                            <>
                              <div className="btn-group dropstart">
                                <button
                                  className="btn rounded-pill border-0 three-dot-btn"
                                  type="button"
                                  aria-expanded="false"
                                  //onClick={() => openCloseDropDown(index)}
                                  data-bs-toggle="dropdown"
                                  data-bs-auto-close="true"
                                  id="dropdownMenuButton"
                                  data-testid="action-btn"
                                >
                                  <RdsIcon
                                    name={"three_dots"}
                                    height="14px"
                                    width="14px"
                                    stroke={true}
                                    fill={true}
                                  // class="bi bi-three-dots-vertical"
                                  />
                                </button>
                                {/* array[index] &&  */}
                                {(
                                  <ul  aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                                    {props.actions?.map((action, actionIndex) => (
                                      <li
                                        key={
                                          "action-" +
                                          actionIndex +
                                          "-inside-tableRow" +
                                          index
                                        }
                                      >
                                        {action.modalId != undefined ? (
                                          <a
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${action?.modalId}`}
                                            aria-controls={action?.modalId}
                                            // data-bs-backdrop={false}
                                            onClick={(e) => {
                                              actionOnClickHandler(
                                                e,
                                                tableDataRow,
                                                tableDataRow.id,
                                                action
                                              );
                                            }}
                                            className="dropdown-item text-wrap"
                                          >
                                            {action.displayName}
                                          </a>
                                        ) : (
                                          <>
                                            <a
                                              data-bs-toggle="offcanvas"
                                              data-bs-target={`#${action?.offId}`}
                                              aria-controls={action?.offId}
                                              data-bs-backdrop={false}
                                              onClick={(e) => {
                                                actionOnClickHandler(
                                                  e,
                                                  tableDataRow,
                                                  tableDataRow.id,
                                                  action
                                                );
                                              }}
                                              className="dropdown-item text-wrap"
                                            >
                                              {action.displayName}
                                            </a>
                                          </>
                                        )}
                                      </li>
                                    ))}
                                  </ul>)}
                              </div>
                            </>
                          ) : (
                            <div className="d-flex">
                              <RdsButton
                                class="action"
                                colorVariant="primary"
                                size="medium"
                                tooltipTitle={""}
                                type={"button"}
                                onClick={(e) => {
                                  onEditCheck(e, tableDataRow, tableDataRow.id);
                                }}
                              >
                                <RdsIcon
                                  name={"check"}
                                  height="14px"
                                  width="14px"
                                  stroke={true}
                                  fill={false}
                                // class="bi bi-check2"
                                />
                              </RdsButton>
                              <RdsButton
                                class="ms-2 text-white"
                                colorVariant="danger"
                                tooltipPlacement="top"
                                size="medium"
                                tooltipTitle={""}
                                type={"button"}
                                onClick={(e) => {
                                  onEditClose(e, tableDataRow, tableDataRow.id);
                                }}
                              >
                                <RdsIcon
                                  name={"close"}
                                  height="14px"
                                  width="14px"
                                  stroke={true}
                                  fill={true}
                                // class="bi bi-close"
                                />
                              </RdsButton>
                            </div>
                          )}
                        </td>
                      )}
                      {props.isSwap && (
                        <th  >
                          <RdsIcon name="three_dots_horizontal" height="20px" width="20px" fill={false} stroke={true} />
                        </th>
                      )}
                      {props.enablecheckboxselection && (
                        <th scope="row" className="align-middle">
                          <input
                            type="checkbox"
                            name={tableDataRow?.id}
                            onChange={handleChange}
                            checked={tableDataRow?.selected}
                            className="form-check-input"
                            id="rowcheck{user.id}"
                          />
                        </th>
                      )}
                      {props.tableHeaders?.map((tableHeader, tableHeaderIndex) => (
                        <td
                          key={
                            "column-" +
                            tableHeaderIndex +
                            "-inside-tableRow" +
                            index
                          }
                          className="px-2 align-middle"
                        >
                          {!tableDataRow.isEndUserEditing ? (
                            <div>
                              {tableHeader.datatype === "text" &&(
                                <>
                                {tableHeader.key.includes("time")|| tableHeader.key.includes("Time")? <>
                                {`${("0" + new Date(tableDataRow[tableHeader.key]).getDate()).slice(-2)}/${("0" + (new Date(tableDataRow[tableHeader.key]).getMonth() + 1)).slice(-2)}/${new Date(tableDataRow[tableHeader.key]).getFullYear()}, ${("0" + new Date(tableDataRow[tableHeader.key]).getHours()).slice(-2)}:${("0" + new Date(tableDataRow[tableHeader.key]).getMinutes()).slice(-2)} ${new Date(tableDataRow[tableHeader.key]).getHours() >= 12 ? "PM" : "AM"}`}
                                </>:<>
                                {tableDataRow[tableHeader.key]}
                                </>}
                                </>
                              )
                                }
                              {tableHeader.datatype === "number" &&
                                tableDataRow[tableHeader.key]}
                              {tableHeader.datatype === "badge" && (
                                <RdsBadge colorVariant={tableDataRow[tableHeader.key].badgeColorVariant
                                  ? tableDataRow[tableHeader.key].badgeColorVariant : "primary"} label={tableDataRow[tableHeader.key].content
                                    ? tableDataRow[tableHeader.key].content
                                    : tableDataRow[tableHeader.key]}
                                />
                              )}
                              {tableHeader.datatype === "avatarTitleInfo" && (
                                <div className="avatarTitleInfo">
                                  <RdsAvatar
                                    withProfilePic={true}
                                    profilePic={
                                      tableDataRow[tableHeader.key].avatar
                                    }
                                    firstName={
                                      tableDataRow[tableHeader.key].title
                                        ? tableDataRow[tableHeader.key].title
                                        : tableDataRow[tableHeader.key]
                                    }
                                    role={tableDataRow[tableHeader.key].info}
                                  />
                                </div>
                              )}
                              {tableHeader.datatype === "iconAvatarTitle" && (
                                <div className="d-flex justify-content-evenly align-items-center">
                                  <div className="col-1 me-2">
                                    <RdsIcon
                                      name={
                                        tableDataRow[tableHeader.key].iconName
                                      }
                                      fill={
                                        tableDataRow[tableHeader.key].iconFill
                                      }
                                      stroke={
                                        tableDataRow[tableHeader.key].iconStroke
                                      }
                                      colorVariant={
                                        tableDataRow[tableHeader.key].iconColor
                                      }
                                      width={
                                        tableDataRow[tableHeader.key].iconWidth
                                      }
                                      height={
                                        tableDataRow[tableHeader.key].iconHeight
                                      }
                                      strokeWidth={
                                        tableDataRow[tableHeader.key].iconStrokeWidth
                                      }
                                    />
                                  </div>
                                  {tableDataRow[tableHeader.key].withavatar && (
                                    <div>
                                      <div className="col-5">
                                        <RdsAvatar
                                          withProfilePic={true}
                                          profilePic={
                                            tableDataRow[tableHeader.key].avatar
                                          }
                                        />
                                      </div>
                                      <div className="col-6">
                                        <label>
                                          {tableDataRow[tableHeader.key].title}{" "}
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {tableHeader.datatype === "children" && (
                                <div className="d-flex">
                                  {" "}
                                  {tableDataRow[tableHeader.key]}
                                </div>
                              )}
                              {/* add more types here if reequired */}

                            </div>
                          ) : (
                            <RdsInput
                              inputType={tableHeader.datatype}
                              value={tableDataRow[tableHeader.key]}
                              onChange={(e) => {
                                onInputChangeHandler(
                                  e,
                                  tableDataRow,
                                  tableHeader,
                                  tableHeader.key,
                                  tableDataRow.id
                                );
                              }}
                            />
                          )}
                        </td>
                      ))}
                      {actionPosition&&props.actions && props.actions?.length > 0 && (
                        <td className="align-middle text-center">
                          {!tableDataRow.isEndUserEditing ? (
                            <>
                              <div className="btn-group dropstart">
                                <button
                                  className="btn rounded-pill border-0 three-dot-btn"
                                  type="button"
                                  aria-expanded="false"
                                  //onClick={() => openCloseDropDown(index)}
                                  data-bs-toggle="dropdown"
                                  data-bs-auto-close="true"
                                  id="dropdownMenuButton"
                                  data-testid="action-btn"
                                >
                                  <RdsIcon
                                    name={"three_dots"}
                                    height="14px"
                                    width="14px"
                                    stroke={false}
                                    fill={true}
                                  // class="bi bi-three-dots-vertical"
                                  />
                                </button>
                                {/* array[index] &&  */}
                                {(
                                  <ul  aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                                    {props.actions?.map((action, actionIndex) => (
                                      <li
                                        key={
                                          "action-" +
                                          actionIndex +
                                          "-inside-tableRow" +
                                          index
                                        }
                                      >
                                        {action.modalId != undefined ? (
                                          <a
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${action?.modalId}`}
                                            aria-controls={action?.modalId}
                                            data-bs-backdrop={false}
                                            onClick={(e) => {
                                              actionOnClickHandler(
                                                e,
                                                tableDataRow,
                                                tableDataRow.id,
                                                action
                                              );
                                            }}
                                            className="dropdown-item text-wrap"
                                          >
                                            {action.displayName}
                                          </a>
                                        ) : (
                                          <>
                                            <a
                                              data-bs-toggle="offcanvas"
                                              data-bs-target={`#${action?.offId}`}
                                              aria-controls={action?.offId}
                                              data-bs-backdrop={false}
                                              onClick={(e) => {
                                                actionOnClickHandler(
                                                  e,
                                                  tableDataRow,
                                                  tableDataRow.id,
                                                  action
                                                );
                                              }}
                                              className="dropdown-item text-wrap"
                                            >
                                              {action.displayName}
                                            </a>
                                          </>
                                        )}
                                      </li>
                                    ))}
                                  </ul>)}
                              </div>
                            </>
                          ) : (
                            <div className="d-flex">
                              <RdsButton
                                class="action"
                                colorVariant="primary"
                                size="medium"
                                tooltipTitle={""}
                                type={"button"}
                                onClick={(e) => {
                                  onEditCheck(e, tableDataRow, tableDataRow.id);
                                }}
                              >
                                <RdsIcon
                                  name={"check"}
                                  height="14px"
                                  width="14px"
                                  stroke={true}
                                  fill={false}
                                // class="bi bi-check2"
                                />
                              </RdsButton>
                              <RdsButton
                                class="ms-2 text-white"
                                colorVariant="danger"
                                tooltipPlacement="top"
                                size="medium"
                                tooltipTitle={""}
                                type={"button"}
                                onClick={(e) => {
                                  onEditClose(e, tableDataRow, tableDataRow.id);
                                }}
                              >
                                <RdsIcon
                                  name={"close"}
                                  height="14px"
                                  width="14px"
                                  stroke={true}
                                  fill={true}
                                // class="bi bi-close"
                                />
                              </RdsButton>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        {props.pagination && props.tableData.length > 4 && (
          <div className=" d-flex justify-content-end pt-3 ">
            <RdsPagination
              totalRecords={props.tableData?.length}
              recordsPerPage={props.recordsPerPage ? props.recordsPerPage : 5}
              onPageChange={onPageChangeHandler}
              paginationType={props.recordsPerPageSelectListOption ? "advance" : "default"}
            ></RdsPagination>
          </div>
        )}
      </>)}

    </>
  );
};
export default RdsCompDatatable;