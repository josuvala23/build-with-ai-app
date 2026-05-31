const express = require('express');
const path = require('path');
const AIRequestHandler = require('./classes/AIRequestHandler');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/submit', (req, res) => {

    const projectIdea = req.body.projectIdea;

    const words = projectIdea.trim().split(/\s+/);
    const wordCount = words.length;

    // estructura de control
    if (wordCount < 10) {
        return res.send(`
            <h1>Error</h1>
            <p>La propuesta debe tener mínimamente 10 palabras.</p>
            <a href="/">Volver</a>
        `);
    }

    // uso de clase
    const requestHandler = new AIRequestHandler(projectIdea);

    const preparedData = requestHandler.prepareRequest();

    res.send(`
        <h1>Datos procesados correctamente</h1>
        <p><strong>Palabras:</strong> ${wordCount}</p>
        <p><strong>Texto limpio:</strong> ${preparedData.cleanText}</p>
        <p>Listos para Gemini API</p>
        <a href="/">Volver</a>
    `);
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;