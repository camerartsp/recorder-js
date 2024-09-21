const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Caminho para a pasta 'uploads'
const uploadsDir = path.join(__dirname, '../uploads');

// Configuração do Multer para armazenamento de arquivos de vídeo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `file-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    console.log('Arquivo de vídeo recebido:', req.file.path);
    res.json({ message: 'Vídeo carregado com sucesso!', filePath: req.file.path });
});

module.exports = router;