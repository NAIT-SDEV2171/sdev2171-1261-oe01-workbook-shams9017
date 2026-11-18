const { readDb } = require('../utils/db');
async function getSongs(_req, res, next) {
  try { res.json({ songs: (await readDb()).songs }); }
  catch (error) { next(error); }
}
async function getSongById(req, res, next) {
  try {
    const song = (await readDb()).songs.find((item) => item.id === req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json({ song });
  } catch (error) { next(error); }
}
module.exports = { getSongs, getSongById };
