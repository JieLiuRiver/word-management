export default function securityHeadersMiddleware(req, res, next) {
  // Set the XSS guard head
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Disable content sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // delete leaky
  res.removeHeader('X-Powered-By');

  next();
}
