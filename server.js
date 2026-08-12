// server.js

// Lê o arquivo .env e joga o conteúdo dele em process.env
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// process.env.PORT vem do .env; se não existir, usamos 3000 como padrão
const port = process.env.PORT || 3000;

// A chave fica só aqui, dentro do servidor. Nunca é enviada ao navegador.
const apiKey = process.env.OPENWEATHER_API_KEY;

// Isso diz ao Express: "sirva os arquivos estáticos (html, css, js, imagens)
// que estão nesta mesma pasta do projeto". É assim que o navegador vai
// conseguir carregar seu index.html, style.css etc.
app.use(express.static(path.join(__dirname)));

// Aqui criamos uma rota nova: quando o navegador pedir algo tipo
// /api/weather?city=São Paulo, esta função é executada.
app.get('/api/weather', async (req, res) => {
    const cityName = req.query.city; // pega o valor de "city" da URL

    if (!cityName) {
        return res.status(400).json({ cod: 400, message: 'Cidade não informada' });
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

        // fetch já vem embutido no Node (a partir da versão 18), sem precisar
        // instalar nenhuma biblioteca extra pra isso
        const result = await fetch(apiUrl);
        const json = await result.json();

        // repassamos pro navegador exatamente o que a OpenWeather nos devolveu
        res.status(result.status).json(json);
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        res.status(500).json({ cod: 500, message: 'Erro interno ao buscar o clima' });
    }
});

// Coloca o servidor pra escutar (rodar) na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});