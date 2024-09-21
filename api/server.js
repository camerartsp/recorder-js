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
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Mantém o formato de vídeo original (por exemplo, .webm)
        cb(null, `file-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

// Endpoint para listar arquivos
app.get('/api/files', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar arquivos.' });
        }
        res.json(files);
    });
});

// Endpoint para upload de arquivos
app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log('Arquivo de vídeo recebido:', req.file.path);
    res.json({ message: 'Vídeo carregado com sucesso!', filePath: req.file.path });
});

// Endpoint para deletar arquivos
app.delete('/api/delete/:filename', (req, res) => {
    const filePath = path.join(uploadsDir, req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir arquivo.' });
        }
        res.json({ message: 'Arquivo excluído com sucesso!' });
    });
});

// Servir arquivos estáticos
app.use('/uploads', express.static(uploadsDir));

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