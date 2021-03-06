const db = require('./conn');

class Trip {
    constructor(id, trip_location, trip_date, lat, lon, trip_details, trip_photos, user_id) {
        this.id = id;
        this.trip_location = trip_location;
        this.trip_date = trip_date;
        this.lat = lat;
        this.lon = lon;
        this.trip_details = trip_details;
        this.trip_photos = trip_photos;
        this.user_id = user_id;
    }

    static getTripById(tripId) {
        return db.one(`
        SELECT * from trips
        WHERE id = ${tripId};
        `)
        .then(trip => {
            return( new Trip(
                trip.id,
                trip.trip_location,
                trip.trip_date,
                trip.lat,
                trip.lon,
                trip.trip_details,
                trip.trip_photos,
                trip.user_id,
            ));
        })
        .catch(err => err)
    }
    static getTripsByUserId(user_id) {
        return db.any(`
        SELECT * from trips
        WHERE user_id = ${user_id};
        `)
        .then(tripsData => {
            const tripArray = tripsData.map(trip => {
                return( new Trip(
                    trip.id,
                    trip.trip_location,
                    trip.trip_date,
                    trip.lat,
                    trip.lon,
                    trip.trip_details,
                    trip.trip_photos,
                    trip.user_id,
                ));
            });
            return tripArray;
        })
        .catch(err => err)
    }

    static getAllTrips() {
        return db.any(`
        SELECT * from trips
        ORDER BY trip_date DESC;
        `)
    }

    static addTripPhotoURL(tripID, photoUrlArray){
        return db.one(`
            SELECT trip_photos from trips where id=$1
        `,[tripID])
        .then(({trip_photos}) => trip_photos)
        .then((dbPhotos) => {
            let updatedList;
            if(!dbPhotos){
                updatedList = [...photoUrlArray];
            }
            else{updatedList = [...dbPhotos, ...photoUrlArray];}
            return db.any(`
            UPDATE trips SET trip_photos=$2 where id = $1 returning trip_photos
            `, [tripID, updatedList]);
        });
    }
    static removeTripPhotoURL(tripID, offendingURL){
        return db.one(`
            SELECT trip_photos from trips where id=$1
        `,[tripID])
        .then(({trip_photos}) => trip_photos)
        .then(dbPhotos => {
            const photoUrlArray = dbPhotos.filter(url => url!==offendingURL);
            return db.any(`
            UPDATE trips SET trip_photos=$2 where id = $1 returning trip_photos
            `, [tripID, photoUrlArray]);
        });
    }

    static addNewTrip(trip_location, trip_date, lat, lon, trip_details, user_id) {
        console.log(`Adding a trip to ${trip_location}`);
        return db.one(`
        INSERT INTO trips (trip_location, trip_date, lat, lon, trip_details, user_id)
        VALUES ($1, $2, $3, $4, $5, $6) returning id
        `, [trip_location, trip_date, lat, lon, trip_details, user_id]
        );
    }

    static editTrip(location, date, lat, lon, details, tripId) {
        console.log("tripId: ", tripId);
        return db.result(`
        UPDATE trips
        SET trip_location = $1, trip_date = $2, lat = $3, lon = $4, trip_details = $5
        WHERE id = $6
        `, [location, date, lat, lon, details, tripId]);
    }

    static deleteTrip(tripId) {
        return db.result(`
        DELETE from trips
        WHERE id = ${tripId};
        `)
    }
}

module.exports = Trip;