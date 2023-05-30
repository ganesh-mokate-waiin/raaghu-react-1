import React, { useEffect, useState } from "react";
import JSZip from "jszip";
// import { useTranslation } from "react-i18next";
import { RdsCompDatatable } from "../../../rds-components";
import { RdsButton, RdsIcon, RdsModal } from "../../../../../raaghu-elements/src";
import { useAppDispatch, useAppSelector, } from "../../../../libs/state-management/hooks";
import { RequestsData, deletePersonalData, downloadTokenPersonalData, getPersonalData, requestPersonalData, } from "../../../../libs/state-management/personal-data/personal-data-slice";

const PersonalData = (props: any) => {
    // const { t } = useTranslation();
    const [tableDataid, setTableDataRowId] = useState(0);
    const dispatch = useAppDispatch();
    const [personalTableData, setPersonalTableData] = useState<any[]>([{}]);
    //const Data = useAppSelector((state) => state.persistedReducer.personalData) as any;
    const pData = useAppSelector((state) => state.persistedReducer.personalData);
    const [personalDataSuccess, setPersonalDataSuccess] = useState(false);
    const requestPersonalDataStatus = pData.status;


    const tableHeaders = [
        {
            displayName: "Creation Time",
            key: "creationTime",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: "Ready Time",
            key: "readyTime",
            datatype: "text",
            sortable: false,
        },
    ];

    const actions = [
        { id: "download", displayName: "Download" },
    ];

    const onActionSelection = (rowData: any, actionId: any) => {
        let id = rowData.id;
        if (actionId == "download") {
            downloadTokenPersonalDataPayload(id);
        }
    };

    const downloadTokenPersonalDataPayload = (id: any) => {
        dispatch(downloadTokenPersonalData(id) as any).then((res: any) => {
            if (res) {
                const data = JSON.stringify(res);
                const zip = new JSZip();
                zip.file("PersonalData.json", data)
                zip.generateAsync({ type: "blob" }).then(function (content: any) {
                    const url = window.URL.createObjectURL(content);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "PersonalData.zip");
                    document.body.appendChild(link);
                    link.click();
                })
            }
        });


    }



    const Personalpayload = () => {
        const userId = localStorage.getItem("userId");
        dispatch(getPersonalData(userId) as any);
        if (pData.personalData) {
            const personalDataTable = pData.personalData && pData.personalData.items.map((dataPersonal: any) => {
                const dateOne = new Date(dataPersonal.readyTime);
                let dayOne = dateOne.getDate();
                let monthOne = dateOne.getMonth() + 1;
                let yearOne = dateOne.getFullYear();
                let readyTime = dateOne.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });
                let readyTimes = `${yearOne}/${monthOne}/${dayOne}` + '\n' + `${readyTime}`;
                const date = new Date(dataPersonal.creationTime);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let currentTime = date.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });
                let currentDate = `${year}/${month}/${day}` + '\n' + `${currentTime}`;
                return {
                    creationTime: currentDate,
                    readyTime: readyTimes,
                    id: dataPersonal.id
                };
            }, []);
            setPersonalTableData(personalDataTable);
        }
    }

    useEffect(() => {
        Personalpayload();
    }, [dispatch]);

    const handlerRequestData = () => {
        dispatch(requestPersonalData() as any)
            .then((res: any) => {
                if (res && requestPersonalDataStatus === "success") {
                    setPersonalDataSuccess(true);
                } else {
                    setPersonalDataSuccess(false);
                }
            })
            .catch(() => {
                setPersonalDataSuccess(false);
            });
    };

    const handlerDeletePersonalData = () => {
        dispatch(deletePersonalData() as any);
        setPersonalTableData([]);
    };

    return (
        <div className="container-fluid p-0 m-0">

            <div className="row align-items-center">
                <div className="d-flex justify-content-end">
                    <RdsModal
                        modalId="modal1"
                        modalAnimation="modal fade"
                        showModalFooter={false}
                        showModalHeader={false}
                        scrollable={false}
                        verticallyCentered={true}
                        modalbutton={<RdsButton
                            icon="plus"
                            label={("Request Peronal Data") || ""}
                            iconColorVariant="light"
                            iconHeight="15px"
                            iconWidth="15px"
                            iconFill={false}
                            iconStroke={true}
                            block={false}
                            size="small"
                            type="button"
                            colorVariant="primary"
                            onClick={handlerRequestData}
                            class="mx-2"
                        ></RdsButton>}
                        cancelButtonName="OK"
                    >
                        <div>
                            <div className="text-center">
                                {!personalDataSuccess && (
                                    <div className="container">
                                        <div className="py-4">
                                            <RdsIcon
                                                width="80px"
                                                height="80px"
                                                name="close_circle"
                                                colorVariant={"danger"}
                                                stroke={true}
                                            ></RdsIcon>
                                        </div>
                                        <div className="py-4 fs-5">
                                            There is a personal data download request you have made before. You cannot make a new one until this request is fulfilled.
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center">
                                            <RdsButton
                                                class="me-2"
                                                tooltipTitle={""}
                                                type={"button"}
                                                label="OK"
                                                colorVariant="outline-primary"
                                                size="small"
                                                databsdismiss="modal"
                                            ></RdsButton>
                                        </div>
                                    </div>
                                )}
                                {personalDataSuccess && (
                                    <div className="container">
                                        <div className="py-4">
                                            <RdsIcon
                                                width="80px"
                                                height="80px"
                                                name="tick_circle"
                                                colorVariant={"success"}
                                                stroke={true}
                                            ></RdsIcon>
                                        </div>
                                        <div className="py-4 fs-5">
                                            Your personal data request is being processed. You can download it from this page, once it's ready!
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <RdsButton
                                                class="me-2"
                                                tooltipTitle={""}
                                                type={"button"}
                                                label="OK"
                                                colorVariant="outline-primary"
                                                size="small"
                                                databsdismiss="modal"
                                            ></RdsButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </RdsModal>
                    {/* <RdsButton
                        icon="plus"
                        label={("Delete Peronal Data") || ""}
                        iconColorVariant="light"
                        iconHeight="15px"
                        iconWidth="15px"
                        iconFill={false}
                        iconStroke={true}
                        block={false}
                        size="small"
                        type="button"
                        colorVariant="danger"
                        onClick={handlerDeletePersonalData}
                    ></RdsButton> */}
                </div>
            </div>
            <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch mt-3">
                <RdsCompDatatable
                    actionPosition="right"
                    tableHeaders={tableHeaders}
                    actions={actions}
                    tableData={personalTableData}
                    pagination={true}
                    recordsPerPage={10}
                    recordsPerPageSelectListOption={true}
                    onActionSelection={onActionSelection}
                ></RdsCompDatatable>
            </div>
        </div>

    );
};

export default PersonalData;