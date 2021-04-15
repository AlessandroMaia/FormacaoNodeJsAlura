const Services = require('../services/PostsServices')
const PostsServices = new Services()

class PostController {
    static async getAll (req, res) {
        try {
            const allPosts = await PostsServices.getAllService()
            return res.status(200).send(allPosts)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async create (req, res) {
        try {
            const post =  await PostsServices.createService(req.body)
            return res.status(201).send(post)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}

module.exports = PostController