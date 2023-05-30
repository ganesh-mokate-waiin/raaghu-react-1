import React, { useState, useEffect } from "react";
import {
  RdsAlert,
  RdsButton,
  RdsOffcanvas,
  RdsInput,
  RdsNavtabs,
} from "../../../rds-elements";
import {
  RdsCompOrganizationTree,
  RdsCompDatatable,
  RdsCompAlertPopup,
} from "../../../rds-components";
import { createTree } from "../../../../libs/shared/array-to-tree-converter";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  fetchOrganizationTrees,
  deleteOrganizationUnit,
  editOrganizationUnit,
  addOrganizationUnit,
  fetchMemberOrganizationTrees,
  deleteMemberOrganizationUnit,
  editMemberOrganizationUnit,
  FetchUsersOrganizationUnit,
  FetchRoleListOrganizationUnit,
  fetchRolesOrganizationTrees,
  deleteRolesOrganizationUnit,
  editRolesOrganizationUnit,
} from "../../../../libs/state-management/organization-tree/organization-tree-slice";
import { useTranslation } from "react-i18next";

export interface OrganizationTreeProps {
  onActionSelection?(arg: any): void;
}
const OrganizationTree = (props: OrganizationTreeProps) => {
  const dispatch = useAppDispatch();
  const offCanvasHandler = () => {};
  const [activeTab, setActiveTab] = useState("member");
  const [treeData, setTreeData] = useState<any>([]);
  const [user, setUser] = useState<any>({
    members: [],
    roles: [],
    usersList: [],
    usersListSelected: [],
    rolesList: [],
    rolesListSelected: [],
  });
  const [oData, setOData] = useState([]);
  const { t } = useTranslation();

  const [id, setId] = useState({
    id: null,
    memberId: null,
    roleId: null,
  });
  const [val, setVal] = useState("");
  const [selectedNode, setSelectedNode] = useState("");
  const data = useAppSelector((state) => state.persistedReducer.organization);

  useEffect(() => {
    dispatch(fetchOrganizationTrees() as any);
  }, [dispatch]);
  useEffect(() => {
    setTreeData(data.organizationUnitTree);
  }, [data.organizationUnitTree]);
  useEffect(() => {
    setUser({ ...user, members: data.members });
  }, [data.members]);
  useEffect(() => {
    const tempUserList = data.usersList?.map((curElem: any) => {
      return {
        id: curElem.id,
        userName: curElem.userName,
        email: curElem.email,
        selected: false,
        disabled: false,
      };
    });

    setUser({ ...user, usersList: tempUserList });
  }, [data.usersList]);
  useEffect(() => {
    const tempRolesList = data.rolesList?.map((curElem: any) => {
      return {
        id: curElem.id,
        name: curElem.name,
        disabled: false,
      };
    });
    setUser({ ...user, rolesList: tempRolesList });
  }, [data.rolesList]);
  useEffect(() => {
    setUser({ ...user, roles: data.roles });
  }, [data.roles]);
  let actions: any = [
    { id: "delete", displayName: "Delete", modalId: "orgMemRole" },
  ];
  let nodeColor = ["#6E4D9F", "#0D79AE", "#14A94B", "#FBA919"];

  const navtabsItems: any = [
    {
      label: "Members",
      tablink: "#Members",
      ariacontrols: "Members",
      id: "member",
    },
    {
      label: "Roles",
      tablink: "#Roles",
      ariacontrols: "Roles",
      id: "role",
    },
  ];
  const handlerDeleteNode = (id: any) => {
    setId({ ...id, id: id });
  };
  const handlerAddNestedNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: id.id,
      }) as any
    ).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
  };
  const handlerCreateSubUnit = (data: any) => {
    setId({ ...id, id: data.id });
    setVal("");
  };
  const handlerAddSubUnitNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: id.id,
      }) as any
    ).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
  };
  const handlerNodeEdit = (data: any) => {
    setVal(data.displayName);
    setId({ ...id, id: data.id });
  };
  const handlerEdit = () => {
    const dto = { displayName: val };
    dispatch(editOrganizationUnit({ id: id.id, dTo: dto }) as any).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
  };
  const handlerAddRootNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: null,
      }) as any
    ).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
  };
  const handlerSelectNode = (item: any) => {
    setId({ ...id, id: item?.data?.id });
    setSelectedNode(item?.data?.displayName);
    dispatch(fetchMemberOrganizationTrees(item?.data?.id) as any);
    dispatch(fetchRolesOrganizationTrees(item?.data?.id) as any);
  };
  const handlerUserPush = () => {
    dispatch(
      editMemberOrganizationUnit({
        id: id.id,
        dTo: { userIds: user.usersListSelected },
      }) as any
    ).then(() => {
      dispatch(fetchMemberOrganizationTrees(id.id) as any);
    });
  };
  const handlerRolePush = () => {
    dispatch(
      editRolesOrganizationUnit({
        id: id.id,
        dTo: { roleIds: user.rolesListSelected },
      }) as any
    ).then(() => {
      dispatch(fetchRolesOrganizationTrees(id.id) as any);
    });
  };
  const activeNavtabOrder = (id: any) => {
    setActiveTab(id);
  };
  const handlerMemberActions = (rowData: any, actionId: any) => {
    setId({ ...id, memberId: rowData.id });
  };
  const handlerDeleteConfirmUserRoles = () => {
    if (activeTab === "member") {
      dispatch(
        deleteMemberOrganizationUnit({
          id: id.id,
          memberId: id?.memberId,
        }) as any
      ).then(() => {
        dispatch(fetchMemberOrganizationTrees(id.id) as any);
      });
    } else {
      dispatch(
        deleteRolesOrganizationUnit({ id: id.id, roleId: id?.roleId }) as any
      ).then(() => {
        dispatch(fetchRolesOrganizationTrees(id.id) as any);
      });
    }
  };
  const handlerRoleActions = (rowData: any, actionId: any) => {
    setId({ ...id, roleId: rowData.id });
  };

  const handlerDeleteConfirm = () => {
    dispatch(deleteOrganizationUnit(id.id) as any).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
  };
  const updateOrganizationTree = () => {
    if (treeData) {
      let data = createTree(
        treeData?.items,
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
      setOData(data);
    } else {
    }
  };
  
  const handlerUserSelect = (data: any) => {
    const User = data?.reduce((acc: any, curElem: any) => {
      if (curElem.selected) {
        acc.push(curElem.id);
      }
      return acc;
    }, []);
    setUser({ ...user, usersListSelected: User });
  };
  const handlerRoleSelect = (data: any) => {
    const User = data?.reduce((acc: any, curElem: any) => {
      if (curElem.selected) {
        acc.push(curElem.id);
      }
      return acc;
    }, []);
    setUser({ ...user, rolesListSelected: User });
  };
  useEffect(() => {
    updateOrganizationTree();
  }, [treeData]);

  const tableHeadersMembers = [
    {
      displayName: "UserName",
      key: "userName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "Email",
      key: "email",
      datatype: "text",
      sortable: true,
    },
  ];
  let tableHeadersRoles = [
    {
      displayName: "Role Name",
      key: "name",
      datatype: "text",
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="container-fluid p-0 m-0 h-100">
        <div className="row h-100">
          <div className="col-md-6 h-100 mb-4">
            <div>
              <div className="card card-full-stretch rounded-0 border-0 h-100">
                <div className="card-header bg-transparent">
                  <h5 className="card-title">Organization Tree</h5>
                </div>
                <div className="card-body overflow-auto">
                  <RdsCompOrganizationTree
                    organizationTreeData={oData}
                    onDeleteNode={handlerDeleteNode}
                    onCreateNode={(data) => {
                      setVal("");
                      setId({ ...id, id: data.id });
                    }}
                    onCreateSubUnit={handlerCreateSubUnit}
                    onSelectNode={handlerSelectNode}
                    onNodeEdit={handlerNodeEdit}
                    nodeColor={nodeColor}
                    mutable={true}
                    offId="oganization"
                  ></RdsCompOrganizationTree>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 h-100 mb-4">
            <div className="card rounded-0  h-100 border-0">
              {selectedNode === "" && (
                <div className="card-header bg-transparent">
                  <h5 className="card-title">
                    Select an organization unit to see members
                  </h5>
                </div>
              )}
              {selectedNode !== "" && (
                <div>
                  <div className="card-header d-flex justify-content-between bg-transparent align-items-center">
                    <h5 className="card-title text-primary">{selectedNode}</h5>
                    {activeTab === "member" && (
                      <RdsButton
                        label="New Member"
                        size="small"
                        id=""
                        icon="plus"
                        iconHeight="12px"
                        iconWidth="12px"
                        iconFill={false}
                        colorVariant="primary"
                        type="button"
                        showLoadingSpinner={true}
                        onClick={() => {
                          dispatch(FetchUsersOrganizationUnit() as any);
                        }}
                        data-bs-dismiss="offcanvas"
                        databstoggle="offcanvas"
                        databstarget="#oMember-add-off"
                        ariacontrols="oMember-add-off"
                      ></RdsButton>
                    )}
                    {activeTab === "role" && (
                      <RdsButton
                        label="New Role"
                        size="small"
                        icon="plus"
                        iconHeight="12px"
                        iconWidth="12px"
                        iconFill={false}
                        colorVariant="primary"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        databstoggle="offcanvas"
                        databstarget="#oRole-add-off"
                        ariacontrols="oRole-add-off"
                        showLoadingSpinner={true}
                        onClick={() => {
                          dispatch(FetchRoleListOrganizationUnit() as any);
                        }}
                        //className="px-2"
                      ></RdsButton>
                    )}
                  </div>
                  <div className="card-body pt-2">
                    <div className="col-md-12 mb-2">
                      <RdsNavtabs
                        type="tabs"
                        activeNavtabOrder={activeNavtabOrder}
                        fill={false}
                        navtabsItems={navtabsItems}
                      />
                    </div>
                    <div
                      className="row tab-content"
                      id="nav-tabContent" // naveContent
                    >
                      {activeTab === "member" && (
                        <div className="row">
                          <RdsCompDatatable
                            actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeadersMembers}
                            tableData={user.members}
                            pagination={user.members?.length > 5 ? true : false}
                            recordsPerPage={10}
                            noDataTitle="Currently you do not have member"
                            actions={actions}
                            onActionSelection={handlerMemberActions}
                            recordsPerPageSelectListOption={true}
                          ></RdsCompDatatable>
                        </div>
                      )}
                      {activeTab === "role" && (
                        <div className="row">
                          <RdsCompDatatable
                           actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeadersRoles}
                            tableData={user.roles}
                            pagination={user.roles?.length > 5 ? true : false}
                            recordsPerPage={10}
                            noDataTitle="Currently you do not have role"
                            actions={actions}
                            onActionSelection={handlerRoleActions}
                            recordsPerPageSelectListOption={true}
                          ></RdsCompDatatable>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RdsOffcanvas
        placement="end"
        canvasTitle="Select Member"
         onclick={offCanvasHandler}
        offId="oMember-add-off"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <div className="row form-style">
          <form>
            <div className="tab-content">
              <div className="form-group mb-3">
                <div className="col-md-12  mt-2">
                  <RdsCompDatatable
                   actionPosition="right"
                    classes="table__userTable"
                    tableHeaders={tableHeadersMembers}
                    tableData={user.usersList}
                    pagination={user.usersList?.length > 5 ? true : false}
                    recordsPerPage={10}
                    enablecheckboxselection={true}
                    onRowSelect={handlerUserSelect}
                    noDataTitle="Currently you do not have users"
                    recordsPerPageSelectListOption={true}
                  ></RdsCompDatatable>
                </div>
              </div>
            </div>
            <div className="footer-buttons my-2">
              <div className="row">
                <div className="col-md-12 d-flex flex-row">
                  <div>
                    <RdsButton
                      type={"button"}
                      label="cancel"
                      size="small"
                      isOutline={true}
                      colorVariant="primary"
                      databsdismiss="offcanvas"
                      // databstoggle="offcanvas"
                      // databstarget="#oMember-add-off"
                    ></RdsButton>
                  </div>
                  <div className="px-2">
                    <RdsButton
                      type={"button"}
                      size="small"
                      label="Save"
                      isDisabled={
                        !user.usersListSelected ||
                        user.usersListSelected?.length == 0
                      }
                      colorVariant="primary"
                      onClick={handlerUserPush}
                      databsdismiss="offcanvas"
                      // databstoggle="offcanvas"
                      // databstarget="#addMemberOff"
                      showLoadingSpinner={true}
                    ></RdsButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle="Select Roles"
        onclick={offCanvasHandler}
        offId="oRole-add-off"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <div className="container-fluid">
        <div className="row form-style">
          <form>
            <div className="tab-content">
              <div className="form-group mb-3">
                <div className="col-md-12  mt-2">
                  <RdsCompDatatable
                   actionPosition="right"
                    classes="table__userTable"
                    tableHeaders={tableHeadersRoles}
                    tableData={user.rolesList}
                    pagination={user.rolesList?.length > 5 ? true : false}
                    recordsPerPage={10}
                    enablecheckboxselection={true}
                    onRowSelect={handlerRoleSelect}
                    noDataTitle="Currently you do not have role"
                    recordsPerPageSelectListOption={true}
                  ></RdsCompDatatable>
                </div>
              </div>
            </div>
            <div className="footer-buttons my-2">
              <div className="row">
                <div className="col-md-12 d-flex flex-row">
                  <div>
                    <RdsButton
                      type={"button"}
                      label="cancel"
                      size="small"
                      isOutline={true}
                      colorVariant="primary"
                      databsdismiss="offcanvas"
                      // databstoggle="offcanvas"
                      // databstarget="#oRole-add-off"
                    ></RdsButton>
                  </div>
                  <div className="px-2">
                    <RdsButton
                      type={"button"}
                      size="small"
                      label="Save"
                      isDisabled={
                        !user.rolesListSelected ||
                        user.rolesListSelected?.length == 0
                      }
                      colorVariant="primary"
                      onClick={handlerRolePush}
                      databsdismiss="offcanvas"
                      // databstoggle="offcanvas"
                      // databstarget="#addRoleOff"
                      showLoadingSpinner={true}
                    ></RdsButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div></div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle="New Organization Unit"
        offId="aoganization"
        backDrop={true}
        scrolling={false}
        onclick={offCanvasHandler}
        preventEscapeKey={false}
      >
        <RdsInput
          label="Name"
          labelPositon="top"
          required={true}
          size="medium"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        ></RdsInput>
        <div className="d-flex d-flex me-3 footer-buttons my-2 ">
         
            <RdsButton
              type={"button"}
              label="cancel"
              size="small"
              isOutline={true}
              colorVariant="primary"
              databsdismiss="offcanvas"
              // databstoggle="offcanvas"
              // databstarget="#aoganization"
            ></RdsButton>
         
          <RdsButton
            type={"button"}
            label="Save"
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            onClick={handlerAddNestedNode}
            databsdismiss="offcanvas"
            // databstoggle="offcanvas"
            // databstarget="#aoganization"
          ></RdsButton>
        </div>
      </RdsOffcanvas>

      <RdsOffcanvas
        placement="end"
        canvasTitle="Edit Organization Unit"
        onclick={offCanvasHandler}
        offId="boganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <RdsInput
          inputType="text"
          label="Name"
          labelPositon="top"
          required={true}
          value={val}
          size="medium"
          onChange={(e) => setVal(e.target.value)}
        ></RdsInput>
        <div className="d-flex me-3 footer-buttons my-2 " >
          
            <RdsButton
              type={"button"}
              label="cancel"
              size="small"
              isOutline={true}
              colorVariant="primary"
              databsdismiss="offcanvas"
              // databstoggle="offcanvas"
              // databstarget="#boganization"
            ></RdsButton>
          
          <RdsButton
            type={"button"}
            label="save"
            class="ms-2"
            size="small"
            colorVariant="primary"
            onClick={handlerEdit}
            databsdismiss="offcanvas"
            // databstoggle="offcanvas"
            // databstarget="#boganization"
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle="Add Organiztion Sub-Unit"
        offId="coganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        onclick={offCanvasHandler}
        
      >
        <RdsInput
        inputType="text"
          label="Add Organization name"
          labelPositon="top"
          required={true}
          size="medium"
          onChange={(e) => setVal(e.target.value)}
          value={val}
        ></RdsInput>
        <div className="d-flex me-3 footer-buttons my-2 " >
        
            <RdsButton
              type={"button"}
              label="cancel"
              size="small"
              colorVariant="primary"
              isOutline={true}
              databsdismiss="offcanvas"
              // databstoggle="offcanvas"
              // databstarget="#coganization"
             ></RdsButton>
          
          <RdsButton
            type={"button"}
            label="save"
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            databsdismiss="offcanvas"
            // databstoggle="offcanvas"
            // databstarget="#coganization"
            onClick={handlerAddSubUnitNode}
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle="Add Organiztion New Unit"
        onclick={offCanvasHandler}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="doganization"
      >
        <RdsInput
          label={"Add Organization name"}
          labelPositon="top"
          required={true}
          size="medium"
          onChange={(e) => setVal(e.target.value)}
          value={val}
        ></RdsInput>
        <div className="d-flex me-3 footer-buttons my-2  " >
          
            <RdsButton
              type={"button"}
              label="cancel"
              size="small"
              colorVariant="primary"
              isOutline={true}
              databsdismiss="offcanvas"
              // databstoggle="offcanvas"
              // databstarget="#doganization"
            ></RdsButton>
        
          <RdsButton
            type={"button"}
            label="save"
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            databsdismiss="offcanvas"
            // databstoggle="offcanvas"
            // databstarget="#doganization"
            onClick={handlerAddRootNode}
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsCompAlertPopup
        alertID={`deleteTreeNode`}
        onSuccess={handlerDeleteConfirm}
      ></RdsCompAlertPopup>
      <RdsCompAlertPopup
        alertID="orgMemRole"
        onSuccess={handlerDeleteConfirmUserRoles}
      ></RdsCompAlertPopup>
    </div>
  );
};
export default OrganizationTree;
