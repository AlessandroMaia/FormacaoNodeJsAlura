const express = require('express')
const routes = require('./routes')
const app = express()
const { AuthService } = require('../api/services')

const port = 3000

routes(app)
app.listen(port, () => console.log(`O servidor está na porta ${port}`))