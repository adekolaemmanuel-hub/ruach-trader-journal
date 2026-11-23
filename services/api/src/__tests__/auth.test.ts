import request from 'supertest';
import app from '../app';
import prisma from '../db/prismaClient';

const testEmail = `test-${Date.now()}@ruach.dev`;
const testPassword = 'testpass123';

afterAll(async () => {
  await prisma.trade.deleteMany({ where: { user: { email: testEmail } } });
  await prisma.user.deleteMany({ where: { email: testEmail } });
  await prisma.$disconnect();
});

describe('POST /auth/signup', () => {
  it('creates a new user and returns tokens', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ email: testEmail, password: testPassword, displayName: 'Test User' });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.token).toBeDefined();
    expect(res.body.refresh_token).toBeDefined();
  });

  it('rejects a duplicate email', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already registered/i);
  });
});

describe('POST /auth/login', () => {
  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects an incorrect password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });
});
