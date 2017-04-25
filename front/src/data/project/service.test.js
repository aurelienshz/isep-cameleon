import {getProjectsList, createProject} from './service';
import {createTeam} from '../../services/team';

describe('Projects service', () => {
  beforeAll(authenticate);

  it('Fetches list of projects', async () => {
    const projects = await getProjectsList();
    console.log(projects);
  });

  it('Allows creating a project', async () => {
    try {
      const team = {
        name: "power rangers",
        membersIds: [],
      };

      await createTeam(team);

      const project = {
        subjectId: 1,
        teamId: null,
        clientsIds: [],
      };

      await createProject(project);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
});
