const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Caminho para a pasta 'uploads'
const uploadsDir = path.join(__dirname, 'uploads');

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
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Mantém o formato de vídeo original (por exemplo, .webm)
        cb(null, `file-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Pasta para arquivos estáticos

// Rota para upload do vídeo gravado
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Arquivo de vídeo recebido:', req.file.path);
    res.json({ message: 'Vídeo carregado com sucesso!', filePath: req.file.path });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});