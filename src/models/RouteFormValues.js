export class RouteFormValues {
    id = ''
    name = ''
    

    constructor(route) {
        if (route) {
            this.id = route.id
            this.name = route.name
            
            
        }
    }
}

export class Route {
    constructor(init) {
        Object.assign(this, init)
    }
}