const database = require('../models')
const Services = require('./Services')

class PostsServices extends Services {
    constructor () {
        super('posts')
    }
}

module.exports = PostsServices