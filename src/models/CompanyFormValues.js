export class CompanyFormValues {
  id = ""
  companyName = ""
  registrationNumber = ""
  email = ""
  vatNumber = ""
  websiteURL = ""
  phoneNumber = ""
  addressLine1 = ""
  addressLine2 = ""
  addressLine3 = ""
  addressLine4 = ""
  addressLine5 = ""
  addressLine6 = ""
  contactPerson = null
  bankDetails = null
  paymentTerms = ''
  contractDocumentURL = ''
  applicationDocumentURLs = []
  companyLogoURL = ''


  constructor(client) {
    if (client) {
      this.id = client.id
      this.companyName = client.companyName
      this.registrationNumber = client.registrationNumber
      this.email = client.email
      this.vatNumber = client.vatNumber
      this.websiteURL = client.websiteURL
      this.phoneNumber = client.phoneNumber
      this.addressLine1 = client.addressLine1
      this.addressLine2 = client.addressLine2
      this.addressLine3 = client.addressLine3
      this.addressLine4 = client.addressLine4
      this.addressLine5 = client.addressLine5
      this.addressLine6 = client.addressLine6
      this.contactPerson = client.contactPerson
      this.bankDetails = client.bankDetails
      this.paymentTerms = client.paymentTerms
      this.contractDocumentURL = client.contractDocumentURL
      this.applicationDocumentURLs = client.applicationDocumentURLs
      this.companyLogoURL = client.companyLogo
    }
  }
}

export class Company {
  constructor(init) {
    Object.assign(this, init)
  }
}
