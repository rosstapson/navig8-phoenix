import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { Driver } from "../models/DriverFormValues.js"

export default class DriverStore {

    driverRegistry = new Map()
    selectedDriver = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get driversByDate() {
        return Array.from(this.driverRegistry.values()).sort((a, b) => a.employmentDate - b.employmentDate)
    }


    loadDrivers = async () => {
        this.setLoadingInitial(true)
        try {
            
            let drivers = await agent.Drivers.list()
            drivers.forEach(driver => {
                driver.createdDate = new Date(driver.createdDate)
                
                this.addInADriver(driver.id, driver)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInADriver = (id, driver) => {
        this.driverRegistry.set(id, driver)
    }

    loadDriver = async (id) => {
        
        let driver = this.driverRegistry.get(id)
        if (driver) {
            this.selectDriver(driver.id)
            return driver
        }
        else {
           
            try {
                driver = await agent.Drivers.details(id)
                driver.createdDate = new Date(driver.createdDate)
                
                this.driverRegistry.set(driver.id, driver)
                this.selectDriver(driver.id)
                return driver
            } catch (error) {
                console.log(error)
            }
        }
        this.setLoadingInitial(false)
    }

    setLoadingInitial = (state) => {
        this.loadingInitial = state
    }

    setLoading = (state) => {
        this.loading = state
    }

    selectDriver = (id) => {
        
        this.selectedDriver = this.driverRegistry.get(id)
        
    }

    cancelSelectedDriver = () => {
        this.selectedDriver = undefined
    }

    openForm = (id) => {
        id ? this.selectDriver(id) : this.cancelSelectedDriver()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    uploadFile = async (file) => {
        if (file) {
           
            try {              
              
                return agent.Files.uploadFile(file)
            } catch (error) {
              console.error(error);
            }
          }
    }

    uploadFiles = async (files) => {
        if (files) {
           
            try {              
              
                return agent.Files.uploadFiles(files)
            } catch (error) {
              console.error(error);
            }
          }
    }

    createDriver = async (driver) => {
       
        driver.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Drivers.create(driver)
            const newDriver = new Driver(driver)
            newDriver.hostUserName = user.username
            newDriver.host = user
            
            
            runInAction(() => {
                this.driverRegistry.set(newDriver.id, newDriver)
                this.selectedDriver = newDriver
                
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    updateDriver = async (driver) => {
       
       const user = store.userStore.user
        try {
            await agent.Drivers.update(driver)
            runInAction(() => {
                driver.hostUserName = user.username
                driver.host = user
                this.driverRegistry.set(driver.id, driver)
                this.selectedDriver = driver
               
            })
        } catch (error) {
            console.log(error)
        }
       
    }

    deleteDriver = async (id) => {
        this.setLoading(true)
        try {
            await agent.Drivers.delete(id)
            runInAction(() => {
                this.driverRegistry.delete(id)
                if (this.selectedDriver.id == id)
                    this.cancelSelectedDriver()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelDriverToggle = async () => {
        this.loading = true
        try {
            await agent.Drivers.attend(this.selectedDriver.id)
            runInAction(() => {
                this.selectedDriver.isCancelled = !this.selectedDriver.isCancelled
                this.driverRegistry.set(this.selectedDriver.id, this.selectedDriver)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedDriver = () => {
        this.selectedDriver = undefined
    }
}