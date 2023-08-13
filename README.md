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

After that, you will see the terminal display:
```
App listening on the port 3000
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

### Users
When starting the app, the users table inserts 2 users by default
- User `Tom`, administrator identity
- User `Mary`, normal user

### API
All apis are prefixed with `/api/v1`. For example, you want to test login api, it's `/api/v1/login`.

all endpoints except `/login` require an authentication `token`

- `POST /login` - User login, only requires body.username, no need password at this time.
- `GET /users` - Get users, only admin have this permission
- `GET /users/:id` - Get users, only admin have this permission
- `POST /revoke-token` - Revoke JWT for a user, requires admin privileges, required body.userid
- `POST /cards` - Create a new word card, requires body.- `POST /cards` - Create a new word card, requires body.user_input
- `GET /cards` - Get paginated word card, defaults to pageNumber: 1, pageSize: 10
- `GET /cards/:id` - Get card by ID
- `PUT /cards/:id` - Update card by ID, requires params.id and body.user_input
- `DELETE /cards/:id` - Delete card by ID


### Handling High Load and Concurrency
This app implements several strategies to handle high traffic and potential race conditions when updating data:
1. For concurrent `POST` and `PUT` requests to `create/update` cards, a global taskQueue middleware is used. All write tasks are pushed to this queue and executed sequentially. The queue has a retry mechanism - if a task fails, it will be retried up to 2 times with a delay between retries.

  ```ts
  this.router.post(
    this.path,
    ...,
    queueMiddleware(this.cards.createCard.bind(this.cards)),
  );
  ```

2. The `PUT /cards` endpoint for updating cards uses database transactions to ensure data integrity under high concurrency. This guarantees that partial/incomplete updates do not happen.

3. To protect against excessive requests and traffic spikes, a custom rate limiting middleware is used.
If a client exceeds the request limit, a 429 Too Many Requests response is returned to inform the client to back off. This prevents any single client from overwhelming the application.
  ```js
  // Limit requests to 60 per minute
  app.use(
    createRateLimitMiddleware({
      max: 60,
      windowMs: 60 * 1000
    })
  );
  ```

### Security and Input Validation

#### Input Validation
Input validation is implemented using a middleware to protect the input value of user_input. It filters out special characters and prevents SQL injection.

#### Security
For security purposes, a custom `cors` middleware is implemented to configure the secure origin using environment variables.
  ```ts
  this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  ```

A security headers middleware, `securityHeadersMiddleware`, is also written to enhance security measures.
  ```ts
  export default function securityHeadersMiddleware(req, res, next) {
    // Set the XSS guard header
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Disable content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Remove leaky information
    res.removeHeader('X-Powered-By');

    next();
  }
  ```
