import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';
import * as request from 'supertest';
import { AddEbookDto } from '../src/modules/ebooks/dto/add-ebook.dto';
import { setupApp } from '../src/setup-app';
import { AppModule } from './../src/app.module';
import { storageDir } from './../src/utils/storage';




describe('App test (e2e)', () => {
  let app: INestApplication;
  const email = 'test@test.pl';
  const pwd = 'qwerty';
  let adminLoginCookie;
  let matchEbook;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it.skip('Handle Sign Up request', () => {

    return request(app.getHttpServer())
      .post('/user/create')
      .send({ email, pwd })
      .then((res) => {
        console.log(res.body);

        const { user_id, email } = res.body;
        expect(user_id).toBeDefined();
        expect(email).toEqual(email);
      })
  });

  it('Handle Sign In request', () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, pwd })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('ok');
        expect(response.body.ok).toBe(true);
        adminLoginCookie = response.header['set-cookie'];
      })
  });

  it.skip('Handle create ebook request', () => {
    const ebook: AddEbookDto = {
      title: 'testcik',
      pages: 200,
      publication_date: '2022-01-20',
      description: 'lorem lolem',
      price: 22.99,
      language_code: 'pl-PL',
      language_name: 'Polski',
      publisher: '2123a962-1bcf-46dc-a4d0-e44b0b2d8fe4',
      author: ['27c0e849-f3d6-4081-824e-31c28e95adef'],
      category: ['59ad1f9d-3ea3-448f-a0ca-93752c7ed9bb', '792a93ee-e5d0-4a7e-a053-95179f3be98a'],
      discount: ['31d18077-bd30-4c15-abaf-78931f676a3f']
    }

    return request(app.getHttpServer())
      .post('/ebooks/add/ebook')
      .set("Cookie", adminLoginCookie)
      .set('Connection', 'keep-alive')
      .attach('cover', path.join(storageDir('cover'), 'blue-butterfly-small.jpg'))
      .attach('product', path.join(storageDir('product'), 'test.pdf'))
      .field('title', ebook.title)
      .field('pages', ebook.pages)
      .field('publication_date', ebook.publication_date)
      .field('description', ebook.description)
      .field('price', ebook.price)
      .field('language_code', ebook.language_code)
      .field('language_name', ebook.language_name)
      .field('publisher', ebook.publisher)
      .field('discount', JSON.stringify(ebook.discount))
      .field('author', JSON.stringify(ebook.author))
      .field('category', JSON.stringify(ebook.category))
      .expect(201)
      .then((res) => {
        matchEbook = res.body;
        expect(res).toHaveProperty('status', 201);
        expect(res.body).toEqual(matchEbook);
      })
  });

  it('Handle GET ebook request', () => {
    const params = {
      phrase: 'testcik',
    }

    return request(app.getHttpServer())
      .get('/ebooks/filter')
      .query(params)
      .expect(200)
      .then((res) => {
        matchEbook = res.body;

        expect(res).toHaveProperty('status', 200);
        expect(res.body).toMatchObject(matchEbook);
      })
  });

  afterAll(async () => {
    await app.close();
  });
});