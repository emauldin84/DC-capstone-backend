const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

const Trip = require('../models/trips')

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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        trips: {
            type: TripsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                const results = Trip.getByID(args.id)
                console.log('results')
                return results
            
            } 
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery})