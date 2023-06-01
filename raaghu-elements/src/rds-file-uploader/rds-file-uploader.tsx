import React from "react";
import "./rds-file-uploader.css";
import { useState, useEffect } from "react";
import RdsIcon from "../rds-icon/rds-icon";
export interface RdsFileUploaderProps {
  placeholder?: string;
  size: string;
  colorVariant?: string;
  multiple?: boolean;
  extensions: string;
  limit: number;
  label: string;
  onFileArray?: (files: any[]) => void;
  getFileUploaderInfo?: any;
  validation?: any[];
}

const fileholder: any = [];
const filenameholder: any = [];
const filesize: any = [];

const RdsFileUploader = (props: RdsFileUploaderProps) => {
  const [FileArray, setFileArray] = useState(fileholder);
  const [isExceed, setIsExceed] = useState(false);
  const [fileName, setfileName] = useState(filenameholder);
  const [FileSize, setFileSize] = useState(filesize);
  const [validation, setValidation] = useState(props.validation);
  //

  let size: "form-select-sm" | undefined = undefined;
  // let SIZE: string;
  // SIZE = " ";
  // if (props.size == "small") {
  //   size = "form-select-sm";
  //   SIZE = "small";
  // }
  const kbToMb = (kb: any) => {
    const mb = kb / 1024;
    return Math.round(mb * 100) / 100; // Round off to 2 decimal places
  };

  const fileSizeInMB = kbToMb(props.limit);

  const borderColor = "border-" + props.colorVariant || "primary";
  const onDelete = (id: any) => {
    let tempFN = fileName.filter((Fname: any, i: number) => i !== id);
    setfileName(tempFN);
    let tempFS = FileSize.filter((Fsize: any, i: number) => i !== id);
    setFileSize(tempFS);
    let tempFA = FileArray.filter((Farray: any, i: number) => i !== id);
    setFileArray(tempFA);
  };
  const [fileUploaderData, setFileUploaderData] = useState<any>([]);
  const onchangehandler = (event: any) => {
    const fileSize = event.target.files[0].size / 1024; //now size in kb

    if (fileSize > props?.limit) {
      const tempValid = validation?.map((ele: any, index: number) => {
        if (index == 0) {
          return { ...ele, isError: true };
        } else {
          return ele;
        }
      });
      setValidation(tempValid);
      setIsExceed(true);
    } else {
      const tempValid = validation?.map((ele: any, index: number) => {
        if (index == 0) {
          return { ...ele, isError: false };
        } else {
          return ele;
        }
      });
      setValidation(tempValid);
      setIsExceed(false);
    }
    setFileSize([...FileSize, event.target.files[0].size]);
    let files = event.target.files;

    setfileName([...fileName, event.target.files[0].name]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      setFileArray([...FileArray, event.target?.result]);
    };
    props.getFileUploaderInfo({
      ...fileUploaderData,
      files: event.target.files,
    });
    if (props.multiple) {
      event.target.value = null;
    }
  };

  useEffect(() => {
    props.onFileArray != undefined && props.onFileArray(FileArray);
  }, [FileArray]);

  return (
    <>
      {props.multiple === false ? (
       <div className="">
            <div>
              <label className={`form-label`}>{props.label}</label>
            </div>
            <div>
              <form>
                <input
                  className={` input text-${
                    props.colorVariant
                  } form-control  ${size} `}
                  type="file"
                  name="file"
                  accept={props.extensions}
                  onChange={onchangehandler}
                />
                {validation &&
                  validation.map((val: any, index: number) => (
                    <div key={index}>
                      <small
                        className={`${
                          val.isError ? "showError" : "noError"
                        }`}
                      >
                        {val.hint}
                      </small>
                    </div>
                  ))}

                {/* {isExceed&& <div className="form-control-feedback">
                  <span className="text-danger">File size should not be greater than {fileSizeInMB} MB </span>
                </div>} */}
              </form>
            </div>
          </div>
        
      ) : (
        <div>
          <label htmlFor="file" className="cursor-pointer text-center multiUploader mb-4">
            <img src="../assets/image-data.png" alt ="image data" className="image-data"></img>
                  <span className=" d-block">
                   Drop your files here. 
                  </span>
              <span className="shareOptionText">or <span className={`${
                      props.colorVariant
                        ? ` text-${props.colorVariant}`
                        : `text-dark`
                    } `}>Browse</span></span>
              <input
                className={` col-md-12 input mulinput   ${size} `}
                type="file"
                name="file"
                id="file"
                accept={props.extensions}
                onChange={onchangehandler}
                multiple
                />
            </label>   
         
             
            {/* ------------------ Display names--------------------------- */}
          {fileName.map((filename: string, i: number) => (
            <div key={i} className="d-flex justify-content-between mt-2 fileName">
              <div>
                <span>    <RdsIcon
                      name={"file"}
                      height="16px"
                      width="16px"
                      stroke={true}
                      fill={false}
                    /> </span><span>  {fileName[i]}</span>
              </div>
              <div className="closeIcon">
                  <span
                    className="text-muted"
                  >
                    {" "}
                    {(FileSize[i] / 1048576).toFixed(2)} MB{" "}
                  </span>
                  <span className="iconbox ms-2" onClick={() => onDelete(i)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-x cross "
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </span>
                </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default RdsFileUploader;
