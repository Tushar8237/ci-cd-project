import request from 'supertest';
import express from 'express';
import { rateLimiter } from '../middlewares/rateLimiter.JS';


const app = express();
app.use(rateLimiter);
app.get('/', (req, res) => res.status(200).send('ok'));


describe('Rate Limiter Middleware', () => {
    it('should allow 100 request', async () => {
        for (let i = 0; i < 100; i++) {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
        }
    });

    it ('should block the 101st request', async () => {
        for ( let i = 0; i < 100; i++) {
            await request(app).get('/');
        }

        const res = await request(app).get('/');
        expect(res.statusCode).toBe(429);
        expect(res.body.message).toMatch(/Too many request/i);
    });
    
});