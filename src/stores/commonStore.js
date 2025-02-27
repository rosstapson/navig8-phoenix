import { makeAutoObservable, reaction } from "mobx"

export default class CommonStore {
    error
    token = localStorage.getItem('jwt')
    appLoaded = false

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                }
                else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error) {
        this.error = error
    }

    setToken = (token) => {
        // if (token) {
        //     localStorage.setItem('jwt', token)
        // }
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }
}