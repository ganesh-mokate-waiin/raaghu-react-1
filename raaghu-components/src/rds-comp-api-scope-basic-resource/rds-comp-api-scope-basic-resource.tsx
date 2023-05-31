import { AnyAction } from "@reduxjs/toolkit";
import React, {useEffect, useState} from "react";
import {RdsCheckboxGroup, RdsInput, RdsTextArea,RdsButton } from '../rds-elements';

export interface RdsCompApiScopeBasicResourceProps {
	email:any;
	fullname:any;
	message:any;
	onSuccess?: any;
	
}

const RdsCompApiScopeBasicResource = (props:RdsCompApiScopeBasicResourceProps) => {
    const [email, setEmail] = useState(props.email);
    const [message, setMessage] = useState(props.message);
	const [fullname, setFullname] = useState(props.fullname);
	const [resource,setResource] =useState('');
	const [data,setdata] = useState({
		fullname:props.fullname,
		email:props.email,
		message:props.message,
		resource:[]})
useEffect(()=>{
console.log("newdata ", props.fullname)
setdata({
		fullname:props.fullname,
		email:props.email,
		message:props.message,
		resource:[]}) 
},[props.email,props.fullname,props.message])
    
	const isEmailValid = (email:any) => {
		if (!data.email || data.email.length === 0) {
			return false;	  
		}
		return true;
	}
	const emailhandleChange = (event:any) => {
        
       setdata({...data, email: event.target.value})
     
    }
	const fullnamehandleChange = (event: any) => {
     
		setdata({...data, fullname: event.target.value})
       
    }
    const messagehandleChange = (event: any) => {
       
    	setdata({...data, message: event.target.value})
    }
	const resourcehadleChange = (event: any) => {
       
    	setdata({...data, resource: event.target.value})
    }
	const isFormValid = isEmailValid(email) ;

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		setEmail('');
		setFullname('');
        setMessage('');
		setResource('');
    }
  return (
    <>
<div >
			
			<form onSubmit={handleSubmit}>
				<div className="row mt-3">
				<div className="col-6">				
					<RdsInput
					    required={true}
						label="Name"
						placeholder='Enter name'
						inputType='text'
						onChange={emailhandleChange}
						value = {data.email}
						name = {'email'}
                        dataTestId="name"
				></RdsInput>
				   
				</div>

				<div className="col-6 ">
					<RdsInput
						label='Display name'
						placeholder='Enter display name'
						inputType = 'text'
						onChange = {fullnamehandleChange}
                        required={false}
						name = {'Displayname'}
						value = {data.fullname}
						dataTestId="display-name"
					></RdsInput>
				
				</div>
				</div>
				
                <div className=" mb-4">
					<RdsTextArea
						label='Description'
						placeholder='Description'
					    onChange = {messagehandleChange}
						rows ={2}
						value = {data.message}
						dataTestId="desc"
					/>                                                      
				</div>
				<div className=" mb-4">
					<RdsTextArea
						label='Resources'
						placeholder='Resources'
					    onChange = {resourcehadleChange}
						rows ={3}
						value = {data.resource}
						dataTestId="resources"
					/>                                                      
				</div>
           <div >
			{/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
           </div>
		   <div className="mt-3 d-flex footer-buttons">
						<RdsButton
							class="me-2"
							tooltipTitle={""}
							type={"button"}
							label={("Cancel") || ""}
							colorVariant="outline-primary"
							size="small"
							databsdismiss="offcanvas"
							dataTestId="cancel"
						></RdsButton>
						<RdsButton
							class="me-2"
							label={("Save") || ""}
							size="small"
							colorVariant="primary"
							tooltipTitle={""}
							type={"submit"}
							databsdismiss="offcanvas"
							onClick={()=>props.onSuccess(data)}
							isDisabled={!isFormValid}
							dataTestId="save"
						></RdsButton>
					</div>
			</form>
		</div>
    </>
  );
};
export default RdsCompApiScopeBasicResource;
