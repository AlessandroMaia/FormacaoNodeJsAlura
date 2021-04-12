const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const port = 3000

app.get('/', (requisicao, resposta) => resposta
    .status(200)
    .send({
        messagem: 'Boas vindas a API'
    }))

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`))