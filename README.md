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
All API are prefixed with `/api/v1`, for example, you want to test login api, it's `/api/v1/login`.

| API | METHOD | Authorization | PARAMS/BODY | PERMISSION | DESCRIPTION
| :----- | :------ | :----- | :----- |:----- |:----- |
| `/login` | `POST`   | `false` | `{"uername": "Mary"}` | `user`、`admin` | User login
| `/users` | `GET`   | `true` | `-` | `admin` | Get all users
| `/user/:id` | `GET`   | `true` | `-` | `admin`、`user` | Get user by id
| `/revoke-token` | `POST`   | `true` | `{"userid": 1}` | `admin` | Revoke user's token
| `/cards` | `POST`   | `true` | `{"user_input": "test"}` | `admin`、 `user` | Create word card
| `/cards` | `GET`   | `true` | `pageNumber=1&pageSize=10` | `admin`、 `user` | Get cards with pagination
| `/cards/:id` | `GET`   | `true` | `-` | `admin`、 `user` | Get card by id
| `/cards/:id` | `PUT`   | `true` | `{"user_input": "modify01"}` | `admin`、 `user` | Modify card
| `/cards/:id` | `DELETE`   | `true` | `-` | `admin`、 `user` | Delete card

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
