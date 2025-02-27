export class LocationFormValues {
    id = ''
    name = ''
    

    constructor(location) {
        if (location) {
            this.id = location.id
            this.name = location.name
            
            
        }
    }
}

export class Location {
    constructor(init) {
        Object.assign(this, init)
    }
}