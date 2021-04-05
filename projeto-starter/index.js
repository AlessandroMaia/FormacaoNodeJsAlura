const express = require('express');

const app = express();

app.listen(3000, () => console.log('bla bla'));

app.get('/atendimentos', (req, res) => res.send('Rota de atendimentossssdfbsdfbb'));