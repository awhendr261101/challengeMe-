import { dbconnection as db } from "../config";

class User {
    constructor(userName, userSurname, userAge, userEmail, userPassword) {
        this.userName = userName;
        this.userSurname = userSurname;
        this.userAge = userAge;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    addNewUser() {
        db.query(`
            INTO Users (userName, userSurname, userAge, userEmail, userPwd)  
            VALUES ('${this.userName}', '${this.userName}', ${this.userAge}, '${this.userEmail}', '${this.userPassword}');
            `)
    }

    display() {
        console.log(`Name: ${this.userName}, Surname: ${this.userSurname}, Age: ${this.userAge}, Email: ${this.userEmail}`);
    }

}

export {
    User
}