export function logger(req: any, res: any, next: any) {
  req.time = new Date(Date.now()).toLocaleString();
  console.log(req.method, req.hostname, req.url, req.path, req.time);
  next();
}
