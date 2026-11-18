const { randomUUID } = require('crypto');
const { readDb, updateDb } = require('../utils/db');
function fail(status, message) { const error = new Error(message); error.status = status; return error; }
function owned(db, req) {
  const playlist = db.playlists.find((item) => item.id === req.params.id && item.userId === req.auth.userId);
  if (!playlist) throw fail(404, 'Playlist not found');
  return playlist;
}
function validate(body, db) {
  if (!body || typeof body.title !== 'string' || !body.title.trim()) throw fail(400, 'A playlist title is required');
  if (body.goal !== undefined && typeof body.goal !== 'string') throw fail(400, 'Listening goal must be text');
  if (!Array.isArray(body.songIds) || !body.songIds.length) throw fail(400, 'Select at least one song');
  if (body.songIds.some((id) => typeof id !== 'string' || !db.songs.some((song) => song.id === id))) throw fail(400, 'Select songs from the catalogue');
  if (new Set(body.songIds).size !== body.songIds.length) throw fail(400, 'A song may only appear once in a playlist');
  return { title: body.title.trim(), goal: (body.goal || '').trim(), songIds: [...body.songIds] };
}
function present(playlist, db) {
  // store references and resolve the existing catalogue records for display.
  return { ...playlist, songs: playlist.songIds.map((id) => db.songs.find((song) => song.id === id)), songCount: playlist.songIds.length };
}
async function list(req, res, next) {
  try {
    const db = await readDb();
    res.json({ playlists: db.playlists.filter((item) => item.userId === req.auth.userId).map((item) => present(item, db)) });
  } catch (error) { next(error); }
}
async function get(req, res, next) {
  try { const db = await readDb(); res.json({ playlist: present(owned(db, req), db) }); }
  catch (error) { next(error); }
}
async function create(req, res, next) {
  try {
    const playlist = await updateDb((db) => {
      const fields = validate(req.body, db);
      const now = new Date().toISOString();
      // ownership comes from the verified token, ignoring any user id in the request body.
      const record = { id: randomUUID(), userId: req.auth.userId, ...fields, createdAt: now, updatedAt: now };
      db.playlists.push(record);
      return present(record, db);
    });
    res.status(201).json({ playlist });
  } catch (error) { next(error); }
}
async function update(req, res, next) {
  try {
    const playlist = await updateDb((db) => {
      const record = owned(db, req);
      Object.assign(record, validate(req.body, db), { updatedAt: new Date().toISOString() });
      return present(record, db);
    });
    res.json({ playlist });
  } catch (error) { next(error); }
}
async function remove(req, res, next) {
  try {
    await updateDb((db) => { const record = owned(db, req); db.playlists = db.playlists.filter((item) => item.id !== record.id); });
    res.status(204).end();
  } catch (error) { next(error); }
}
module.exports = { list, get, create, update, remove };
