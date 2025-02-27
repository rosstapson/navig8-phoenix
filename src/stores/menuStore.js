import { makeAutoObservable } from 'mobx'

export default class MenuStore {
    menu = {
        open: true,
        body: null
    }

    constructor() {
        makeAutoObservable(this)
    }

    openmenu = (content) => {
        this.menu.open = true
        this.menu.body = content
    }

    closemenu = () => {
        this.menu.open = false
        this.menu.body = null
    }
}