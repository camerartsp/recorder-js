const express = require('express');
const { upload, uploadBlob } = require('./api/upload');
const { listBlobs, deleteBlob } = require('./api/blob');
const { deleteAllBlobs } = require('./api/deleteauto');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/upload', upload.single('file'), uploadBlob);
app.get('/api/blob', listBlobs);
app.delete('/api/blob/:url', deleteBlob);
app.use(express.static('public'));

// Alterar o método para POST
app.post('/api/delete-all-blobs', async (req, res) => {
    try {
        await deleteAllBlobs();
        res.status(200).send('Todos os blobs foram deletados');
    } catch (error) {
        console.error('Erro ao deletar blobs:', error);
        res.status(500).send('Erro ao deletar blobs');
    }
});

app.use((err, req, res, next) => {
    if (err.name === 'NotAllowedError') {
        res.status(403).json({ error: 'Permissão negada' });
    } else {
        next(err);
    }
});

module.exports = app;