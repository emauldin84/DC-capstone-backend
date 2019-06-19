const db = require('./conn');  //requre the conn.js file

class Photos{
    constructor (id, trip_id, photo_url) {
        this.id = id;
        this.tripID = trip_id;
        this.photoURL = photo_url;
    }

    static getPhotoByURL(url) {
        console.log("url,", url);
        return db.one(`SELECT * from photos WHERE photo_url=$1`, [url]);
    }
    static getPhotoURLs(id) {
        console.log("id,", id);
        console.log("getPhotoURL from model is working")
        return db.any(`SELECT * from photos WHERE trip_id=$1`, [id]);
    }
    static getPhotoByID(id){
        return db.one(`
        SELECT * from photos where id=$1
        `, [id])
        .then(r => {
            const photoData = new Photos(
                r.id,
                r.trip_id,
                r.photo_url
            )
            console.log(photoData)
            return photoData
        })
    }

    static addPhotoURL(id,url) {
        return db.one(`INSERT into photos 
        (trip_id, photo_url)
        values ($1 , $2) returning id` , [id, url]);
    }



    static deleteURL(id) {
        db.result(`DELETE from photos where id = $1`, [id])
        .catch((error) => {
            console.error(error);
        })
    }

    static deletePhotoByTripId(tripId) {
        db.result(`DELETE from photos where trip_id = $1`, [tripId])
        .catch((error) => {
            console.error(error);
        })
    }

    static deletePhotoByURL(url) {
        db.result(`DELETE from photos where photo_url = $1`, [url])
        .catch((error) => {
            console.error(error);
        });
    }

}
module.exports = Photos;