const nodemailer = require('nodemailer')

class Email {
    async enviaEmail (usuario) {
        const contaTeste = await nodemailer.createTestAccount()
        const transportador = nodemailer.createTransport({ 
            host: "smtp.ethereal.email",
            tls: {
                rejectUnauthorized: false
            },
            auth: contaTeste
        })
        const info = await transportador.sendMail(this)
    
        console.log(nodemailer.getTestMessageUrl(info))
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco) {
        super()
        this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>'
        this.to = usuario.email
        this.subject = 'Verificação de e-mail'
        this.text = `Olá! Verifique seu e-mail aqui: ${endereco}`
        this.html = `<h1>Olá!</h1> <p>Verifique seu e-mail aqui:</p> <a href="${endereco}">${endereco}</a>`
    }
}



module.exports = { EmailVerificacao }