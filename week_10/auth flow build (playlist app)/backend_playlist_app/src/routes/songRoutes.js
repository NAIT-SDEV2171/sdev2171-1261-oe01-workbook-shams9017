const express = require('express');
const songs = require('../controllers/songController');
const router = express.Router();
// the catalogue is shared; selecting a song changes a playlist, never the catalogue.
router.get('/', songs.getSongs);
router.get('/:id', songs.getSongById);
router.all(['/', '/:id'], (_req, res) => res.set('Allow', 'GET, HEAD').status(405).json({ error: 'The song catalogue is read-only' }));
module.exports = router;
