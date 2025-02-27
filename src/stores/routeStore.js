import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
import { Route } from "../models/RouteFormValues.js"

export default class RouteStore {

    routeRegistry = new Map()
    //routeTypeRegistry = new Map()
    selectedRoute = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get routesByDate() {
        return Array.from(this.routeRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }

    get routes() {
        return Array.from(this.routeRegistry.values())
    }

    routeByLatLng = async (routeDTO) => {
        this.setLoadingInitial(true)
        try {
            
            let route = await agent.Routes.routeByLatLng(routeDTO)
            return route
            
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false)
    }

    loadRoutes = async () => {
        this.setLoadingInitial(true)
        try {
            
            let routes = await agent.Routes.list()
            routes.forEach(route => {
                route.createdDate = new Date(route.createdDate)
                
                this.addInARoute(route.id, route)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInARoute = (id, route) => {
        this.routeRegistry.set(id, route)
    }

    // addInARouteType = (id, routeType) => {
    //     this.routeTypeRegistry.set(id, routeType)
    // }

    loadRoute = async (id) => {
        
        let route = this.routeRegistry.get(id)
        if (route) {
            this.selectRoute(route.id)
            return route
        }
        else {
            //this.setLoadingInitial(true)
            try {
                route = await agent.Routes.details(id)
                route.createdDate = new Date(route.createdDate)
                
                this.routeRegistry.set(route.id, route)
                this.selectRoute(route.id)
                return route
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

    selectRoute = (id) => {
        
        this.selectedRoute = this.routeRegistry.get(id)
        
    }

    cancelSelectedRoute = () => {
        this.selectedRoute = undefined
    }

    openForm = (id) => {
        id ? this.selectRoute(id) : this.cancelSelectedRoute()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    createRoute = async (route) => {
        //this.setLoading(true)
        route.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Routes.create(route)
            const newRoute = await agent.Routes.details(route.id)
            console.log(newRoute)
            runInAction(() => {
                this.routeRegistry.set(route.id, newRoute)
                this.selectedRoute = route
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        //this.setLoading(false)
    }

    updateRoute = async (route) => {
       // this.setLoading(true)
       const user = store.userStore.user
        try {
            await agent.Routes.update(route)
            runInAction(() => {
                
                this.routeRegistry.set(route.id, route)
                this.selectedRoute = route
                //this.editMode = false
            })
        } catch (error) {
            console.log(error)
        }
        ///this.setLoading(false)
    }

    deleteRoute = async (id) => {
        this.setLoading(true)
        try {
            await agent.Routes.delete(id)
            runInAction(() => {
                this.routeRegistry.delete(id)
                if (this.selectedRoute.id == id)
                    this.cancelSelectedRoute()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelRouteToggle = async () => {
        this.loading = true
        try {
            await agent.Routes.attend(this.selectedRoute.id)
            runInAction(() => {
                this.selectedRoute.isCancelled = !this.selectedRoute.isCancelled
                this.routeRegistry.set(this.selectedRoute.id, this.selectedRoute)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedRoute = () => {
        this.selectedRoute = undefined
    }
}