
export interface Company {
    id: string,
    companyName: string,
    email: string,
    registrationNumber: string,
    vatNumber: string,
    websiteURL: string,
    phoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    addressLine4: string,
    addressLine5: string,
    addressLine6: string,
    contactPerson: {
      
      title: string,
      position: string,
      firstName: string,
      surname: string,
      displayName: string,
      email: string,
      phoneNumber: string,
      alternativePhoneNumber: string,
      addressLine1: string,
      addressLine2: string,
      addressLine3: string,
      addressLine4: string,
      addressLine5: string,
      addressLine6: string
    },
    bankDetails: {
      bankName: string,
      accountType: string,
      accountNumber: string,
      branchName: string,
      branchNumber: string,
      reference: string
    },
    paymentTerms: string,
    companyLogoURL: string,
    contractDocumentURL: string,
    applicationDocumentURLs: [
      string
    ],
    createdDate: Date | string,
    clients: [],
    suppliers: [],
    locations: [],
    comments: []
  }