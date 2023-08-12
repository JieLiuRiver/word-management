interface Options {
  origin?: string;
  credentials?: boolean;
}

function cors(options: Options) {
  return (req, res, next) => {
    if (options.origin) {
      res.set('Access-Control-Allow-Origin', options.origin);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
    }

    if (options.credentials) {
      res.set('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.status(200).end();
    } else {
      // Normal request, pass to next handler
      next();
    }
  };
}

export default cors;
