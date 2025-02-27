import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.js";
import { store } from "./store.js";

export default class ProfileStore {
  profile = null;
  loadingProfile = false;
  uploading = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction((this.loadingProfile = false));
    }
  };

  updateProfile = async (profile) => {
    console.log("adsf")
    this.loadingProfile = true;
    try {
      const result = await agent.Profiles.update(profile);
      runInAction(() => {
        this.profile = result;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction((this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction((this.uploading = false));
    }
  };

  setMainPhoto = async (photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          let thingFish = this.profile.photos.find((p) => p.isMain);
          if (thingFish) {
            thingFish.isMain = false;
          }
          this.profile.photos.find((p) => p.id === photo.id).isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.log(error);
      });
    }
  };

  deletePhoto = async (photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.log(error);
      });
    }
  };
}
