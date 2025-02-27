import { makeAutoObservable, runInAction } from "mobx"
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { store } from "./store.js"

class CommentStore {
    comments = []
    hubConnection = null

    
    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (activityId) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_CHAT_URL + "?activityId=" + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()
            
            this.hubConnection.start().catch(error => console.log("Error establishing cnxn: ", error))

            this.hubConnection.on('LoadComments', comments => {  
                runInAction(() => {
                    //minor hack 'cos we didn't use DateTimeOffset on the API. Not sure if I should refactor
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z')
                    })
                    this.comments = comments
                })
            })

            this.hubConnection.on('ReceiveComment', comment => {
                runInAction(() => this.comments.unshift(comment))
            })


        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error stopping SignalR cnxn: ", error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values) => {
        values.activityId = store.activityStore.selectedActivity?.id
        try {
            await this.hubConnection?.invoke("SendComment", values) // this is invoking the SendComment method on the API, in the ChatHub
                                                                    // public async Task SendComment(Create.Command command) 
        } catch (error) {
            console.log(error)
        }
    }
}

export default CommentStore