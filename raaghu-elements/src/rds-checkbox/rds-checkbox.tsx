import React, { useState, useRef, Fragment, useEffect } from "react";
import "./rds-checkbox.css";

export interface RdsCheckboxProps {
  label: string;
  labelClass?: string;
  checked: any;
  isDisabled?: boolean;
  classes?: string;
  isSwitch?: boolean;
  withlabel?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  state?: "Checkbox" | "Indeterminate" | "ErrorCheckbox";
  errorMessage?: string;
  id?: string;
  dataTestId?: string
}

const RdsCheckbox = (props: RdsCheckboxProps) => {

  const [check, setcheck] = useState(props.checked);
  const [labelChecked, setLabelChecked] = useState(props.checked);

  useEffect(() => {
    setcheck(props.checked);
    setLabelChecked(props.checked);

  }, [props.checked])


  const SWITCH = `${props.isSwitch !== true ? " form-check d-flex" : " form-switch "
    }`;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheck = event.target.checked;
    setcheck(newCheck);
    setLabelChecked(newCheck);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleLabelClick = () => {
    const newCheck = !check;
    setcheck(newCheck);
    setLabelChecked(newCheck);
  };

  return (
    <Fragment>
      <div>
        <div className={`${SWITCH} ${props.classes}`}>
          <input
            type="checkbox"
            className={
              props.state == "Indeterminate"
                ? "form-check-input form-check-input-intermediate"
                : props.state == "ErrorCheckbox"
                  ? " form-check-input form-check-input-error"
                  : "form-check-input"
            }
            value=" "
            disabled={props.isDisabled}
            checked={check}
            id={props.id}
            name={props.id}
            onChange={handleCheckboxChange}
            data-testid={props.dataTestId}
          />

          {props.withlabel == false ? (
            <></>
          ) : (
            <label
              className={` form-check-label me-5 ms-2  ${props.labelClass} `}
              htmlFor={props.id}
              onClick={handleLabelClick}
            >
              {props.label}
            </label>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default RdsCheckbox;
