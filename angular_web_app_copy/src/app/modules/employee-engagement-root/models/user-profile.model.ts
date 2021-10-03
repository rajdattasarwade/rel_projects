export class UserProfile {
    constructor(
        public userId: string,
        public employeeId: string,
        public name: string,
        public mobileNum: string,
        public emailId: string,
        public designationCode: string,
        public designationDesc: string,
        public locationDesc: string,
        public city: string,
        public state: string,
        public genderText: string,
        public group: string
    ) {}
}