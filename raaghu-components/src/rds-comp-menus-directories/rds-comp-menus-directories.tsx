import React, { useState } from "react";
import { RdsIcon } from '../rds-elements';
export interface RdsCompMenuDirectoryProps {
  items?: any;
  offId: string;
  onCreateSubMenu: (data: any) => void;
  onDeleteMenu: (id: any) => void;
  onMenuEdit: (data: any) => void;
}

const RdsCompMenuDirectory = (props: RdsCompMenuDirectoryProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleClick = (id: string) => () => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const renderDirectoryItem = (item: any) => (
    <>
      <div key={item.data.id} className="d-flex align-items-center mb-3">
        {item?.children?.length != 0 && (
          <button
            className=" me-1 border-0 bg-white"
            onClick={handleClick(item.data.id)}
          >
            <RdsIcon
              name={expandedItems.includes(item.data.id) ? "chevron_up" : "chevron_down"}
              height="8px"
              width="12px"
              fill={false}
              stroke={true}
              colorVariant="primary"
              onClick={handleClick(item.data.id)}
            />
          </button>
        )}
        <span className="mx-1">
          <RdsIcon
            name="folder"
            height="17px"
            width="20px"
            fill={false}
            stroke={true}
            colorVariant="primary"
            onClick={handleClick(item.data.id)}
          />
        </span>
        <span className="mt-1 ms-2 node-label d-flex">
          <span>{item.data.displayName}</span>
          <span className="node-icon">
            <a
              className="pl-3 mx-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#a${props.offId}`}
              onClick={() => props.onCreateSubMenu(item.data)}
            >
              <RdsIcon
                name={"plus"}
                height="15px"
                width="15px"
                stroke={true}
              ></RdsIcon>
            </a>
            <a
              className="mx-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#b${props.offId}`}
              onClick={() => props.onMenuEdit(item.data)}
            >
              <RdsIcon
                name={"pencil"}
                width="15px"
                height="15px"
                stroke={true}
              ></RdsIcon>
            </a>

            <a
              className="mx-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#deleteMenu`}
              onClick={() => props.onDeleteMenu(item.data.id)}
            >
              <RdsIcon
                name={"delete"}
                height="16px"
                width="20px"
                stroke={true}
              ></RdsIcon>
            </a>
          </span>
        </span>
      </div>
      {item.children.length > 0 && expandedItems.includes(item.data.id) && (
        <ul className="pl-0">
          <RdsCompMenuDirectory
            items={item.children}
            offId={props.offId}
            onCreateSubMenu={props.onCreateSubMenu}
            onDeleteMenu={props.onDeleteMenu}
            onMenuEdit={props.onMenuEdit}
          />
        </ul>
      )}
    </>
  );

  const renderDirectoryItems = (items: any) => {
    return items.map(renderDirectoryItem);
  };

  return <ul>{renderDirectoryItems(props.items)}</ul>;
};

export default RdsCompMenuDirectory;
