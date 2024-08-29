import { Request, Response, NextFunction } from 'express';

export async function helloCustomer(req: Request, res: Response, next: NextFunction) {
    res.send('Hello from customers');
}