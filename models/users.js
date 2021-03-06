const db = require('./conn');
const bcrypt = require('bcryptjs')

class User {
    constructor(id, first_name, last_name, email, user_password, photo_url ) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.userPassword = user_password;
        this.photoURL = photo_url;
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
        return db.one (`
        SELECT * from users
        WHERE id= $1
        `, [userId])
        .catch(err => console.log(err))
        .then(userData => {
            const userInstance = new User (
                userData.id, 
                userData.first_name, 
                userData.last_name, 
                userData.email, 
                userData.user_password,
                userData.photo_url
                )
            return userInstance;
        });
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
                userData.user_password,
                userData.photo_url
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
            password = '${this.userPassword}',
            first_name = '${this.firstName}',
            last_name = '${this.lastName}',
            photo_url = '${this.photoURL}',
            where id = ${this.id}`);
    }

    static updateUserByID(id, {firstName, lastName, email, photoURL}) {
        return db.any(`
        UPDATE users SET
            email = $3,
            first_name = $1,
            last_name = $2,
            photo_url = $4
            where id = $5
        `, [firstName, lastName, email, photoURL, id]
        );
    }

    static updateUserPasswordByID (id, password) {
        return db.any(`
        UPDATE users SET
            user_password = $1
            where id = $2
        `, [password, id]
        );
    }

    static updateUserPhoto (id, photo) {
        return db.any(`
        UPDATE users SET
            photo_url = $1
            where id = $2 returning photo_url
        `, [photo, id]
        );
    }

    static addNewUser(first_name, last_name, email, user_password) {
        return db.one(`
        INSERT into users(first_name, last_name, email, user_password)
        VALUES($1, $2, $3, $4) returning id`, [first_name, last_name, email, user_password]
        );
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