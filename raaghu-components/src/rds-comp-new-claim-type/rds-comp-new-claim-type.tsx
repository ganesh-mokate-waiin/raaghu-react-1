import { RdsCheckbox, RdsLabel, RdsSelectList } from '../rds-elements';
import React, { FormEventHandler, useState, useEffect } from "react";
import { RdsInput, RdsTextArea, RdsButton } from '../rds-elements';

export interface RdsCompNewClaimTypeProps {
  name?: string;
  regex?: string;
  value?: string;
  regexDesc?: string;
  desc?: string;
  onSubmit: any;
  claimsData?: any;
  valueType?: any;
}

const RdsCompNewClaimType = (props: RdsCompNewClaimTypeProps) => {
  const [data, setData] = useState(props.claimsData);
  useEffect(() => {
    setData(props.claimsData);
  }, [props.claimsData]);

  const allFieldsAreEmpty = Object.values(data).every((value) => value === "");

  const onNameChangeHandler = (e: any) => {
    setData({ ...data, name: e.target.value });
  };
  const onRegexChangeHandler = (e: any) => {
    setData({ ...data, regex: e.target.value });
  };
  const onValueChangeHandler = (e: any) => {
    
    setData({ ...data, valueType: e});

  };
  const onRegexDescChangeHandler = (e: any) => {
    setData({ ...data, regexDescription: e.target.value });
  };
  const onDescChangeHAndler = (e: any) => {
    setData({ ...data, description: e.target.value });
  };
  const setDevice = (e: any) => {
    setData({ ...data, required: e });
  };
  return (
    <>
     
      <div className="row mt-3">
      <div className="col-md-12">	
       <RdsInput
            label="Name"
            value={data.name}
            placeholder="Enter Name"
            required={true}
            name="name"
            onChange={onNameChangeHandler}
            dataTestId="name"
          />
      </div>
      <div className="col-md-6 mb-3">	
      {" "}
            <RdsInput
              label="Regex"
              value={data.regex}
              placeholder="Enter Regex"
              name="regex"
              required={false}
              onChange={onRegexChangeHandler}
              dataTestId="regex"
            />
      </div>
      <div className="col-md-6 mb-3">	
            <RdsSelectList
              label={"Value Type"}
              selectItems={props.valueType}
              selectedValue={data.valueType}
              selectedOption={data.valueTypeAsString}
              onSelectListChange={onValueChangeHandler}
            ></RdsSelectList>
      </div>
      <div className="col-md-12  mb-3">	
      <RdsInput
            label="Regex Description"
            value={data.regexDescription}
            placeholder="Enter Regex Description"
            name="regexDesc"
            required={false}
            onChange={onRegexDescChangeHandler}
            dataTestId="reges-description"
          />
      </div>
      <div className="col-md-12">	
      <RdsTextArea
            label="Description"
            placeholder="Enter Description"
            onChange={onDescChangeHAndler}
            value={data.description}
            rows={3}
            dataTestId="description"
          />
      </div>
      
      <div className="col-md-12 mt-3">	
          <RdsCheckbox
            label="Required"
            onChange={e => { setDevice(e.target.checked) }}
            checked={data.required}
            dataTestId="required"
          ></RdsCheckbox>
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
            isDisabled={!data.name}
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

export default RdsCompNewClaimType;
