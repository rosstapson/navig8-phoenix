import { createContext, useContext }  from "react"

import CommonStore from "./commonStore.js"
import UserStore from "./userStore.js"
import ModalStore from "./modalStore.js"
import MenuStore from "./menuStore.js"
import OrderStore from "./orderStore.js"
import ClientStore from "./clientStore.js"
import ProfileStore from "./profileStore.js"
import CommentStore from "./commentStore.js"
import ClientCommentStore from "./clientCommentStore.js"
import AssetStore from "./assetStore.js"
import LookupListStore from "./lookupListStore.js"
import SupplierStore from "./supplierStore.js"
import SupplierTypeStore from "./supplierTypeStore.js"
import CompanyStore from "./companyStore.js"
import LocationStore from './locationStore.js'
import RouteStore from "./routeStore.js"
import DriverStore from "./driverStore.js"

export const store = {
   
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    menuStore: new MenuStore(),
    orderStore: new OrderStore(),
    clientStore: new ClientStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    clientCommentStore: new ClientCommentStore(),
    assetStore: new AssetStore(),
    lookupListStore: new LookupListStore(),
    supplierStore: new SupplierStore(),
    supplierTypeStore: new SupplierTypeStore(),
    companyStore: new CompanyStore(),
    locationStore: new LocationStore(),
    routeStore: new RouteStore(),
    driverStore: new DriverStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}