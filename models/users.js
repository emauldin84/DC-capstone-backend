const db = require('./conn');
const bcrypt = require('bcryptjs')

class User {
    constructor(id, first_name, last_name, email, user_password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.user_password = user_password;
    }

    static getAllUsers() {
        return db.any (`
        SELECT * from users
        `)
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
        .catch(err => err)
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
        return db.result(`
        INSERT into users(first_name, last_name, email, user_password)
        VALUES($1, $2, $3, $4)`, [first_name, last_name, email, user_password]
        )
    }

    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);  //10 is my salt
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);  //10 is my salt
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}



module.exports = User;