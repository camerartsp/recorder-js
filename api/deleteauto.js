const { list, del } = require('@vercel/blob');
require('dotenv').config();

// Função para deletar todos os blobs
async function deleteAllBlobs() {
  let cursor;

  do {
    const listResult = await list({
      cursor,
      limit: 1000,
      token: process.env.blob_service_token_READ_WRITE_TOKEN,
    });

    if (listResult.blobs.length > 0) {
      await del(listResult.blobs.map((blob) => blob.url), {
        token: process.env.blob_service_token_READ_WRITE_TOKEN,
      });
    }

    cursor = listResult.cursor;
  } while (cursor);

  console.log('Todos os blobs foram deletados');
}

module.exports = { deleteAllBlobs };