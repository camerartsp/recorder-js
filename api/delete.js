const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho para a pasta 'uploads'
const uploadsDir = path.join(__dirname, '../uploads');

router.delete('/:filename', (req, res) => {
    const filePath = path.join(uploadsDir, req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir arquivo.' });
        }
        res.json({ message: 'Arquivo excluído com sucesso!' });
    });
});

module.exports = router;