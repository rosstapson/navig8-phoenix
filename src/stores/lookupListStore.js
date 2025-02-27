import {  makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent.js"

export default class LookupListStore {

    assetTypeRegistry = new Map()
    assetSubClassRegistry = new Map()
    portRegistry = new Map()
    
    constructor() {
        makeAutoObservable(this)
    }

    

    getPorts = async () => {
        try {

            if (this.portRegistry.size == 0) {
                var ports = await agent.Ports.list()
                runInAction(() => {
                    ports.forEach(element => {
                        this.portRegistry.set(element.id, element)
                    });
                })
            }
            
            
            return Array.from(this.portRegistry.values())
            
           
        } catch (error) {
            console.log(error)
        }
    }

    getAssetTypes = async () => {
       
        try {
            
            var types = await agent.AssetTypes.list()
            
            return types
            
           
        } catch (error) {
            console.log(error)
        }
        
    }


    deleteAssetType = async (id) => {
        
        try {
            await agent.AssetTypes.delete(id)
            runInAction(() => {
                this.assetTypeRegistry.delete(id)
                
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    createAssetSubClass = async (value) => {
       
        try {
            var assetType = {
                text: value,
                value: this.toCamelCase(value)
            }
            var newAssetType = await agent.AssetSubClasses.create(assetType)
            console.log(assetType)
          
            runInAction(() => {
                this.assetSubClassRegistry.set(newAssetType.id, newAssetType)
                
            })
        } catch (error) {
            console.log(error)
        }
       
    }

    createAssetType = async (value) => {
       
        try {
            var assetType = {
                text: value,
                value: this.toCamelCase(value)
            }
            var newAssetType = await agent.AssetTypes.create(assetType)
            console.log(assetType)
          
            runInAction(() => {
                this.assetTypeRegistry.set(newAssetType.id, newAssetType)
                
            })
        } catch (error) {
            console.log(error)
        }
       
    }

    toCamelCase = (str) => {
        return str
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
    }
    

    
}