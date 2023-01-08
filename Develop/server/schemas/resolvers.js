const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if ( context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signTiken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne([ email ]);
            
            if (!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.iscorrectPassword(password);

            if (!correctPw){
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = singToken(user)
            return { token, user };
        },
        saveBook: async ( parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { saveBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('you need to be logged in! ');
        },
    },
}

module.exports = resolvers;