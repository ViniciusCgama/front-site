const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    const nome = req.body.nome;

    if (!file) {
        return res.status(400).json({ error: 'Por favor, envie uma imagem.' });
    }

    const foto_url = `${req.protocol}://${req.get('host')}/${file.path}`;

    res.json({
        nome,
        foto_url
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});