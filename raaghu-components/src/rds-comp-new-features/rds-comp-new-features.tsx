import React, { FC, useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsCounter,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsSelectList,
} from "../../../raaghu-elements/src";

export interface RdsCompFeatureProps {
  featuresData: any[];
  onFeatureSelection: (event: any) => any;
}

const RdsCompFeatures = (props: RdsCompFeatureProps) => {

  const [navtabsItems, setNavtabsItems] = useState<any[]>(props.featuresData);
  const [navtabs, setNavtabs] = useState(props.featuresData.map((x: any, i: number) => ({ ...x, id: i, label: x.displayName, tablink: '#' + `${x.name}` })));
  const [activeNavTabId, setActiveNavTabId] = useState(0);

  useEffect(() => {
    const navtabData: any[] = [];
    props.featuresData.forEach((ele, i) => {
      const item = {
        id: i,
        label: ele.displayName,
        tablink: '#' + `${ele.name}`,
        name: ele.name,
        features: ele.features.map((x: any) => (
          (x.valueType.validator.name === 'BOOLEAN') ? { ...x, value: x.value.toLowerCase() === 'false' ? false : x.value.toLowerCase() === 'true' ? true : x.value } :
            (x.valueType.validator.name === 'NUMERIC' && typeof x.value === 'string') ? { ...x, value: parseInt(x.value) } : { ...x }
        ))
      }
      navtabData.push(item);
    });
    localStorage.setItem('initailFeatureData', JSON.stringify(navtabData));
    setNavtabsItems(navtabData);
  }, []);

  function onChangeFn(event: any, feature: any) {
    const data = navtabsItems.map((x: any) => ({
      ...x, features: x.features.map((f: any) => {
        return feature.name === f.name ? { ...f, value: event } : { ...f };
      })
    }));
    const initailData: any[] = JSON.parse(localStorage.getItem('initailFeatureData') as string);
    const changedData: any[] = [];
    for (let mainIndex = 0; mainIndex < initailData.length; mainIndex++) {
      for (let featureIndex = 0; featureIndex < initailData[mainIndex].features.length; featureIndex++) {
        const initialValue = initailData[mainIndex].features[featureIndex];
        const changedValue = data[mainIndex].features[featureIndex];
        (initialValue.value !== changedValue.value && initialValue.name === changedValue.name) && changedData.push({ name: changedValue.name, value: changedValue.value.toString() });
      }
    }
    setNavtabsItems(data);
    props.onFeatureSelection(changedData);
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <RdsNavtabs navtabsItems={navtabs} type="vertical" fill={false} justified={false} activeNavTabId={activeNavTabId}
          activeNavtabOrder={(activeNavTabId) => { setActiveNavTabId(activeNavTabId); }} />
      </div>
      <div className="col-md-6">
        {navtabsItems.map((tabsData: any, mainIndex: number) => (
          <>
            {activeNavTabId == mainIndex.toString() && (
              <>
                <RdsLabel label={tabsData.label} size="16px" class="mb-2" />
                {tabsData.features.map((feature: any) => (
                  <>
                    {
                      feature.valueType.validator.name === 'NULL' ? (
                        <div className="form-group mb-2">
                          <RdsSelectList label={feature.displayName} selectItems={feature.valueType?.itemSource?.items?.map((x: any) => ({ ...x, option: x.value }))}
                            onSelectListChange={(e: any) => onChangeFn(e, feature)}></RdsSelectList>
                          <div className="fs-7 text-muted">{feature.description}</div>
                        </div>
                      ) :
                        feature.valueType.validator.name === 'NUMERIC' ? (
                          <div className="form-group mb-2">
                            <RdsInput inputType={'number'} label={feature.displayName} name={feature.name} value={feature.value}
                              onChange={(e: any) => onChangeFn(e.target.value, feature)}></RdsInput>
                            <div className="fs-7 text-muted">{feature.description}</div>
                          </div>
                        ) :
                          feature.valueType.validator.name === 'BOOLEAN' ? (
                            <div className="form-group mb-2">
                              <RdsCheckbox label={feature.displayName} checked={feature.value}
                                name={feature.name} onChange={(e: any) => onChangeFn(e.target.checked, feature)}></RdsCheckbox>
                              <div className="fs-7 text-muted">{feature.description}</div>
                            </div>
                          ) : null
                    }
                  </>
                ))}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  )
};

export default RdsCompFeatures;
