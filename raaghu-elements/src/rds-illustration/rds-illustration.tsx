import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import "./rds-illustration.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsIllustrationProps {
  label?: string;
  subLabel?: string;
  colorVariant?: colors;
}

const RdsIllustration = (props: RdsIllustrationProps) => {
  return (
    <Fragment>
      <div className="align-items-center d-flex vh-100 justify-content-center">
        <div className="text-center" data-testid="icon" >
          <RdsIcon
            name="file_plus"
            width="120px"
            height="120px"
            fill={false}
            stroke={true}
            colorVariant="light"
          ></RdsIcon>
          <h5 data-testid="labelElement" >
            <label className="mt-4" >{props.label}</label>
          </h5>
          <div data-testid="sublabelElement" className="mt-2 text-muted">{props.subLabel}</div>
        </div>

      </div>
    </Fragment>
  );
};
export default RdsIllustration;
