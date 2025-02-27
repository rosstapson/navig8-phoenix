import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { Company } from "../models/CompanyFormValues.js"

export default class CompanyStore {

    companyRegistry = new Map()
    selectedCompany = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get companiesByDate() {
        return Array.from(this.companyRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }


    // get groupedCompanies() {
    //     return Object.entries(
    //         this.companiesByDate.reduce((companies, company) => {
    //             const date = format(company.createdDate, 'dd MMM yyyy')
    //             companies[date] = companies[date] ? [...companies[date], company] : [company]
                
    //             return companies
    //         }, {} )
    //     )
    // }

    loadCompanies = async () => {
        this.setLoadingInitial(true)
        try {
            
            let companies = await agent.Companies.list()
            runInAction(() => {
                companies.forEach(company => {
                    company.createdDate = new Date(company.createdDate)
                    //const user = store.userStore.user
                    // if (user) {
                    //     company.isGoing = company.attendees.some(
                    //         a => a.username === user.username
                    //     )
                    //     company.isHost = company.hostUserName === user.username
                    //     company.host = company.attendees.find(x => x.username === company.hostUserName)
                        
                    // }
                    this.addInACompany(company.id, company)
                })
                this.setLoadingInitial(false)
            })
            
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInACompany = (id, company) => {
        this.companyRegistry.set(id, company)
    }

    loadCompany = async (id) => {
        
        let company = this.companyRegistry.get(id)
        if (company) {
            this.selectCompany(company.id)
            return company
        }
        else {
            //this.setLoadingInitial(true)
            try {
                company = await agent.Companies.details(id)
                company.createdDate = new Date(company.createdDate)
                //const user = store.userStore.user
                
                // if (user) {
                //     company.isGoing = company.attendees.some(
                //         a => a.username === user.username
                //     )
                //     company.isHost = company.hostUserName === user.username
                //     company.host = company.attendees.find(
                //         x => x.username === company.hostUserName
                //     )
                // }
                this.companyRegistry.set(company.id, company)
                this.selectCompany(company.id)
                return company
            } catch (error) {
                console.log(error)
            }
        }
        this.setLoadingInitial(false)
    }

    // private setCompany = (company) => {
    //     company.createdDate = company.createdDate.split("T")[0]
    //     this.companyRegistry.set(company.id, company)
    // }

    // private getCompany = (id) => {
    //     return this.companyRegistry.get(id)
    // }

    setLoadingInitial = (state) => {
        this.loadingInitial = state
    }

    setLoading = (state) => {
        this.loading = state
    }

    selectCompany = (id) => {
        
        this.selectedCompany = this.companyRegistry.get(id)
        
    }

    cancelSelectedCompany = () => {
        this.selectedCompany = undefined
    }

    openForm = (id) => {
        id ? this.selectCompany(id) : this.cancelSelectedCompany()
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

    createCompany = async (company) => {
        //this.setLoading(true)
        company.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Companies.create(company)
            const newCompany = new Company(company)
           
            
            runInAction(() => {
                this.companyRegistry.set(newCompany.id, newCompany)
                this.selectedCompany = newCompany
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateCompany = async (company) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.Companies.update(company)
            runInAction(() => {
                company.hostUserName = user.username
                company.host = user
                this.companyRegistry.set(company.id, company)
                this.selectedCompany = company
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteCompany = async (id) => {
        this.setLoading(true)
        try {
            await agent.Companies.delete(id)
            runInAction(() => {
                this.companyRegistry.delete(id)
                if (this.selectedCompany.id == id)
                    this.cancelSelectedCompany()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelCompanyToggle = async () => {
        this.loading = true
        try {
            await agent.Companies.attend(this.selectedCompany.id)
            runInAction(() => {
                this.selectedCompany.isCancelled = !this.selectedCompany.isCancelled
                this.companyRegistry.set(this.selectedCompany.id, this.selectedCompany)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedCompany = () => {
        this.selectedCompany = undefined
    }
}