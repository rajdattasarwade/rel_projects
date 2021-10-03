class UserData {
    constructor(
        public userId: string,
        public managerId: string,
        public mobileNo: string,
        public firstName: string,
        public lastNamepublic: string ,
        public corporateNopublic: string ,
        public emailpublic: string ,
        public dateOfBirthpublic: string ,
        public buGrouppublic: string ,
        public dateOfJoiningpublic: any ,
        public marriageDate: any
    ){}
}


export class UserEvents {

    constructor(public birthdays: UserData[], public workAnniversay: UserData[], public marriageAnniversary: UserData[]){}
}