require('dotenv').config();

module.exports = {
    mongoURI: `mongodb://localhost:27017/${process.env.DB}`,
    cypher: process.env.CYPHER
};