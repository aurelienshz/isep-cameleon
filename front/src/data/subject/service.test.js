import { getSubjectsList } from './subjectService';

describe('Subject service', () => {
  beforeAll(authenticate);

  it('allows fetching subjects', async () => {
    const yolo = await getSubjectsList();
    console.log(yolo);
  });
});
