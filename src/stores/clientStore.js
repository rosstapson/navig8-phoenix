import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
//import { Client } from "../models/ClientFormValues.js"

export default class ClientStore {

    clientRegistry = new Map()
    selectedClient = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get clientsByDate() {
        return Array.from(this.clientRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }


    // get groupedClients() {
    //     return Object.entries(
    //         this.clientsByDate.reduce((clients, client) => {
    //             const date = format(client.createdDate, 'dd MMM yyyy')
    //             clients[date] = clients[date] ? [...clients[date], client] : [client]
                
    //             return clients
    //         }, {} )
    //     )
    // }

    loadClients = async () => {
        this.setLoadingInitial(true)
        try {
            
            let clients = await agent.Clients.list()
            clients.forEach(client => {
                client.createdDate = new Date(client.createdDate)
                //const user = store.userStore.user
                // if (user) {
                //     client.isGoing = client.attendees.some(
                //         a => a.username === user.username
                //     )
                //     client.isHost = client.hostUserName === user.username
                //     client.host = client.attendees.find(x => x.username === client.hostUserName)
                    
                // }
                this.addInAClient(client.id, client)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInAClient = (id, client) => {
        this.clientRegistry.set(id, client)
    }

    loadClient = async (id) => {
        
        let client = this.clientRegistry.get(id)
        if (client) {
            this.selectClient(client.id)
            return client
        }
        else {
            //this.setLoadingInitial(true)
            try {
                client = await agent.Clients.details(id)
                client.createdDate = new Date(client.createdDate)
                //const user = store.userStore.user
                
                // if (user) {
                //     client.isGoing = client.attendees.some(
                //         a => a.username === user.username
                //     )
                //     client.isHost = client.hostUserName === user.username
                //     client.host = client.attendees.find(
                //         x => x.username === client.hostUserName
                //     )
                // }
                this.clientRegistry.set(client.id, client)
                this.selectClient(client.id)
                return client
            } catch (error) {
                console.log(error)
            }
        }
        this.setLoadingInitial(false)
    }

    // private setClient = (client) => {
    //     client.createdDate = client.createdDate.split("T")[0]
    //     this.clientRegistry.set(client.id, client)
    // }

    // private getClient = (id) => {
    //     return this.clientRegistry.get(id)
    // }

    setLoadingInitial = (state) => {
        this.loadingInitial = state
    }

    setLoading = (state) => {
        this.loading = state
    }

    selectClient = (id) => {
        
        this.selectedClient = this.clientRegistry.get(id)
        
    }

    cancelSelectedClient = () => {
        this.selectedClient = undefined
    }

    openForm = (id) => {
        id ? this.selectClient(id) : this.cancelSelectedClient()
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

    createClient = async (client) => {
        //this.setLoading(true)
        client.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Clients.create(client)
            const newClient = new Client(client)
            newClient.hostUserName = user.username
            newClient.host = user
            //newClient.attendees = [user]
            
            runInAction(() => {
                this.clientRegistry.set(newClient.id, newClient)
                this.selectedClient = newClient
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateClient = async (client) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.Clients.update(client)
            runInAction(() => {
                client.hostUserName = user.username
                client.host = user
                this.clientRegistry.set(client.id, client)
                this.selectedClient = client
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteClient = async (id) => {
        this.setLoading(true)
        try {
            await agent.Clients.delete(id)
            runInAction(() => {
                this.clientRegistry.delete(id)
                if (this.selectedClient.id == id)
                    this.cancelSelectedClient()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelClientToggle = async () => {
        this.loading = true
        try {
            await agent.Clients.attend(this.selectedClient.id)
            runInAction(() => {
                this.selectedClient.isCancelled = !this.selectedClient.isCancelled
                this.clientRegistry.set(this.selectedClient.id, this.selectedClient)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedClient = () => {
        this.selectedClient = undefined
    }
}