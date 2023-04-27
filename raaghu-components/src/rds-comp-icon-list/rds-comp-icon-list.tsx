import { id } from "date-fns/locale";
import React, { useState } from "react";
import { Icons } from "./Icons";
import { RdsAlert, RdsIcon, RdsSearch } from "raaghu-react-elements";

export interface RdsCompIconListProps {}

const RdsCompIconList = (props: RdsCompIconListProps) => {
  const IconKeys: string[] = Object.keys(Icons);
  const [renderIconList, setRenderIconList] = useState(IconKeys);
  const [value, setValue] = useState("");

  const copyToClipboard = (text: string) => {
    const template = `<RdsIcon name="${text}" height="20px" width="20px" fill={false} stroke={true} />`;
    navigator.clipboard.writeText(template).then(
      () => {},
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const [identity, setIdentity] = useState<number>();

  const copyHandler = (iconName: string, id: number) => {
    copyToClipboard(iconName);
    setIdentity(id);
    setTimeout(() => {
      setIdentity(-1);
    }, 1500);
  };

  const onIconSearchHandler = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);
    setRenderIconList(
      newValue.length
        ? IconKeys.filter((item) =>
            item.toLowerCase().includes(newValue.toLowerCase())
          )
        : IconKeys
    );
  };

  return (
    <>
    <div className="container-fluid p-0 m-0">
      <div className="row">
        <div>
          <RdsSearch
            placeholder="Search Icon"
            size={""}
            value={value}
            onChange={onIconSearchHandler}
            iconside="left"
          ></RdsSearch>
        </div>
        {renderIconList.map((iconName, id) => (
          <div
            key={`div-${id}`}
            className="col-sm-1 m-3 card d-flex align-items-center justify-center bg-transparent border-0"
            onClick={() => copyHandler(iconName, id)}
          >
            <div className="card-body border rounded-2 text-center icon-box w-100 d-flex justify-content-center align-items-center position-relative">
              <div>
                <RdsIcon
                  key={id}
                  name={iconName}
                  height="35px"
                  width="35px"
                  fill={false}
                  stroke={true} isAnimate = {true}
                ></RdsIcon>
              </div>
             
            </div>
            <a className="fs-7 pe-auto pt-1 pb-2 text-center">
              {id == identity ? (
                <span className="text-success iconcopy border"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21.388 21.196">
                <g id="check" transform="translate(-49.308 -481.304)">
                  <path id="Path_256" data-name="Path 256" d="M50,494.844l4.2,6.44a1.47,1.47,0,0,0,1.2.716,1.45,1.45,0,0,0,1.2-.661L70,482" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                </g>
              </svg>
              </span>
              ) : (
                <span className="iconcopy cursor-pointer border"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21 21">
                <g id="Copy" transform="translate(-0.25 -0.25)">
                  <path id="Path_172607" data-name="Path 172607" d="M16.75,4.5V1.75a1,1,0,0,0-1-1h-14a1,1,0,0,0-1,1v14a1,1,0,0,0,1,1H4.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                  <path id="Path_172608" data-name="Path 172608" d="M7.25,8.25a1,1,0,0,1,1-1h14a1,1,0,0,1,1,1v14a1,1,0,0,1-1,1h-14a1,1,0,0,1-1-1Z" transform="translate(-2.5 -2.5)" fill="none" stroke="#000" stroke-linejoin="round" stroke-width="1"/>
                </g>
              </svg>
              </span>
              )}
              {  <span className="text fs-8 text-wrap">{iconName}</span>}
            </a>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default RdsCompIconList;
