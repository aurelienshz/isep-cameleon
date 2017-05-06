// import reducers :

import users from './data/users/reducer';
import team from './data/team/reducer';
import subject from './data/subject/reducer';
import promotion from './data/promotion/reducer';
import project from './data/project/reducer';

const chameleonReducers = {
  promotion,
  project,
  users,
  team,
  subject,
};

export default chameleonReducers;
