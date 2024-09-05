export function logger(req: any, res: any, next: any) {
  const start = Date.now();
  const originalJson = res.json;
  const originalEnd = res.end;
  let statusCode: number, responseBody: any;

  // Override res.json method
  res.json = function(body: any) {
    responseBody = body;
    return originalJson.apply(this, arguments);
  };

  // Override res.end method
  res.end = function(chunk: any, encoding:any) {
    const end = Date.now();
    const duration = end - start;
    statusCode = res.statusCode;

    if (chunk) responseBody = chunk;

    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} - Status: ${statusCode} - Duration: ${duration}ms`);

    if (statusCode >= 400) {
      console.error('Error:', responseBody);
    }

    originalEnd.apply(this, arguments);
  };

  next();
}
