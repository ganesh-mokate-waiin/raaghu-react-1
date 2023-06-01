import { RdsCheckbox, RdsLabel, RdsSelectList } from '../rds-elements';
import React, { FormEventHandler, useState, useEffect } from "react";
import { RdsInput, RdsTextArea, RdsButton } from '../rds-elements';

export interface RdsCompNewMenuProps {
  onSubmit: any;
  menusData: any;
  valueType?: any;
}

const RdsCompNewMenu = (props: RdsCompNewMenuProps) => {
  // data ={  url?: string;
  //   displayName?: string;
  //   isActive?: boolean;
  //   icon?: string;
  //   target?: string;
  //   elementId?: string;
  //   cssClass?: string;}
  const [data, setData] = useState(props.menusData);
  useEffect(() => {
    setData(props.menusData);
  }, [props.menusData]);

 

  const handlerChangeInput = (e: any,key:any) => {
    setData({ ...data, [key]: e.target.value });
  };
  
  const handlerChangeActive = (e: any) => {
    setData({ ...data, isActive: e });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-3">
          <RdsInput
            label="Url"
            value={data.url}
            placeholder="enter url"
            name="url"
            onChange={(e)=>handlerChangeInput(e,"url")}
            dataTestId="url"
          />
        </div>
        <div className="col-md-12">
          <RdsInput
            label="Display Name"
            value={data.displayName}
            placeholder="enter Name"
            name="displayName"
            required={true}
            onChange={(e)=>handlerChangeInput(e,"displayName")}
            dataTestId="display-name"
          />
        </div>
        {/* <div className="col-md-6">
          <RdsLabel label="Value Type" class="pb-2" />
          <RdsSelectList
            label={"Value Type"}
            selectItems={props.valueType}
            selectedValue={data.valueType}
            selectedOption={data.valueTypeAsString}
            onSelectListChange={onValueChangeHandler}
          ></RdsSelectList>
        </div> */}
      
        <div className="col-md-12 mb-3">
          <RdsCheckbox
            label="Active"
            onChange={(e) => {
              handlerChangeActive(e.target.checked);
            }}
            checked={data.isActive}
            dataTestId="active"
          ></RdsCheckbox>
        </div>
        <div className="col-md-12 mb-3">
          <RdsInput
            label="Icon"
            value={data.icon}
            placeholder="enter icon"
            name="icon"
            onChange={(e)=>handlerChangeInput(e,"icon")}
            dataTestId="enter-icon"
          />
        </div>
        <div className="col-md-12 mb-3">
          <RdsInput
            label="Target"
            value={data.target}
            placeholder="enter target"
            name="target"
            onChange={(e)=>handlerChangeInput(e,"target")}
            dataTestId="target"
          />
        </div>
        <div className="col-md-12 mb-3">
          <RdsInput
            label="Element ID"
            value={data.elementId}
            placeholder="enter element Id"
            name="elementId"
            onChange={(e)=>handlerChangeInput(e,"elementId")}
            dataTestId="enter-id"
          />
        </div>
        <div className="col-md-12 mb-3">
          <RdsInput
            label="CssClass"
            value={data.cssClass}
            placeholder="enter css class"
            name="cssClass"
            onChange={(e)=>handlerChangeInput(e,"cssClass")}
            dataTestId="enter-css-class"
          />
        </div>

        <div className="footer-buttons mb-2 d-flex">
          <RdsButton
            label="CANCEL"
            databsdismiss="offcanvas"
            type={"button"}
            size="small"
            isOutline={true}
            colorVariant="primary"
            class="me-2"
            dataTestId="cancel"
          ></RdsButton>
          <RdsButton
            label="SAVE"
            type={"button"}
            size="small"
            databsdismiss="offcanvas"
            isDisabled={!data.displayName}
            colorVariant="primary"
            class="me-2"
            onClick={() => {
              props.onSubmit(data);
            }}
            dataTestId="save"
          ></RdsButton>
        </div>
      </div>
    </>
  );
};

export default RdsCompNewMenu;
