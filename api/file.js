const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho para a pasta 'uploads'
const uploadsDir = path.join(__dirname, '../uploads');

router.get('/', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar arquivos.' });
        }
        res.json(files);
    });
});

module.exports = router;