import React, { Fragment, useEffect, useState } from "react";
import "./rds-select-list.css";
export interface RdsSelectProps {
  label: string;
  isDisabled?: boolean;
  isMultiple?: boolean;
  selectedOption?: any;
  size?: string;
  selectItems: any[];
  selectedValue?: any;
  id?: string;
  classes?: string;
  children?: React.ReactNode;
  someCallback?: any;
  onSelectListChange?: any;
  placeholder?:string;
  dataTestId?: string;
}
const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedOption, setselectedoption] = useState(props.selectedValue);

  useEffect(() => {
    if (props.selectedValue) {
      setselectedoption(props.selectedValue);
    } else {
      setselectedoption("");
    }
  }, [props.selectedValue]);

  const handleChange = (e: any) => {
    if (props.isMultiple) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      props.someCallback(value);
    } else {
      props.onSelectListChange(e.target.value);
      setselectedoption(e.target.value);
    }
  };
  const Size = `${props.hasOwnProperty("size") ? props.size : "md"}`;
  const customSize = `${
    Size === "lg"
      ? " form-select-lg"
      : Size === "sm"
      ? " form-select-sm "
      : " "
  }`;
  let multiselect =props.isMultiple?"":'form-select-single'
  let Disabled = props.isDisabled || false;
  return (
    <Fragment>
      {" "}
      <label className="mb-2">{props.label}</label>
      <select
        key={props.id}
        value={selectedOption}
        className={`form-select lh-lg py-1 cursor-pointer ${multiselect} ${customSize}  ${props.classes}`}
        disabled={Disabled}
        multiple={props.isMultiple}
        aria-label="select example"
        data-testId={props.dataTestId}
        onChange={handleChange}
      >
        {}
        <option hidden className="text-muted">
          {props.label}
        </option>{" "}
        {props.selectItems && props.selectItems.map((selectItem, i) => (
          <option
            value={selectItem.value}
            key={`${selectItem.option}+${i}+${props.id}`}
          >
            {props.children}
            {selectItem.option}
          </option>
        ))}
      </select>{" "}
    </Fragment>
  );
};
export default RdsSelectList;
