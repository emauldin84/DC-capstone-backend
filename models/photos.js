const db = require('./conn');  //requre the conn.js file

class Photos{
    constructor (id, trip_id, photo_url) {
        this.id = id;
        this.tripID = trip_id;
        this.photoURL = photo_url;
    }

    static getPhotoURLs(id) {
        console.log("id,", id);
        console.log("getPhotoURL from model is working")
        return db.any(`SELECT * from photos WHERE trip_id=$1`, [id]);
    }
    static getPhotoByID(id){
        return db.one(`
        SELECT * from photos where id=$1
        `, [id]);
    }

    static addPhotoURL(id,url) {
        return db.one(`INSERT into photos 
        (trip_id, photo_url)
        values ($1 , $2) returning id` , [id, url]);
    }

    deleteURL(id) {
        db.result(`DELETE from photos where id = $1`, [id])
        .catch((error) => {
            console.error(error);
        });
    }
}
module.exports = Photos;