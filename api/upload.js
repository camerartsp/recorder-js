const { put } = require('@vercel/blob');
const multer = require('multer');
require('dotenv').config();

const upload = multer(); 

const uploadBlob = async (req, res) => {
    const file = req.file; 
    try {
        const blob = await put(file.originalname, file.buffer, {
            access: 'public',
            multipart: true, 
            token: process.env.blob_service_token_READ_WRITE_TOKEN 
        });
        return res.json(blob);
    } catch (error) {
        console.error('Erro ao fazer upload do blob:', error);
        return res.status(500).json({ error: 'Erro ao fazer upload do blob' });
    }
};

module.exports = { upload, uploadBlob };