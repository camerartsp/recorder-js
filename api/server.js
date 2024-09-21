const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Caminho para a pasta 'uploads'
const uploadsDir = path.join(__dirname, '../uploads');

// Verifica se a pasta 'uploads' existe. Se não, cria automaticamente.
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Pasta "uploads" criada automaticamente.');
} else {
    console.log('A pasta "uploads" já existe.');
}

// Configuração do Multer para armazenamento de arquivos de vídeo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Mantém o formato de vídeo original (por exemplo, .webm)
        cb(null, `file-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Importando rotas
const deleteRoute = require('./delete');
const uploadRoute = require('./upload');
const filesRoute = require('./file');

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(uploadsDir));

// Usando as rotas
app.use('/api/delete', deleteRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/files', filesRoute);

// Middleware global para lidar com erros de permissão
app.use((err, req, res, next) => {
    if (err.name === 'NotAllowedError') {
        res.status(403).json({ error: 'Permissão negada' });
    } else {
        next(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});