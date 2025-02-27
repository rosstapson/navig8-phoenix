export class AssetFormValues {
    
        id = ''
        imageURL = ''
        assetType = {}
        assetSubClass = {}
        branch = ''
        fleetNumber = ''
        region = ''
        category = ''
        division =''
        description = ''
        type = ''
        make = ''
        model = ''
        colour = ''
        horsePower = ''
        gvmKg = ''
        tareKg = ''
        tracking = false
        trackingCompany = ''
        imei = ''
        hydraulicsPTOFitted = false
        numberPlate = ''
        vinNumber = ''
        chassisNumber = ''
        financeValue = ''
        financed = false
        financeBank = ''
        leasePeriod = ''
        purchaseDate = null
        interest = ''
        depreciationPeriod = ''
        status = ''
        accessoriesAdded = ''
        odometer = ''
        serviceIntervals = ''
        lastServiceOdometer = ''
        lastServiceDate = null

        // documents
        logbook = {}
        license = {}
        crossBorderPermit = {}
        roadworthy = {}

      

    constructor(Asset) {
        if (Asset) {
            this.id = Asset.id
            //etc
            
        }
    }
}

export class Asset {
    constructor(init) {
        Object.assign(this, init)
    }
}