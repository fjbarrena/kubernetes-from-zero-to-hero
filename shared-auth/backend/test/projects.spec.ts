import request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProjectsModule } from './../src/projects/projects.module';
import { INestApplication } from '@nestjs/common';

describe('Projects module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ProjectsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create a new project', () => {
    const attributes = {
      name: 'a project',
    };

    const expectedResponse = {
      data: {
        type: 'projects',
        id: 1,
        attributes,
      },
    };

    return request(app.getHttpServer())
      .post('/projects')
      .send(attributes)
      .expect(201)
      .expect(expectedResponse);
  });

  it('fetch all projects', async () => {
    const expectedResponse = {
      data: [
        {
          type: 'projects',
          id: 1,
          attributes: { name: 'a project' },
        },
      ],
    };

    return request(app.getHttpServer())
      .get('/projects')
      .expect(200)
      .expect(expectedResponse);
  });
});
