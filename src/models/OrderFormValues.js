export class OrderFormValues {
    id = ''
    title = ''
    

    constructor(order) {
        if (order) {
            this.id = order.id
            this.title = order.title
            
            
        }
    }
}

export class Order {
    constructor(init) {
        Object.assign(this, init)
    }
}