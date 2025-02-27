export class SupplierTypeFormValues {
    id = ''
    text = ''
    value = ''

    constructor(supplierType) {
        if (supplierType) {
            this.id = supplierType.id
            this.text = supplierType.text
            this.value = supplierType.value
            
            
        }
    }
}

export class SupplierType {
    constructor(init) {
        Object.assign(this, init)
    }
}