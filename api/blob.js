const { list, del } = require('@vercel/blob');

const listBlobs = async (req, res) => {
  try {
      const response = await list({ token: process.env.blob_service_token_READ_WRITE_TOKEN });

      return res.status(200).json(response.blobs); 
  } catch (error) {
      console.error('Erro ao listar blobs:', error);
      return res.status(500).json({ error: 'Erro ao listar blobs' });
  }
};

const deleteBlob = async (req, res) => {
    const { url } = req.params;

    try {
        await del(url, { token: process.env.blob_service_token_READ_WRITE_TOKEN });
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir blob:', error);
        return res.status(500).json({ error: 'Erro ao excluir blob' });
    }
};

module.exports = { listBlobs, deleteBlob }; 