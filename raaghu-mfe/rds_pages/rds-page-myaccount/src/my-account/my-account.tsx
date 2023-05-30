import React, { useEffect, useState } from "react"; 
import {RdsButton, RdsCheckbox, RdsLabel, RdsNavtabs} from "../../../rds-elements";
import {RdsCompChangePassword, RdsCompPersonalInfo, RdsCompProfilePicture } from "../../../rds-components";
import {  useAppDispatch,  useAppSelector} from "../../../../libs/state-management/hooks";
import { changepasswordProfile, fetchMyProfile, getProfilePicture, saveMyProfile, sendEmailVerifyProfile, setProfilePicture, setTwoFactorEnabled } from "../../../../libs/state-management/my-account/my-account-slice";


 const navtabsItems = [
    { label: "Profile Picture", tablink: "#nav-profile_picture", id: 0 },
    { label: "Change password", tablink: "#nav-change_password", id: 1 },
    { label: "Personal Info", tablink: "#nav-personal_info", id: 2 },
    { label: "Two factor", tablink: "#nav-two_Factor", id: 3 },
  ];

 const MyAccount = (props:any) => { 
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const data = useAppSelector((state) => state.persistedReducer.myaccount);
    const [twoFactorData,setFormData] = useState(false);

    const [changePasswordData, setchangePassword] = useState<any>({
        currentPassword: "",
        newPassword:"",
        newPasswordConfirm:""       
    });

    const [personalInfo, setpersonalInfo] = useState<any>({
        userName: "", 
        name:"",
        surname:"",
        email:"",
        phoneNumber:""    
    });

    const [profilePicture, setPicture] = useState<any>({
        type:0,
        // imageContent:""
    });
    const[convertedImage, setConvertedImage] = useState<any>();

    const dispatch = useAppDispatch();
    
    function handlePasswordDataSubmit(formData: any) {
        dispatch(changepasswordProfile(formData) as any);
    }

    function handleTwoFactorSubmit(value:boolean) {
        setFormData(value);
        dispatch(setTwoFactorEnabled(value) as any)
        console.log("Two factor Data", value);
    }

    function handlePersonalInfoSubmit(formData:any) {
        dispatch(saveMyProfile(formData) as any);
    }

    function handleVerifyEmailDataSubmit(email:any) {
        dispatch(sendEmailVerifyProfile(email) as any);
    }
  
    const [file, setFile] = useState<any>();
  const [imageData, setImageData] = useState<any>();
 const[type,setType] = useState(2);
  function handleFileInputChange(event:any) {
    setFile(event.target.files[0]);
  }
  const[postFile, setPostFile] =useState<any>();

  function submitProfilePic() {
      dispatch(setProfilePicture({
        type:type,
        formData: {
            ImageContent: postFile
        },
    }) as any).then((res:any)=>{
        let id = localStorage.getItem('userId')
        dispatch(getProfilePicture(id) as any);
    })
  }
    useEffect(() => {
        let id = localStorage.getItem('userId')
        
        dispatch(fetchMyProfile() as any);
        dispatch(getProfilePicture(id) as any);

    },[dispatch]);
    function createImageFromBase64(base64String: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `data:image/png;base64,${base64String}`;
          img.addEventListener('load', () => {
            resolve(img);
          });
          img.addEventListener('error', (err) => {
            reject(err);
          });
        });
      }
      
    
    useEffect(()=>{
        if(data.getProfilePicData){
                    // your Base64-encoded string here
                    createImageFromBase64(data.getProfilePicData.fileContent)
                    .then((image) => {
                        // the image has finished loading
                    setConvertedImage(image.src)

                        // you can now use the image object in your code
                    })
                    .catch((err) => {
                        // there was an error loading the image
                        console.error(`Error loading image: ${err}`);
                    });

                   }

    },[data.getProfilePicData])

    useEffect(() => {
        if (data.personalInfo) {
            setpersonalInfo(data.personalInfo);
        }
      }, [data.personalInfo]);

      useEffect(() => {
        if (data.changePasswordData) {
            setchangePassword(data.changePasswordData);
        }
      }, [data.changePasswordData]);

      useEffect(() => {
        if (data.profilePicture) {
            setPicture(data.profilePicture);
        }
      }, [data.profilePicture]);
    
      function dataUrlToBlob(dataUrl:any) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      }
      function postProfilePic(data:File, type:number){
        
        fileToBlob(data).then((blob) => {
            console.log(blob);
            setPostFile(blob)
        });   
        setType(type)     
      }

      function fileToBlob(file: File): Promise<Blob> {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const blob = new Blob([result], { type: file.type });
            resolve(blob);
          };
          reader.readAsArrayBuffer(file);
        });
      }

 
    return (
        <div className="container-fluid m-0 p-0">
            <div className="row">
     <div className="col-md-12">
        <div className="card border-0 px-4 h-100 rounded-0 card-full-stretch">
            <div className="card-body">                
                    <div className="col-12 cursor-pointer">
                        <RdsNavtabs                       
                        navtabsItems={navtabsItems}
                        type="tabs"
                        fill={false}
                        justified={false}
                        activeNavtabOrder={(activeNavTabId) => {
                            setActiveNavTabId(activeNavTabId);
                        }}  
                        />   
                    </div> 
                    {activeNavTabId === "0" && (
                        <RdsCompProfilePicture
                        handleProfileDataSubmit={submitProfilePic}
                            postProfilePic={postProfilePic}
                            profilePictureData={convertedImage}
                            profilePicture={profilePicture}></RdsCompProfilePicture>
                    )}
                    {activeNavTabId === "1" && (
                        <RdsCompChangePassword
                        handlePasswordDataSubmit={(formData: any) => {
                            handlePasswordDataSubmit(formData);
                            }}
                            changePasswordData={changePasswordData}>                            
                        </RdsCompChangePassword>
                    )} 
                    {activeNavTabId === "2" && (
                        <RdsCompPersonalInfo
                        handlePersonalDataSubmit={(formData: any) => {
                            handlePersonalInfoSubmit(formData);
                        }}
                        handleVerifyEmailSubmit={(email:any)=>{
                            handleVerifyEmailDataSubmit(email)
                        }}
                        personalInfo={personalInfo}></RdsCompPersonalInfo>
                        
                    )}
                    {activeNavTabId === "3" && (
                        <>
                         <div className="mt-4 py-4">
                            <RdsCheckbox
                                label="Two factor enabled"
                                onChange={(e:any) =>{handleTwoFactorSubmit(e.target.checked)}}
                                checked={twoFactorData}
                            ></RdsCheckbox>  
                        </div>
                        <div className="mt-3 position-absolute bottom-0 mb-4">
                        <RdsButton
                            label = 'Save'
                            size="small"
                            colorVariant ='primary'
                            block = {false}
                            type = "submit"
                            onClick={()=>{handleTwoFactorSubmit(twoFactorData)}}				
                            />      
                        </div>
                        </>
                    //    <form onSubmit={handletwoFactorDataSubmit}>
                       

                    //    </form>
                    )}                                                           
            </div>
        </div>
     </div> 
     </div>
        </div>     
      );
}

export default MyAccount;