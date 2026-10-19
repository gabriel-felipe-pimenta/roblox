const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const site_apuracao = "https://resultados.tse.jus.br/oficial/app/index.html#/eleicao/6258/uf/br/cargo/1/vis/nominal/resultados";

app.get("/api/votos", async (rew, res) => {
    try {
        const { data: html } = await axios.get(site_apuracao);
        const $ = cheerio.load(html);
        const porcentagens = $('.cartao-candidato__percentual');
        const voto1 = porcentagens.eq(0).text().trim();
        const voto2 = porcentagens.eq(1).text().trim();
        res.json({
            lula: voto1,
            bolsonaro: voto2
        })
    }
    catch (erro) {
        res.status(500).json({ error: 'Erro ao buscar os dados de votação.' });
    }
})
// Altere a linha da porta para aceitar a porta do Render:
const PORT = process.env.PORT || 3000;

// Certifique-se de que o app.listen está usando a constante PORT:
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));