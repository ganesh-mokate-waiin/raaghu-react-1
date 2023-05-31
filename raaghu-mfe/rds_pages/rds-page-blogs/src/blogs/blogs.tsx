import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RdsCompDatatable, RdsCompAlertPopup } from "../../../rds-components";
import {
  RdsInput,
  RdsButton,
  RdsOffcanvas,
  RdsCheckbox,
  RdsAlert,
} from "../../../rds-elements";
import {
  addBlogsData,
  editBlogsData,
  fetchBlogsData,
  deleteBlogsData,
  fetchFeaturesBlogs,
  putBlogsFeatures,
} from "../../../../libs/state-management/Blogs/blogs-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";

interface RdsPageResourcesProps {}

const Blogs = (props: RdsPageResourcesProps) => {
  const { t } = useTranslation();
  const [blogsData, setBlogsData] = useState<any>([]);
  const [value, setValue] = useState({
    name: "",
    slug: "",
  });
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [tableDataRowid, setTableDataRowId] = useState('');
  const [blogsFeature, setBlogsFeature] = useState<any>([]);

  const tableHeaders = [
    {
      displayName: t("Name"),
      key: "name",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Slug"),
      key: "slug",
      datatype: "text",
      sortable: true,
    },
  ];

  const actions = [
    { id: "edit", displayName: "Edit", offId: "blogs-edit-off" },
    { id: "features", displayName: "Features", offId: "blogs-features" },
    { id: "delete", displayName: "Delete", modalId: "blogs-delete-off" },
  ];

  const Data = useAppSelector((state) => state.persistedReducer.blogs) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Array.isArray(Data.blogs)) {
      setBlogsData(Data.blogs);
    }
  }, [Data.blogs]);
  useEffect(() => {
    if (Array.isArray(Data.blogsFeature)) {
      const tempFeature = Data.blogsFeature.map((curr: any) => {
        const featurename = curr.featureName.split(".")[1];
        return {
          featureName:
            featurename == "BlogPost"
              ? "Quick Navigation Bar In Blog Posts"
              : featurename,
          isEnabled: curr.isEnabled,
          id: curr.id,
        };
      });
      setBlogsFeature(tempFeature);
    }
  }, [Data.blogsFeature]);

  useEffect(() => {
    dispatch(fetchBlogsData() as any);
  }, [dispatch]);

  const handlerActionSelection = (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);
    if (actionId === "edit") {
      setValue({ ...value, name: rowData.name, slug: rowData.slug });
    }
    if (actionId === "features") {
      dispatch(fetchFeaturesBlogs(rowData.id) as any);
    }
  };

  const addDataHandler = () => {
    const dto = {
      name: value.name,
      slug: value.slug,
    };
    dispatch(addBlogsData(dto) as any).then((res: any) => {
      if (res.type == "blogs/addBlogsData/rejected") {
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
          message: "Blog added Successfully",
          color: "success",
        });
      }
      dispatch(fetchBlogsData() as any);
    });
    setValue({ name: "", slug: "" });
  };

  const editDataHandler = () => {
    const dto = {
      name: value.name,
      slug: value.slug,
    };
    dispatch(editBlogsData({ id: tableDataRowid, dto: dto }) as any).then(
      (res: any) => {
        if (res.type == "blogs/editBlogsData/rejected") {
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
            message: "Blog updated Successfully",
            color: "success",
          });
        }
        dispatch(fetchBlogsData() as any);
      }
    );
    setValue({ name: "", slug: "" });
  };

  const deleteHandler = () => {
    dispatch(deleteBlogsData(tableDataRowid) as any).then((res: any) => {
      if (res.type == "blogs/deleteBlogsData/rejected") {
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
          message: "Blogs deleted Successfully",
          color: "success",
        });
      }
      dispatch(fetchBlogsData() as any);
    });
  };

  const handleEnabled = (checked: any, blog: any) => {
    const temp = blogsFeature.map((curr: any) => {
      if (curr.featureName == blog.featureName) {
        return {
          ...curr,
          isEnabled: checked,
        };
      } else {
        return curr;
      }
    });
    setBlogsFeature(temp);
  };

  const saveFeatureHandler = () => {
    blogsFeature.forEach((curr: any, index: number) => {
      if (curr.isEnabled != Data.blogsFeature[index].isEnabled) {
        const dto: any = {
          featureName: Data.blogsFeature[index].featureName,
          isEnabled: curr.isEnabled,
        };
        dispatch(putBlogsFeatures({ id: tableDataRowid, dto: dto }) as any);
      }
    });
  };
  useEffect(() => {
    // Set a 2-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 2000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [Data.blogs]);
  return (
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
            <div className="col-md-8 d-flex justify-content-end my-1">
              <RdsOffcanvas
                canvasTitle={"New Blog"}
                placement="end"
                offcanvasbutton={
                  <div>
                    <RdsButton
                      icon="plus"
                      label={"New Blog" || ""}
                      iconColorVariant="light"
                      iconHeight="12px"
                      iconWidth="12px"
                      iconFill={false}
                      iconStroke={true}
                      block={false}
                      size="small"
                      type="button"
                      showLoadingSpinner={true}
                      colorVariant="primary"
                    ></RdsButton>
                  </div>
                }
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"blog-add-off"}
              >
                <div>
                  <div className="pt-3">
                    <RdsInput
                      size="medium"
                      inputType="text"
                      placeholder="Add Name"
                      label="Name"
                      labelPositon="top"
                      id=""
                      value={value.name}
                      required={true}
                      onChange={(e: any) => {
                        setValue({ ...value, name: e.target.value });
                      }}
                    ></RdsInput>
                    <RdsInput
                      size="medium"
                      inputType="text"
                      placeholder="Add Slug"
                      label="Slug"
                      labelPositon="top"
                      id=""
                      value={value.slug}
                      required={true}
                      onChange={(e: any) => {
                        setValue({ ...value, slug: e.target.value });
                      }}
                    ></RdsInput>
                    <div className="d-flex footer-buttons mb-3">
                      <RdsButton
                        label="CANCEL"
                        databsdismiss="offcanvas"
                        type={"button"}
                        size="small"
                        isOutline={true}
                        colorVariant="primary"
                        class="me-2"
                      ></RdsButton>
                      <RdsButton
                        label="SAVE"
                        type={"button"}
                        size="small"
                        databsdismiss="offcanvas"
                        isDisabled={!value.name}
                        colorVariant="primary"
                        class="me-2"
                        showLoadingSpinner={true}
                        onClick={addDataHandler}
                      ></RdsButton>
                    </div>
                  </div>
                </div>
              </RdsOffcanvas>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
            <RdsCompDatatable
              actionPosition="right"
              tableHeaders={tableHeaders}
              actions={actions}
              tableData={blogsData}
              pagination={true}
              recordsPerPage={10}
              recordsPerPageSelectListOption={true}
              onActionSelection={handlerActionSelection}
              noDataTitle={"There is no blogs available, Click on New Blogs to add."}
              noDataheaderTitle={"No Blogs Available."}
            ></RdsCompDatatable>
            <RdsOffcanvas
              backDrop={true}
              preventEscapeKey={true}
              scrolling={false}
              offId="blogs-edit-off"
              placement="end"
              canvasTitle="Edit Blog"
              children={
                <>
                  <RdsInput
                    size="medium"
                    inputType="text"
                    placeholder="Add Name"
                    label="Name"
                    labelPositon="top"
                    id=""
                    value={value.name}
                    required={true}
                    onChange={(e: any) => {
                      setValue({ ...value, name: e.target.value });
                    }}
                  ></RdsInput>
                  <RdsInput
                    size="medium"
                    inputType="text"
                    placeholder="Add Slug"
                    label="Slug"
                    labelPositon="top"
                    id=""
                    value={value.slug}
                    required={true}
                    onChange={(e: any) => {
                      setValue({ ...value, slug: e.target.value });
                    }}
                  ></RdsInput>

                  <div className="d-flex footer-buttons mb-3">
                    <RdsButton
                      label="CANCEL"
                      databsdismiss="offcanvas"
                      type={"button"}
                      size="small"
                      isOutline={true}
                      colorVariant="primary"
                      class="me-2"
                    ></RdsButton>
                    <RdsButton
                      label="SAVE"
                      type={"button"}
                      size="small"
                      databsdismiss="offcanvas"
                      isDisabled={!value.name}
                      colorVariant="primary"
                      class="me-2"
                      showLoadingSpinner={true}
                      onClick={editDataHandler}
                    ></RdsButton>
                  </div>
                </>
              }
            ></RdsOffcanvas>

            <RdsOffcanvas
              backDrop={true}
              preventEscapeKey={true}
              scrolling={false}
              offId="blogs-features"
              placement="end"
              canvasTitle="Features"
              children={
                <>
                  {blogsFeature.map((curr: any) => {
                    return (
                      <div className=" mb-4" key={curr?.id}>
                        <RdsCheckbox
                          id="0"
                          label={curr.featureName}
                          checked={curr.isEnabled}
                          onChange={(e: any) => {
                            handleEnabled(e.target.checked, curr);
                          }}
                        ></RdsCheckbox>{" "}
                      </div>
                    );
                  })}
                  <div className="d-flex footer-buttons mb-3">
                    <RdsButton
                      label="CANCEL"
                      databsdismiss="offcanvas"
                      type={"button"}
                      size="small"
                      isOutline={true}
                      colorVariant="primary"
                      class="me-2"
                    ></RdsButton>
                    <RdsButton
                      label="SAVE"
                      type={"button"}
                      size="small"
                      databsdismiss="offcanvas"
                      colorVariant="primary"
                      class="me-2"
                      onClick={saveFeatureHandler}
                    ></RdsButton>
                  </div>
                </>
              }
            ></RdsOffcanvas>

            <RdsCompAlertPopup
              alertID="blogs-delete-off"
              messageAlert="The selected Resource will be Deleted Permanently "
              alertConfirmation="Are you sure"
              deleteButtonLabel="Yes"
              onSuccess={deleteHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
