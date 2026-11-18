# Lesson 19 backend

The database is src/data/db.json and has exactly three collections: songs, playlists and users. Song records are seeded only here. The app fetches them from the public catalogue. Creating a playlist stores references to these existing songs.

## Run

```sh
npm install
```

Copy .env.example to .env and set JWT_SECRET to a long unique value, then run:

```sh
npm start
```

The server uses port 4000. Demo login: student1@example.com / Password123!.

## Public endpoints

| Method | Path | Response |
| --- | --- | --- |
| GET | /songs | { songs: [...] } containing the catalogue |
| GET | /songs/:id | { song: {...} } containing one existing song |
| POST | /auth/register | { token, user, message } after creating a hashed user account |
| POST | /auth/login | { token, user, message } after validating credentials |

Public song requests do not need an Authorization header. They also work before registration or login. Song creation, update and deletion return 405. There is no second sample catalogue route.

## Protected endpoints

Every request below requires `Authorization: Bearer <token>`.

| Method | Path | Behaviour |
| --- | --- | --- |
| GET | /auth/me | Validate the current session and return its safe user |
| GET | /playlists | Return only the current user's playlists |
| GET | /playlists/:id | Return an owned playlist |
| POST | /playlists | Create an owned playlist |
| PUT | /playlists/:id | Update an owned playlist |
| DELETE | /playlists/:id | Delete an owned playlist |

Create/update body:

```json
{"title":"Evening Mix","goal":"Relax after class","songIds":["2","7","14"]}
```



