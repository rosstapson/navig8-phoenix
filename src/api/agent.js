import axios from 'axios'
import { toast } from 'react-toastify'
//import { router } from '../router/Routes'
import { store } from '../stores/store.js'

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'
//axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(async response => {
        //if (import.meta.env.DEV) await sleep(100)
        
        return response
}, (error) => {
    console.log(error)
    //const {data, status, config} = error.response
    //console.log(status)
    switch (status) {
        case 400:

            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors,'id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modelStateErrors = []
                for(const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                
                throw modelStateErrors.flat()
            }
            else {
                toast.error(data)
            }
            break;
        case 401: 
            toast.error('unauthorised')
            break
        case 403: 
            toast.error('forbidden')
            break
        case 404: 
            router.navigate('/not-found')
            break
        case 500: 
            //toast.error('server error')
            store.commonStore.setServerError(data)
            router.navigate('/server-error')
            break
        
    }
    return Promise.reject(error)
})

const responseBody = response => response.data

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    postForm: (url, body, headers) => axios.post(url, body, headers).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => requests.get('/activities'),
    details: (id) => requests.get(`/activities/${id}`),
    create: (activity) => requests.post('/activities', activity),
    update: (activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id) => requests.delete(`/activities/${id}`),
    attend: (id) => requests.post(`/activities/${id}/attend`, {})
}

const Orders = {
    list: () => requests.get('/orders'),
    details: (id) => requests.get(`/orders/${id}`),
    create: (order) => requests.post('/orders', order),
    update: (order) => requests.put(`/orders/${order.id}`, order),
    delete: (id) => requests.delete(`/orders/${id}`)
}

const Clients = {
    list: () => requests.get('/companies'),
    details: (id) => requests.get(`/clients/${id}`),
    create: (activity) => requests.post('/clients', activity),
    update: (activity) => requests.put(`/clients/${activity.id}`, activity),
    delete: (id) => requests.delete(`/clients/${id}`),
    
}

const Assets = {
    list: () => requests.get('/Assets'),
    details: (id) => requests.get(`/Assets/${id}`),
    create: (activity) => requests.post('/Assets', activity),
    update: (activity) => requests.put(`/Assets/${activity.id}`, activity),
    delete: (id) => requests.delete(`/Assets/${id}`),
    
}


const Locations = {
    list: () => requests.get('/locations'),
    details: (id) => requests.get(`/locations/${id}`),
    create: (activity) => requests.post('/locations', activity),
    update: (activity) => requests.put(`/locations/${activity.id}`, activity),
    delete: (id) => requests.delete(`/locations/${id}`),
}


const Routes = {
    list: () => requests.get('/routes'),
    details: (id) => requests.get(`/routes/${id}`),
    create: (activity) => requests.post('/routes', activity),
    update: (activity) => requests.put(`/routes/${activity.id}`, activity),
    delete: (id) => requests.delete(`/routes/${id}`),
    routeByLatLng: (routeDTO) => requests.post('/routes/routebylatlng', routeDTO)
}

const LocationTypes = {
    list: () => requests.get('/locations/types'),
}

const Account = {
    current: () => requests.get('/account'),
    login: (user) => requests.post('/account/login', user),
    register: (user) => requests.post('/account/register', user)
}

const Profiles = {
    get: (username) => requests.get(`/profiles/${username}`),
    update: (profile) => requests.put(`/profiles`, profile),
    uploadPhoto: (file) => {
        let formData = new FormData()
        formData.append('File', file)
        return axios.post('photos', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    setMainPhoto: (id) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id) => requests.delete(`/photos/${id}`),
    
}

const Files = {
    //upload: (formData) => requests.postForm('/mediaasset', formData, {'Content-Type': 'multipart/form-data'}),
    uploadFile: (file) => {
        let formData = new FormData()
        formData.append('File', file)
        return axios.post('mediaasset', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    uploadFiles: (files) => {
        let formData = new FormData()
        files.forEach(file => formData.append('Files', file))
        return axios.post('mediaasset/multi', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
}

const AssetTypes = {
    list: () => requests.get('/assetTypes'),
    details: (id) => requests.get(`/assetTypes/${id}`),
    create: (activity) => requests.post('/assetTypes', activity),
    update: (activity) => requests.put(`/assetTypes/${activity.id}`, activity),
    delete: (id) => requests.delete(`/assetTypes/${id}`),
    
}


const Suppliers = {
    list: () => requests.get('/companies'),
    details: (id) => requests.get(`/suppliers/${id}`),
    create: (activity) => requests.post('/suppliers', activity),
    update: (activity) => requests.put(`/suppliers/${activity.id}`, activity),
    delete: (id) => requests.delete(`/suppliers/${id}`),
    
}

const SupplierTypes = {
    list: () => requests.get('/supplierTypes'),
    details: (id) => requests.get(`/supplierTypes/${id}`),
    create: (activity) => requests.post('/supplierTypes', activity),
    update: (activity) => requests.put(`/supplierTypes/${activity.id}`, activity),
    delete: (id) => requests.delete(`/supplierTypes/${id}`),
    
}

const Companies = {
    list: () => requests.get('/companies'),
    details: (id) => requests.get(`/companies/${id}`),
    create: (activity) => requests.post('/companies', activity),
    update: (activity) => requests.put(`/companies/${activity.id}`, activity),
    delete: (id) => requests.delete(`/companies/${id}`),
}

const Drivers = {
    list: () => requests.get('/drivers'),
    details: (id) => requests.get(`/drivers/${id}`),
    create: (activity) => requests.post('/drivers', activity),
    update: (activity) => requests.put(`/drivers/${activity.id}`, activity),
    delete: (id) => requests.delete(`/drivers/${id}`),
}

const Ports = {
    list: () => requests.get('/ports'),
    details: (id) => requests.get(`/ports/${id}`),
    create: (activity) => requests.post('/ports', activity),
    update: (activity) => requests.put(`/ports/${activity.id}`, activity),
    delete: (id) => requests.delete(`/ports/${id}`),
    
}


const agent = {
    Activities,
    Orders,
    Account,
    Clients,
    Profiles,
    Files,
    Assets,
    AssetTypes,
    Suppliers,
    Companies,
    Locations,
    LocationTypes,
    Routes,
    Ports,
    Drivers,
    SupplierTypes
}

export default agent