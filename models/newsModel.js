const pool = require('../config/db.js')



module.exports.getAllNews = async () => {
  const result = await pool.query("SELECT * FROM noticias order by id desc");
  return result.rows;
};
module.exports.getNewsById = async (id) => {
  const result = await pool.query("SELECT * FROM noticias where id = $1", [id]);
  return result.rows[0];

};
module.exports.createNews = async (title, description, url) => {
  const result = await pool.query("INSERT INTO noticias (title, description, url) values ($1, $2, $3) RETURNING *", [title, description, url]);
  return result.rows[0];
};
module.exports.updateNews = async (id, title, description) => {
  const result = await pool.query("UPDATE noticias SET title=$1, description=$2 where id=$3 RETURNING *", [title, description, id]);
  return result.rows[0];
};
module.exports.deleteNews = async (id) => {
  const result = await pool.query("DELETE FROM noticias where id=$1 RETURNING *", [id]);
  return result.rows[0]
};