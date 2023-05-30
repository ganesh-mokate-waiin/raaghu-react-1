import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TenantService} from "../../proxy/services/TenantService"
import { BlogFeatureService } from "../../proxy/services/BlogFeatureService";
import { EditionService, FeaturesService } from "../../proxy";

export interface TenantState {
  loading:boolean;
  tenants: any;
  edition:any;
  editTenant:any
  error: string | null;
  feature:any;
  currentUser:any


}

export const tenantInitialState: TenantState = {
  loading:false,
  tenants: [],
  edition:{items:[]},
  error: null,
  editTenant:null,
  feature:null,
  currentUser:null
  

};

 
export const fetchTenant= createAsyncThunk(
  "tenant/fetchTenant",
  ()=>{
 
    return TenantService.getTenants1({
      filter:undefined,
      getEditionNames: undefined,
      editionId: undefined,
      expirationDateMin:undefined,
      expirationDateMax: undefined,
      activationState: undefined,
      sorting: 'id DESC',
      skipCount: undefined,
      maxResultCount: undefined,
    }).then((result:any)=>{
      return result.items;
    }
    )
  }
  
)
 
export const fetchEdition= createAsyncThunk(
  "tenant/fetchEdition",
  ()=>{
    return TenantService.getTenantsLookupEditions().then((result:any)=>{
      return result
    })
  }
  
)

export const createTenant= createAsyncThunk(
  
  "tenant/createTenant",
  (data:any)=>{
    return TenantService.postTenants({requestBody:data}).then((result:any)=>{
      return result
    })
  }
)

export const featureTenant= createAsyncThunk(
  "tenant/featureTenant",
  (data:any)=>{
    return BlogFeatureService.getBlogsFeatures({blogId:"T", featureName: ""}).then((result:any)=>{
      return result
    })
  }
)

export const deleteTenant= createAsyncThunk(
  "tenant/deleteTenant",
  (id:string)=>{
    return TenantService.deleteTenants({id:id}).then((result:any)=>{
      return result
    })
  }
)


export const editTenant= createAsyncThunk(
  "tenant/editTenant",
  (id:any)=>{
    return TenantService.getTenants({id:id}).then((result:any)=>{
      return result
    })
  }
)

export const fetchFeature = createAsyncThunk(
  "tenant/fetchFeature",
  (id:any)=>{
    return TenantService.getTenants({id:id}).then((result:any)=>{
      return result
    })
  }
)

export const editEdition= createAsyncThunk(
  "tenant/editEdition",
  (id:string)=>{
    return EditionService.getEditions({id:id}).then((result:any)=>{
      return result
    })
  }
)

export const tenantPut= createAsyncThunk(
  "tenant/tenantPut",
  (data:any)=>{
    return TenantService.putTenants({id:data.id,requestBody:data.body}).then((result:any)=>{
      return result
    })
  }
)

export const tenantFeaturesGet= createAsyncThunk(
  "tenant/tenantFeaturesGet",
  (data:any)=>{
    return FeaturesService.getFeatures({providerName:"T",providerKey:data.id}).then((result:any)=>{
      return result
    })
  }
)

export const saveFeaturesEdition = createAsyncThunk(
  "edition/saveFeaturesEdition",
  (data: any) => { 
    return FeaturesService.putFeatures({providerName:"T", providerKey:data.id, requestBody:data.body}).then((result: any) => {
      return result;
    });
  }
);
export const restoreToDefaultFeaturesEdition = createAsyncThunk(
  "edition/restoreToDefaultFeaturesEdition",
  (id: any) => { 
    return FeaturesService.deleteFeatures({providerName:"T",providerKey: id}).then((result: any) => {
      return result;
    });
  }
);
// export const tenantFeaturesPut= createAsyncThunk(
//   "tenant/tenantPut",
//   (data:any)=>{
//     return proxy.featuresPUT(providerName: string | undefined, providerKey: string | undefined, body: UpdateFeaturesDto | undefined, cancelToken?: CancelToken | undefined).then((result:any)=>{
//       return result
//     })
//   }
// )




const tenantSlice= createSlice({
  name:"tenant",
  initialState:tenantInitialState,

  reducers :{},
  extraReducers:(builder)=>{
    
    builder.addCase(fetchTenant.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      fetchTenant.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.tenants= action.payload;
        state.error= "";
      }
    );
    builder.addCase(fetchTenant.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    builder.addCase(fetchEdition.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      fetchEdition.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.edition= action.payload;
        state.error= "";
      }
    );
    builder.addCase(fetchEdition.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    builder.addCase(createTenant.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      createTenant.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.error= "";
      }
    );
    builder.addCase(createTenant.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    builder.addCase(editTenant.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      editTenant.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.editTenant= action.payload;
        state.error= "";
      }
    );
    builder.addCase(editTenant.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    builder.addCase(editEdition.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      editEdition.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.editTenant= action.payload;
        state.error= "";
      }
    );
    builder.addCase(editEdition.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    builder.addCase(tenantPut.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      tenantPut.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.editTenant= action.payload;
        state.error= "";
      }
    );
    builder.addCase(tenantPut.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })
     builder.addCase(tenantFeaturesGet.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(
      tenantFeaturesGet.fulfilled,
      (state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.feature= action.payload;
        state.error= "";
      }
    );
    builder.addCase(tenantFeaturesGet.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Something went wrong";
    })

    
    builder.addCase(saveFeaturesEdition.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveFeaturesEdition.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.feature = action.payload;
      }
    );
    builder.addCase(saveFeaturesEdition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(restoreToDefaultFeaturesEdition.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      restoreToDefaultFeaturesEdition.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.feature = action.payload;
      }
    );
    builder.addCase(
      restoreToDefaultFeaturesEdition.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // builder.addCase(tenantFeaturesPut.pending,(state)=>{
    //   state.loading=true;
    // });

    // builder.addCase(
    //   tenantFeaturesPut.fulfilled,
    //   (state,action:PayloadAction<any>)=>{
    //     state.loading=false;
    //     state.editTenant= action.payload;
    //     state.error= "";
    //   }
    // );
    // builder.addCase(tenantFeaturesPut.rejected,(state,action)=>{
    //   state.loading=false;
    //   state.error=action.error.message || "Something went wrong";
    // })
  }
})

export default tenantSlice.reducer;
