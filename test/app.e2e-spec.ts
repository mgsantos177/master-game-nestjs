import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider()
    .useClass(ValidationPipe)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('E aí mundo!');
  });

  describe('POST /api/cards', () => {
    it('should create a card and return OK', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/cards')
            .send({
                question: 'Teste',
                options: ['A','B'],
                answer: 'B',
                category: 'TestCategory'
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /api/cards/random/:category', () => {
    it('should return a random card from the given category', async () => {
        const response = await request(app.getHttpServer())
            .get(`/api/cards/random/TestCategory`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
    });

    it('should return null if no cards found in that category', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/cards/random/InvalidCategory')
            .expect(404);
            
        // Não há uma resposta específica para este caso, apenas verificação do status
    });
  });

});
