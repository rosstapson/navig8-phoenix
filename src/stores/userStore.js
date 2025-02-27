import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.js";
import { store } from "./store.js";
//import { router } from "../router/Routes";
import App from '../App.tsx'
import {  useNavigate } from 'react-router-dom'

const navigate = useNavigate()

export default class UserStore {
  
  user = null;


  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (credentials) => {
    const user = await agent.Account.login(credentials);
    store.commonStore.setToken(user.token)
    runInAction(() => {
        this.user = user
    })
    navigate('/')
    store.modalStore.closeModal()
  };

  register = async (credentials) => {
    const user = await agent.Account.register(credentials);
    store.commonStore.setToken(user.token)
    runInAction(() => {
        this.user = user
    })
    router.navigate('/tracking')
    store.modalStore.closeModal()
  };

  logout =() => {
    store.commonStore.setToken(null)
    //localStorage.removeItem('jwt')
    this.user = null
    router.navigate('/')
    //console.log("here")
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  setImage = (image) => {
    if (this.user) this.user.image = image
  }

  setDisplayName = (displayName) => {
    if (this.user) this.user.displayName = displayName
  }
}
