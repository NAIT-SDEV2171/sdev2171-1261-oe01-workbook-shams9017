const fs = require('fs/promises');
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
let pending = Promise.resolve();
function normalize(data) {
  return { users: Array.isArray(data.users) ? data.users : [],
    songs: Array.isArray(data.songs) ? data.songs : [],
    playlists: Array.isArray(data.playlists) ? data.playlists : [] };
}
async function readDb() {
  try { return normalize(JSON.parse(await fs.readFile(DB_PATH, 'utf8'))); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await writeDb({});
    return normalize({});
  }
}
async function writeDb(data) {
  // rename keeps readers from observing a partly written file.
  const temporary = DB_PATH + '.tmp';
  await fs.writeFile(temporary, JSON.stringify(normalize(data), null, 2), 'utf8');
  await fs.rename(temporary, DB_PATH);
}
function updateDb(change) {
  // serialize read and write together so simultaneous requests cannot lose records.
  const job = pending.then(async () => {
    const db = await readDb();
    const result = await change(db);
    await writeDb(db);
    return result;
  });
  pending = job.catch(() => {});
  return job;
}
module.exports = { readDb, writeDb, updateDb, DB_PATH };
