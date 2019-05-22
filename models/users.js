const db = require('./conn');
const bcrypt = require('bcryptjs')

class User {
    constructor(id, first_name, last_name, email, user_password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.userPassword = user_password;
    }

    static getAllUsers() {
        return db.any (`
        SELECT * from users
        `)
    }

    static emailAlreadyExists(email){
        return db.any(`
        SELECT * FROM users
        WHERE email=$1
        `, [email]).then(data => {
            // For whatever reason, you can't return from this function within the IF/ELSE?
            let boolVal = false;
            if (data.length > 0){
                boolVal = true;
            }
            else{
                boolVal = false;
            }
            return boolVal;
        });
    }

    static getUserById(userId) {
        console.log(`User ID: ${userId}`)
        return db.one (`
        SELECT * from users
        WHERE id=${userId}
        `)
        .then(userData => {
            const userInstance = new User (
                userData.id, 
                userData.first_name, 
                userData.last_name, 
                userData.email, 
                userData.user_password
                )
            return userInstance;
        })
        .catch(err => err)
    }

    static getUserByEmail(email) {
        return db.one(`
        SELECT * FROM users
        WHERE email=$1
        `, [email])
        .then(userData => {
            // console.log(userData);
            const userInstance = new User (
                userData.id, 
                userData.first_name, 
                userData.last_name, 
                userData.email, 
                userData.user_password
                )
            return userInstance;
        })
        .catch(err => console.log((err)))
    }

    save() {
        //db.result - gives you the number of rows affected
        return db.result(`
        UPDATE users SET 
            email = '${this.email}',
            password = '${this.user_password}',
            first_name = '${this.first_name}',
            last_name = '${this.last_name}'
            where id = ${this.id}`);
    }

    static addNewUser(first_name, last_name, email, user_password) {
        return db.one(`
        INSERT into users(first_name, last_name, email, user_password)
        VALUES($1, $2, $3, $4) returning id`, [first_name, last_name, email, user_password]
        )
    }

    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);  //10 is my salt
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);  //10 is my salt
    }

    checkPassword(password, dbPassword) {
        console.log('password', password, 'dbPassword', dbPassword)
        return bcrypt.compareSync(password, dbPassword);
    }
}



module.exports = User;