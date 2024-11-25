const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para permitir o envio de dados via POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/padariaDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch((err) => console.error('Erro ao conectar com o MongoDB:', err));

// Definir o schema do usuário
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Criar o modelo
const User = mongoose.model('User', userSchema);

// Rota para cadastro de usuário
app.post('/cadastro', (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username,
        email,
        password
    });

    newUser.save()
        .then(() => res.status(201).send('Usuário cadastrado com sucesso!'))
        .catch((err) => res.status(400).send('Erro ao cadastrar usuário: ' + err));
});

// Rota inicial
app.get('/', (req, res) => {
    res.send('Servidor em execução!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
