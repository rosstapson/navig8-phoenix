export class SupplierFormValues {
    id = ""
    companyName = ""
    registrationNumber = ""
    vatNumber = ""
    websiteURL = ""
    phoneNumber = ""
    addressLine1 = ""
    addressLine2 = ""
    addressLine3 = ""
    addressLine4 = ""
    addressLine5 = ""
    addressLine6 = ""
    contactPersonTitle = ""
    contactPersonFirstName = ""
    contactPersonSurname = ""
    contactPersonPosition = ""
    contactPersonEmail = ""
    contactPersonPhoneNumber = ""
    contactPersonAlternativePhoneNumber = ""
    paymentTerms = ''
    contractDocumentURL = ''
    applicationDocumentURLs = []
    companyLogoURL = ''
  
  
    constructor(supplier) {
      if (supplier) {
        this.id = supplier.id
        this.companyName = supplier.companyName
        this.registrationNumber = supplier.registrationNumber
        this.vatNumber = supplier.vatNumber
        this.websiteURL = supplier.websiteURL
        this.phoneNumber = supplier.phoneNumber
        this.addressLine1 = supplier.addressLine1
        this.addressLine2 = supplier.addressLine2
        this.addressLine3 = supplier.addressLine3
        this.addressLine4 = supplier.addressLine4
        this.addressLine5 = supplier.addressLine5
        this.addressLine6 = supplier.addressLine6
        this.contactPersonTitle = supplier.contactPersonTitle
        this.contactPersonFirstName = supplier.contactPersonFirstName
        this.contactPersonSurname = supplier.contactPersonSurname
        this.contactPersonPosition = supplier.contactPersonPosition
        this.contactPersonEmail = supplier.contactPersonEmail
        this.contactPersonPhoneNumber = supplier.contactPersonPhoneNumber
        this.contactPersonAlternativePhoneNumber = supplier.contactPersonAlternativePhoneNumber
  
        this.paymentTerms = supplier.paymentTerms
        this.contractDocumentURL = supplier.contractDocumentURL
        this.applicationDocumentURLs = supplier.applicationDocumentURLs
        this.companyLogoURL = supplier.companyLogo
      }
    }
  }
  
  export class Supplier {
    constructor(init) {
      Object.assign(this, init)
    }
  }
  