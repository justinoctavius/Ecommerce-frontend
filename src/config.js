require('dotenv')
const env = {
    API: process.env.BACKEND || 'http://localhost:5000/'
}

module.exports = env