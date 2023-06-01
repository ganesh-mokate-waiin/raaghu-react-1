import React, { useEffect, useState } from "react";
import { RdsAlert, RdsButton, RdsOffcanvas, RdsIllustration} from "../../../rds-elements";
import { RdsCompAlertPopup } from "../../../rds-components";
import RdsCompMenuDirectory from "../../../../../raaghu-components/src/rds-comp-menus-directories/rds-comp-menus-directories";
import { createTree } from "../../../../libs/shared/array-to-tree-converter";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  deleteMenuItem,
  postMenuItems,
  editMenuItem,
  getAllMenuItems,
} from "../../../../libs/state-management/public.api";
import RdsCompNewMenu from "../../../../../raaghu-components/src/rds-comp-new-menu/rds-comp-new-menu";

const Menus = () => {
  //useState of the component
  const [Data, setData] = useState<any>({
    url: "",
    displayName: "",
    isActive: true,
    icon: "",
    target: "",
    elementId: "",
    cssClass: "",
  });
  const [id, setId] = useState({
    id: null,
    parentId: null,
  });
  const [directories, setDirectories] = useState<any[]>([]);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  let dto: any = {
    parentId: null,
    displayName: "",
    isActive: "",
    url: "",
    icon: "",
    order: 0,
    target: "",
    elementId: "",
    cssClass: "",
    pageId: "",
  };
  const dispatch = useAppDispatch();
  // dispatcing action
  useEffect(() => {
    dispatch(getAllMenuItems() as any);
  }, [dispatch]);

  // taking data form redux store
  const menuData = useAppSelector(
    (state) => state.persistedReducer.menus.menus
  );
  // updating directories data based on  menus data
  useEffect(() => {
    const updateOrganizationTree = () => {
      let data = createTree(
        menuData,
        "parentId",
        "id",
        null,
        "children",
        [
          {
            target: "label",
            source: "displayName",
          },
          {
            target: "expandedIcon",
            value: "fa fa-folder-open text-warning",
          },
          {
            target: "collapsedIcon",
            value: "fa fa-folder text-warning",
          },
          {
            target: "expanded",
            value: true,
          },
        ],
        1
      );
      setDirectories(data);
    };
    updateOrganizationTree();
  }, [menuData]);

  // Set a 2-second timer to update the state
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 2000);
    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [menuData]);

  // add a menu
  const handlerSaveAddRootMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
  }) => {
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;
    dispatch(postMenuItems(dto) as any).then((res: any) => {
      if (res.type == "menu/postMenuItems/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Menu added Successfully",
          color: "success",
        });
      }
      dispatch(getAllMenuItems() as any);
    });
  };
  // add a sub-menu
  const handlerAddSubMenu = (data: any) => {
    setId({ ...id, parentId: data.id });
    setData({
      ...Data,
      url: "",
      displayName: "",
      isActive: true,
      icon: "",
      target: "",
      elementId: "",
      cssClass: "",
    });
  };

  const handlerSaveAddsubMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
  }) => {
    dto.parentId = id.parentId;
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;
    dispatch(postMenuItems(dto) as any).then((res: any) => {
      if (res.type == "menu/postMenuItems/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Sub-menu added Successfully",
          color: "success",
        });
      }
      dispatch(getAllMenuItems() as any);
    });
  };
  // edit a menu
  const handlerEditMenu = (data: any) => {
    setId({ ...id, id: data.id });
    setData({
      ...Data,
      url: data.url,
      displayName: data.displayName,
      isActive: data.isActive,
      icon: data.icon,
      target: data.target,
      elementId: data.elementId,
      cssClass: data.cssClass,
    });
  };
  const handlerSaveEditMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
  }) => {
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;

    dispatch(editMenuItem({ id: id.id, model: dto }) as any).then(
      (res: any) => {
        if (res.type == "menu/editMenuItem/rejected") {
          setAlert({
            ...Alert,
            show: true,
            message: "your request has been denied",
            color: "danger",
          });
        } else {
          setAlert({
            ...Alert,
            show: true,
            message: "Menu edited Successfully",
            color: "success",
          });
        }
        dispatch(getAllMenuItems() as any);
      }
    );
  };

  //delete a menu
  const handlerDeleteMenu = (id: any) => {
    setId({ ...id, id: id });
  };
  const handlerDelete = () => {
    dispatch(deleteMenuItem(id.id) as any).then((res: any) => {
      if (res.type == "menu/deleteMenuItem/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: "your request has been denied",
          color: "danger",
        });
      } else {
        setAlert({
          ...Alert,
          show: true,
          message: "Menu deleted Successfully",
          color: "success",
        });
      }
      dispatch(getAllMenuItems() as any);
    });
  };
  return (
    <>
    <div className="container-fluid p-0 m-0">
      <div className="row">
        <div className="col-md-12 mb-3 ">
          <div className="row ">
            <div className="col-md-4">
              {Alert.show && (
                <RdsAlert
                  alertmessage={Alert.message}
                  colorVariant={Alert.color}
                ></RdsAlert>
              )}
            </div>
            <div className="col-md-8 d-flex justify-content-end ">
              <RdsOffcanvas
                offcanvasbutton={
                  <div className="my-1">
                    <RdsButton
                      type={"button"}
                      label="Add Root Menu"
                      iconColorVariant="light"
                      size="small"
                      colorVariant="primary"
                      icon="plus"
                      iconFill={false}
                      iconStroke={true}
                      iconHeight="12px"
                      onClick={() => {}}
                      iconWidth="12px"
                      showLoadingSpinner={true}
                    ></RdsButton>
                  </div>
                }
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"menu-add-off"}
                canvasTitle={"New URL"}
              >
                <RdsCompNewMenu
                  menusData={Data}
                  onSubmit={handlerSaveAddRootMenu}
                />
              </RdsOffcanvas>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card p-3 h-100 border-0 rounded-0 card-full-stretch">
            {directories.length === 0 && 
            
            <div className="">
              <RdsIllustration
                label="There is no menu item yet!"
                colorVariant="light"
              />
             </div>
            }
            <RdsCompMenuDirectory
              items={directories}
              offId="menus"
              onCreateSubMenu={handlerAddSubMenu}
              onDeleteMenu={handlerDeleteMenu}
              onMenuEdit={handlerEditMenu}
            ></RdsCompMenuDirectory>
            <RdsOffcanvas
              placement={"end"}
              backDrop={true}
              scrolling={false}
              preventEscapeKey={false}
              offId={"amenus"}
              canvasTitle={"New URL"}
            >
              <RdsCompNewMenu
                menusData={Data}
                onSubmit={handlerSaveAddsubMenu}
              />
            </RdsOffcanvas>
            <RdsOffcanvas
              placement={"end"}
              backDrop={true}
              scrolling={false}
              preventEscapeKey={false}
              offId={"bmenus"}
              canvasTitle={"Edit URL"}
            >
              <RdsCompNewMenu menusData={Data} onSubmit={handlerSaveEditMenu} />
            </RdsOffcanvas>
            <RdsCompAlertPopup
              alertID="deleteMenu"
              onSuccess={handlerDelete}
            ></RdsCompAlertPopup>
          </div>
        </div>
      </div></div>
    </>
  );
};

export default Menus;
