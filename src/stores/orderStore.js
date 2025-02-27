import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { store } from "./store.js"
import agent from "../api/agent.js"
import { Order } from "../models/OrderFormValues.js";

export default class orderStore {

    orderRegistry = new Map()


      constructor() {
            makeAutoObservable(this)
        }

        loadorder = async (id) => {
        
            let order = this.orderRegistry.get(id)
            if (order) {
                this.selectorder(order.id)
                return order
            }
            else {
                //this.setLoadingInitial(true)
                try {
                    order = await agent.Activities.details(id)
                    order.date = new Date(order.date)
                    const user = store.userStore.user
                    
                    if (user) {
                        order.isGoing = order.attendees.some(
                            a => a.username === user.username
                        )
                        order.isHost = order.hostUserName === user.username
                        order.host = order.attendees.find(
                            x => x.username === order.hostUserName
                        )
                    }
                    this.orderRegistry.set(order.id, order)
                    this.selectorder(order.id)
                    return order
                } catch (error) {
                    console.log(error)
                }
            }
            this.setLoadingInitial(false)
        }

        createOrder = async (order) => {
            //this.setLoading(true)
            order.id = uuid()
            const user = store.userStore.user
            
            try {
                await agent.Activities.create(order)
                const newOrder = new Order(order)
                newOrder.hostUserName = user.username
                newOrder.host = user
                newOrder.attendees = [user]
                
                runInAction(() => {
                    this.orderRegistry.set(newOrder.id, newOrder)
                    this.selectedOrder = newOrder
                    //this.editMode = false
                })
            } catch (error) {
                console.log(error)
            }
            //this.setLoading(false)
        }
    
        updateOrder = async (order) => {
           // this.setLoading(true)
           const user = store.userStore.user
            try {
                await agent.Activities.update(order)
                runInAction(() => {
                    order.hostUserName = user.username
                    order.host = user
                    this.orderRegistry.set(order.id, order)
                    this.selectedOrder = order
                    //this.editMode = false
                })
            } catch (error) {
                console.log(error)
            }
            ///this.setLoading(false)
        }
    
        deleteOrder = async (id) => {
            this.setLoading(true)
            try {
                await agent.Activities.delete(id)
                runInAction(() => {
                    this.orderRegistry.delete(id)
                    if (this.selectedOrder.id == id)
                        this.cancelSelectedOrder()
                })
            } catch (error) {
                console.log(error)
            }
            this.setLoading(false)
        }
}