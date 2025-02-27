export class DriverFormValues {
    
        id = ''
        

    constructor(driver) {
        if (driver) {
            this.id = driver.id;
        this.employeeNumber = driver.employeeNumber;
        this.employmentDate = driver.employmentDate;
        this.contactDetails = driver.contactDetails;
        this.nextOfKin = driver.nextOfKin;
        this.nextOfKinRelationToDriver = driver.nextOfKinRelationToDriver;
        this.identityDocument = driver.identityDocument;
        this.license = driver.license;
        this.driverPicture = driver.driverPicture;
        this.pdpDocument = driver.pdpDocument;
        this.pdpNumber = driver.pdpNumber;
        this.contract = driver.contract;
        this.documents = driver.documents;
            
        }
    }
}

export class Driver {
    constructor(init) {
        Object.assign(this, init)
    }
}

export class ContactDetails {
    constructor(id, title, position, firstName, surname, email, phoneNumber, alternativePhoneNumber) {
        this.id = id;
        this.title = title;
        this.position = position;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.alternativePhoneNumber = alternativePhoneNumber;
    }
}