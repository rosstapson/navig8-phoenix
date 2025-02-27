import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { SupplierType } from "../models/SupplierTypeFormValues.js"

export default class SupplierTypeStore {

    supplierTypeRegistry = new Map()
    selectedSupplierType = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get supplierTypesByDate() {
        return Array.from(this.supplierTypeRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }

    get supplierTypes() {
        return Array.from(this.supplierTypeRegistry.values())
    }
    // get groupedSupplierTypes() {
    //     return Object.entries(
    //         this.supplierTypesByDate.reduce((supplierTypes, supplierType) => {
    //             const date = format(supplierType.createdDate, 'dd MMM yyyy')
    //             supplierTypes[date] = supplierTypes[date] ? [...supplierTypes[date], supplierType] : [supplierType]
                
    //             return supplierTypes
    //         }, {} )
    //     )
    // }

    loadSupplierTypes = async () => {
        this.setLoadingInitial(true)
        try {
            
            let supplierTypes = await agent.SupplierTypes.list()
            supplierTypes.forEach(supplierType => {
                supplierType.createdDate = new Date(supplierType.createdDate)
                //const user = store.userStore.user
                // if (user) {
                //     supplierType.isGoing = supplierType.attendees.some(
                //         a => a.username === user.username
                //     )
                //     supplierType.isHost = supplierType.hostUserName === user.username
                //     supplierType.host = supplierType.attendees.find(x => x.username === supplierType.hostUserName)
                    
                // }
                this.addInASupplierType(supplierType.id, supplierType)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInASupplierType = (id, supplierType) => {
        this.supplierTypeRegistry.set(id, supplierType)
    }

    loadSupplierType = async (id) => {
        
        let supplierType = this.supplierTypeRegistry.get(id)
        if (supplierType) {
            this.selectSupplierType(supplierType.id)
            return supplierType
        }
        else {
            //this.setLoadingInitial(true)
            try {
                supplierType = await agent.SupplierTypes.details(id)
                supplierType.createdDate = new Date(supplierType.createdDate)
                //const user = store.userStore.user
                
                // if (user) {
                //     supplierType.isGoing = supplierType.attendees.some(
                //         a => a.username === user.username
                //     )
                //     supplierType.isHost = supplierType.hostUserName === user.username
                //     supplierType.host = supplierType.attendees.find(
                //         x => x.username === supplierType.hostUserName
                //     )
                // }
                this.supplierTypeRegistry.set(supplierType.id, supplierType)
                this.selectSupplierType(supplierType.id)
                return supplierType
            } catch (error) {
                console.log(error)
            }
        }
        this.setLoadingInitial(false)
    }

    // private setSupplierType = (supplierType) => {
    //     supplierType.createdDate = supplierType.createdDate.split("T")[0]
    //     this.supplierTypeRegistry.set(supplierType.id, supplierType)
    // }

    // private getSupplierType = (id) => {
    //     return this.supplierTypeRegistry.get(id)
    // }

    setLoadingInitial = (state) => {
        this.loadingInitial = state
    }

    setLoading = (state) => {
        this.loading = state
    }

    selectSupplierType = (id) => {
        
        this.selectedSupplierType = this.supplierTypeRegistry.get(id)
        
    }

    cancelSelectedSupplierType = () => {
        this.selectedSupplierType = undefined
    }

    openForm = (id) => {
        id ? this.selectSupplierType(id) : this.cancelSelectedSupplierType()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    uploadFile = async (file) => {
        if (file) {
            // const formData = new FormData();
            // formData.append("file", file);
            // formData.append("fileName", "zomg.jpg")
      
            try {              
              //return await agent.Files.upload(formData)
                return agent.Files.uploadFile(file)
            } catch (error) {
              console.error(error);
            }
          }
    }

    uploadFiles = async (files) => {
        if (files) {
            // const formData = new FormData();
            // formData.append("file", file);
            // formData.append("fileName", "zomg.jpg")
      
            try {              
              //return await agent.Files.upload(formData)
                return agent.Files.uploadFiles(files)
            } catch (error) {
              console.error(error);
            }
          }
    }

    createSupplierType = async (supplierType) => {
        //this.setLoading(true)
        supplierType.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.SupplierTypes.create(supplierType)
            const newSupplierType = new SupplierType(supplierType)
            
            
            runInAction(() => {
                this.supplierTypeRegistry.set(newSupplierType.id, newSupplierType)
                this.selectedSupplierType = newSupplierType
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateSupplierType = async (supplierType) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.SupplierTypes.update(supplierType)
            runInAction(() => {
                supplierType.hostUserName = user.username
                supplierType.host = user
                this.supplierTypeRegistry.set(supplierType.id, supplierType)
                this.selectedSupplierType = supplierType
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteSupplierType = async (id) => {
        this.setLoading(true)
        try {
            await agent.SupplierTypes.delete(id)
            runInAction(() => {
                this.supplierTypeRegistry.delete(id)
                if (this.selectedSupplierType.id == id)
                    this.cancelSelectedSupplierType()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelSupplierTypeToggle = async () => {
        this.loading = true
        try {
            await agent.SupplierTypes.attend(this.selectedSupplierType.id)
            runInAction(() => {
                this.selectedSupplierType.isCancelled = !this.selectedSupplierType.isCancelled
                this.supplierTypeRegistry.set(this.selectedSupplierType.id, this.selectedSupplierType)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedSupplierType = () => {
        this.selectedSupplierType = undefined
    }
}