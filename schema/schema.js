const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

const Trips = require('../models/trips')
const Users = require('../models/users')

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
        user_id: {type: GraphQLID},
    })
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
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery})