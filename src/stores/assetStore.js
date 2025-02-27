import {  makeAutoObservable, runInAction } from "mobx"
import {v4 as uuid} from "uuid"
import agent from "../api/agent.js"

import { store } from "./store.js"
//import { Asset } from "../models/AssetFormValues.js"

export default class AssetStore {

    assetRegistry = new Map()
    selectedAsset = null
    editMode = false
    loading = false
    loadingInitial = false
    
    constructor() {
        makeAutoObservable(this)
    }

    get assetsByDate() {
        return Array.from(this.assetRegistry.values()).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
    }


    loadAssets = async () => {
        this.setLoadingInitial(true)
        try {
            
            let assets = await agent.Assets.list()
            assets.forEach(asset => {
                asset.createdDate = new Date(asset.createdDate)
                
                this.addInAAsset(asset.id, asset)
            })
            
        } catch (error) {
            console.log(error)
        }
        
        this.setLoadingInitial(false)
    }

    addInAAsset = (id, asset) => {
        this.assetRegistry.set(id, asset)
    }

    loadAsset = async (id) => {
        
        let asset = this.assetRegistry.get(id)
        if (asset) {
            this.selectAsset(asset.id)
            return asset
        }
        else {
           
            try {
                asset = await agent.Assets.details(id)
                asset.createdDate = new Date(asset.createdDate)
                
                this.assetRegistry.set(asset.id, asset)
                this.selectAsset(asset.id)
                return asset
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

    selectAsset = (id) => {
        
        this.selectedAsset = this.assetRegistry.get(id)
        
    }

    cancelSelectedAsset = () => {
        this.selectedAsset = undefined
    }

    openForm = (id) => {
        id ? this.selectAsset(id) : this.cancelSelectedAsset()
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

    createAsset = async (asset) => {
       
        asset.id = uuid()
        const user = store.userStore.user
        
        try {
            await agent.Assets.create(asset)
            const newAsset = new Asset(asset)
            newAsset.hostUserName = user.username
            newAsset.host = user
            
            
            runInAction(() => {
                this.assetRegistry.set(newAsset.id, newAsset)
                this.selectedAsset = newAsset
                
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    updateAsset = async (asset) => {
       
       const user = store.userStore.user
        try {
            await agent.Assets.update(asset)
            runInAction(() => {
                asset.hostUserName = user.username
                asset.host = user
                this.assetRegistry.set(asset.id, asset)
                this.selectedAsset = asset
               
            })
        } catch (error) {
            console.log(error)
        }
       
    }

    deleteAsset = async (id) => {
        this.setLoading(true)
        try {
            await agent.Assets.delete(id)
            runInAction(() => {
                this.assetRegistry.delete(id)
                if (this.selectedAsset.id == id)
                    this.cancelSelectedAsset()
            })
        } catch (error) {
            console.log(error)
        }
        this.setLoading(false)
    }

    

    cancelAssetToggle = async () => {
        this.loading = true
        try {
            await agent.Assets.attend(this.selectedAsset.id)
            runInAction(() => {
                this.selectedAsset.isCancelled = !this.selectedAsset.isCancelled
                this.assetRegistry.set(this.selectedAsset.id, this.selectedAsset)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedAsset = () => {
        this.selectedAsset = undefined
    }
}