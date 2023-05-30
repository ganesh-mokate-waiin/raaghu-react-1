import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../libs/state-management/hooks";
import { RdsButton, RdsNavtabs } from "../../../rds-elements";
import { RdsCompSyntaxHighlighter } from "../../../rds-components";
import { getGlobalResources, saveGlobalResources } from "../../../../libs/state-management/global-resources/globalResources-slice";

const GlobalResources = () => {
  // variables
  const navtabsItems = [
    { label: "Script", tablink: "#script", id: 0 },
    { label: "Style", tablink: "#style", id: 1 },
  ];

  // use state
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [showTenantSettings, setShowTenantSettings] = useState(false);
  const [scriptStyleValue, setScriptStyleValue] = useState({ script: '', style: '' });

  // dispatch and selector
  const dispatch = useAppDispatch();
  const globalResources = useAppSelector((state) => state.persistedReducer.globalResources);

  useEffect(() => {
    dispatch(getGlobalResources());
  }, [dispatch])

  useEffect(() => {
    if (globalResources.globalResources) setScriptStyleValue({ script: globalResources.globalResources.scriptContent, style: globalResources.globalResources.styleContent });
  }, [globalResources.globalResources])

  // functions
  function onSaveFn(event: any) {
    event.preventDefault();
    dispatch(saveGlobalResources({ body: scriptStyleValue }));
  }

  // DOM
  return (
    <>
      <div className="row">
      <div className="col-md-12">
          <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
          <RdsNavtabs navtabsItems={navtabsItems} type="tabs" isNextPressed={showTenantSettings} activeNavTabId={activeNavTabId}
            activeNavtabOrder={(activeNavTabId) => {
              setActiveNavTabId(activeNavTabId),
                setShowTenantSettings(false);
            }}
          />
          <div className="p-3 vh-75">
            <form>
              {activeNavTabId === "0" && (
                <RdsCompSyntaxHighlighter value={scriptStyleValue.script} padding={10} style={{
        
                 
                }} onValueChange={(value: any) => setScriptStyleValue({ ...scriptStyleValue, script: value })}></RdsCompSyntaxHighlighter>
              )}
              {activeNavTabId === "1" && (
                <RdsCompSyntaxHighlighter value={scriptStyleValue.style} padding={10} style={{
               
                }}
                  onValueChange={(value: any) => setScriptStyleValue({ ...scriptStyleValue, style: value })}></RdsCompSyntaxHighlighter>
              )}
              <div className="d-flex footer-buttons mb-3 justify-content-end pt-3">
                <RdsButton type={"submit"} colorVariant="primary" label={'Save Changes'}
                  onClick={onSaveFn} ></RdsButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default GlobalResources;
