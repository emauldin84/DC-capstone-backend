const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

const Trips = require('../models/trips')
const Users = require('../models/users')
const Photos = require('../models/photos')

const TripsType = new GraphQLObjectType({
    name: 'Trips',
    fields:() => ({
        id: {type: GraphQLID},
        trip_location: {type: GraphQLString}, 
        trip_date: {type: GraphQLString},
        lat: {type: GraphQLString},
        lon: {type: GraphQLString},
        trip_details: {type: GraphQLString},
        trip_photos: {type: GraphQLString},
        users: {
            type: UsersType,
            resolve(parent, args){
                return Users.getByID(parent.user_id)
            }
        }
    }),
    
})

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields:() => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        userPassword: {type: GraphQLString},
        photoURL: {type: GraphQLString},
    })
})

const PhotosType = new GraphQLObjectType({
    name: 'Photos',
    fields:() => ({
        id: {type: GraphQLID},
        tripID: {type: GraphQLID},
        photoURL: {type: GraphQLString},
        trip: {
            type: TripsType,
            resolve(parent, args){
                return Trips.getByID(parent.tripID)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        trips: {
            type: TripsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                const results = Trips.getByID(args.id)
                console.log('results')
                return results
            
            } 
        },
        users: {
            type: UsersType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Users.getByID(args.id)
            }
        },
        photos: {
            type: PhotosType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Photos.getPhotoByID(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery})