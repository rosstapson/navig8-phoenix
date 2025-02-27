import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { Supplier } from "../models/SupplierFormValues.js"

export default class SupplierStore {

    supplierRegistry = new Map()
    selectedSupplier = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get suppliersByDate() {
        return Array.from(this.supplierRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }


    // get groupedSuppliers() {
    //     return Object.entries(
    //         this.suppliersByDate.reduce((suppliers, supplier) => {
    //             const date = format(supplier.createdDate, 'dd MMM yyyy')
    //             suppliers[date] = suppliers[date] ? [...suppliers[date], supplier] : [supplier]
                
    //             return suppliers
    //         }, {} )
    //     )
    // }

    loadSuppliers = async () => {
        this.setLoadingInitial(true)
        try {
            
            let suppliers = await agent.Suppliers.list()
            suppliers.forEach(supplier => {
                supplier.createdDate = new Date(supplier.createdDate)
                //const user = store.userStore.user
                // if (user) {
                //     supplier.isGoing = supplier.attendees.some(
                //         a => a.username === user.username
                //     )
                //     supplier.isHost = supplier.hostUserName === user.username
                //     supplier.host = supplier.attendees.find(x => x.username === supplier.hostUserName)
                    
                // }
                this.addInASupplier(supplier.id, supplier)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInASupplier = (id, supplier) => {
        this.supplierRegistry.set(id, supplier)
    }

    loadSupplier = async (id) => {
        
        let supplier = this.supplierRegistry.get(id)
        if (supplier) {
            this.selectSupplier(supplier.id)
            return supplier
        }
        else {
            //this.setLoadingInitial(true)
            try {
                supplier = await agent.Suppliers.details(id)
                supplier.createdDate = new Date(supplier.createdDate)
                //const user = store.userStore.user
                
                // if (user) {
                //     supplier.isGoing = supplier.attendees.some(
                //         a => a.username === user.username
                //     )
                //     supplier.isHost = supplier.hostUserName === user.username
                //     supplier.host = supplier.attendees.find(
                //         x => x.username === supplier.hostUserName
                //     )
                // }
                this.supplierRegistry.set(supplier.id, supplier)
                this.selectSupplier(supplier.id)
                return supplier
            } catch (error) {
                console.log(error)
            }
        }
        this.setLoadingInitial(false)
    }

    // private setSupplier = (supplier) => {
    //     supplier.createdDate = supplier.createdDate.split("T")[0]
    //     this.supplierRegistry.set(supplier.id, supplier)
    // }

    // private getSupplier = (id) => {
    //     return this.supplierRegistry.get(id)
    // }

    setLoadingInitial = (state) => {
        this.loadingInitial = state
    }

    setLoading = (state) => {
        this.loading = state
    }

    selectSupplier = (id) => {
        
        this.selectedSupplier = this.supplierRegistry.get(id)
        
    }

    cancelSelectedSupplier = () => {
        this.selectedSupplier = undefined
    }

    openForm = (id) => {
        id ? this.selectSupplier(id) : this.cancelSelectedSupplier()
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

    createSupplier = async (supplier) => {
        //this.setLoading(true)
        supplier.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Suppliers.create(supplier)
            const newSupplier = new Supplier(supplier)
            newSupplier.hostUserName = user.username
            newSupplier.host = user
            //newSupplier.attendees = [user]
            
            runInAction(() => {
                this.supplierRegistry.set(newSupplier.id, newSupplier)
                this.selectedSupplier = newSupplier
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateSupplier = async (supplier) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.Suppliers.update(supplier)
            runInAction(() => {
                supplier.hostUserName = user.username
                supplier.host = user
                this.supplierRegistry.set(supplier.id, supplier)
                this.selectedSupplier = supplier
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteSupplier = async (id) => {
        this.setLoading(true)
        try {
            await agent.Suppliers.delete(id)
            runInAction(() => {
                this.supplierRegistry.delete(id)
                if (this.selectedSupplier.id == id)
                    this.cancelSelectedSupplier()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelSupplierToggle = async () => {
        this.loading = true
        try {
            await agent.Suppliers.attend(this.selectedSupplier.id)
            runInAction(() => {
                this.selectedSupplier.isCancelled = !this.selectedSupplier.isCancelled
                this.supplierRegistry.set(this.selectedSupplier.id, this.selectedSupplier)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedSupplier = () => {
        this.selectedSupplier = undefined
    }
}