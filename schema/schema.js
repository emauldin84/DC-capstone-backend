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
        // allows single field to return an array list
        trip_photos: {type: new GraphQLList(GraphQLString)},
        users: {
            type: UsersType,
            resolve(parent, args){
                return Users.getByID(parent.user_id)
            }
        }
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
        trip: {
            type: TripsType,
            args: {
                id: {type: GraphQLID},
                user_id:{type: GraphQLID}
        },
            resolve(parent, args){
                if(args.id) {
                    return Trips.getByID(args.id)
                } else if (args.user_id) {
                    return Trips.getTripsByUserId(args.user_id)
                }
            
            } 
        },
        trips: {
            // returns an array of objects
            type: new GraphQLList(TripsType),
            args: {
                user_id:{type: GraphQLID}
        },
            resolve(parent, args){
                return Trips.getTripsByUserId(args.user_id)
                }
        },
        user: {
            type: UsersType,
            args: {
                id: {type: GraphQLID},
                email: {type: GraphQLString}
            },
            resolve(parent, args){
                if(args.id){
                    return Users.getByID(args.id)
                } else if (args.email) {
                    return Users.getUserByEmail(args.email)
                }
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

const MutationQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UsersType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                userPassword: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const { firstName, lastName, email, userPassword } = args
                let newUser = Users.addNewUserAndReturn(firstName, lastName, email, userPassword)
                console.log('newUser', newUser)
                return newUser
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery
})


//######################################################
//graphiql syntax for adding new user

// mutation {
//     addUser(
//     firstName: "John",
//     lastName: "Smith",
//     email: "jsmith@email.com",
//     userPassword: "password"
//     ){
//       firstName
//       lastName
//       email
//       userPassword
//     }
//   }