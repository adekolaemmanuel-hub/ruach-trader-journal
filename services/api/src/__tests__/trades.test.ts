import request from 'supertest';
import app from '../app';
import prisma from '../db/prismaClient';

const testEmail = `trades-test-${Date.now()}@ruach.dev`;
const testPassword = 'testpass123';
let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/signup')
    .send({ email: testEmail, password: testPassword });
  token = res.body.token;
});

afterAll(async () => {
  await prisma.trade.deleteMany({ where: { user: { email: testEmail } } });
  await prisma.user.deleteMany({ where: { email: testEmail } });
  await prisma.$disconnect();
});

describe('POST /trades', () => {
  it('rejects requests with no auth token', async () => {
    const res = await request(app)
      .post('/trades')
      .send({ pair: 'NAS100', direction: 'long', entryPrice: 18500 });

    expect(res.status).toBe(401);
  });

  it('creates a trade for the authenticated user', async () => {
    const res = await request(app)
      .post('/trades')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pair: 'NAS100',
        direction: 'long',
        entryPrice: 18500,
        slPrice: 18450,
        tpPrice: 18650,
        strategyTag: 'ORB',
      });

    expect(res.status).toBe(201);
    expect(res.body.pair).toBe('NAS100');
    expect(res.body.strategyTag).toBe('ORB');
  });
});

describe('GET /trades', () => {
  it('lists only the authenticated user\'s trades', async () => {
    const res = await request(app)
      .get('/trades')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
