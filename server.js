require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const apiKey = process.env.OPENWEATHER_API_KEY;

app.use(express.static(path.join(__dirname)));


app.get('/api/weather', async (req, res) => {
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ cod: 400, message: 'Cidade não informada' });
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

        const result = await fetch(apiUrl);
        const json = await result.json();

        res.status(result.status).json(json);
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        res.status(500).json({ cod: 500, message: 'Erro interno ao buscar o clima' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});