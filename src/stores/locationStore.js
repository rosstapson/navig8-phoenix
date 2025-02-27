import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { Location } from "../models/LocationFormValues.js"

export default class LocationStore {

    locationRegistry = new Map()
    locationTypeRegistry = new Map()
    selectedLocation = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get locationsByDate() {
        return Array.from(this.locationRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }

    get locations() {
        return Array.from(this.locationRegistry.values())
    }

    getLocationTypes = async () => {
       
        try {
            var types = await agent.LocationTypes.list()
            
            return types
            
           
        } catch (error) {
            console.log(error)
        }
        
    }

    loadLocations = async () => {
        this.setLoadingInitial(true)
        try {
            
            let locations = await agent.Locations.list()
            locations.forEach(location => {
                location.createdDate = new Date(location.createdDate)
                
                this.addInALocation(location.id, location)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInALocation = (id, location) => {
        this.locationRegistry.set(id, location)
    }

    addInALocationType = (id, locationType) => {
        this.locationTypeRegistry.set(id, locationType)
    }

    loadLocation = async (id) => {
        
        let location = this.locationRegistry.get(id)
        if (location) {
            this.selectLocation(location.id)
            return location
        }
        else {
            //this.setLoadingInitial(true)
            try {
                location = await agent.Locations.details(id)
                location.createdDate = new Date(location.createdDate)
                
                this.locationRegistry.set(location.id, location)
                this.selectLocation(location.id)
                return location
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

    selectLocation = (id) => {
        
        this.selectedLocation = this.locationRegistry.get(id)
        
    }

    cancelSelectedLocation = () => {
        this.selectedLocation = undefined
    }

    openForm = (id) => {
        id ? this.selectLocation(id) : this.cancelSelectedLocation()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    createLocation = async (location) => {
        //this.setLoading(true)
        location.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Locations.create(location)
            const newLocation = new Location(location)
            newLocation.hostUserName = user.username
            newLocation.host = user
            //newLocation.attendees = [user]
            
            runInAction(() => {
                this.locationRegistry.set(newLocation.id, newLocation)
                this.selectedLocation = newLocation
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateLocation = async (location) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.Locations.update(location)
            runInAction(() => {
                location.hostUserName = user.username
                location.host = user
                this.locationRegistry.set(location.id, location)
                this.selectedLocation = location
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteLocation = async (id) => {
        this.setLoading(true)
        try {
            await agent.Locations.delete(id)
            runInAction(() => {
                this.locationRegistry.delete(id)
                if (this.selectedLocation.id == id)
                    this.cancelSelectedLocation()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelLocationToggle = async () => {
        this.loading = true
        try {
            await agent.Locations.attend(this.selectedLocation.id)
            runInAction(() => {
                this.selectedLocation.isCancelled = !this.selectedLocation.isCancelled
                this.locationRegistry.set(this.selectedLocation.id, this.selectedLocation)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedLocation = () => {
        this.selectedLocation = undefined
    }
}