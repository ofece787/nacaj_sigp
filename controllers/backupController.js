const fs = require('fs')
const { Pool } = require('pg')
const { to: copyTo } = require('pg-copy-streams')
const { from: copyFrom } = require('pg-copy-streams')
const { connectionString } = require('pg/lib/defaults')
const multer = require('multer')

const pool = new Pool({ connectionString: 'postgresql://postgres:c0staevarist0@localhost:5432/TestDb'})
const upload = multer()

module.exports.exportData = async (req, res) => {
  let client;

  try {
    client = await pool.connect();

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="database_export.csv"')

    res.write('\ufeff')

    const dbStream = client.query(copyTo("COPY noticias TO STDOUT WITH CSV HEADER DELIMITER ',' ENCODING 'UTF8'"))
    dbStream.pipe(res)

    dbStream.on('error', (err) => {
      console.error('Stream failed', err)
      if(!res.headersSent) {
        res.status(500).send('Database streaming failed')
      }
    })
  } catch (error) {
    console.error('Connection error', error)
  } finally {
    res.on('finish', () => {
      if(client) client.release()
    })
  }

  
}

module.exports.importData = async (req, res) => {

  let client;

  try {
    client = await pool.connect();

    const dbStream = client.query(copyFrom("COPY noticias FROM STDIN WITH CSV HEADER"))

    const { Readable } = require('stream')
    const fileStream = Readable.from(req.file.buffer)

    fileStream.pipe(dbStream);

    dbStream.on('finish', () => {
      res.status(200).json({ message: 'Data imported successfully!' });
      client.release();
    })
    dbStream.on('error', (err) => {
      console.error('Database copy error:', err);
      res.status(500).json({ error: 'Database import failed.', details: err.message });
      client.release();
    });
  } catch (error) {
    console.error('Connection error:', error);
    if (client) client.release();
    res.status(500).send('Server Error');
  }
}   