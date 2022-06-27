import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app)
    await app.init();
  });

  it('Handles a signup request', () => {
    const email = 'test@example.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email , password: 'password123'})
      .expect(201)
      .then( ({ body }) => {
        const { id, email } = body;

        expect(id).toBeDefined();
        expect(email).toBe(email);
      })
  });

  
});
