## Word Card Management App
This is a word cards management app built with `Node.js`, `Express` and `Sqlite3`.


### Setup

1. Install dependencies

```
npm install
```

2. Start the app

```
npm run dev
```

### Build
1. Generate `dist/` outputs
```
npm run build
```

2. Start the app
```
npm run start
```

### Test
```
npm run test
```

### API
All endpoints except `/login` require an authentication `token`
- `POST /login` - User login, requires body.username
- `POST /revoke-token` - Revoke JWT for a user, requires admin privileges
- `POST /cards` - Create a new word card, requires body.word
- `GET /cards` - Get paginated word card, defaults to pageNumber: 1, pageSize: 10
- `GET /cards/:id` - Get card by ID
- `PUT /cards/:id` - Update card by ID, requires params.id and body.word
- `DELETE /cards/:id` - Delete card by ID


### Handling High Load and Concurrency
This app implements several strategies to handle high traffic and potential race conditions when updating data:
1. For concurrent `POST` and `PUT` requests to `create/update` cards, a global taskQueue middleware is used. All write tasks are pushed to this queue and executed sequentially. The queue has a retry mechanism - if a task fails, it will be retried up to 2 times with a delay between retries.

2. The `PUT /cards` endpoint for updating cards uses database transactions to ensure data integrity under high concurrency. This guarantees that partial/incomplete updates do not happen.

