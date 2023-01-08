const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        tilte: String!
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    input BookInput {
        authors: [String]
        bookId: String!
        description: String
        image: String
        link: String
        tilte: String!
    }
    
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String, password: String!): Auth
        saveBook(bookData: bookInput!): User
        removeBook(boodId: ID!): User
    }
    `;
    
module.exports = typeDefs;