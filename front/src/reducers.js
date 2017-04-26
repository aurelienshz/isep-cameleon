// import reducers :

import users from './data/users/reducer';
import team from './data/team/reducer';
import subject from './data/subject/reducer';

const chameleonReducers = {
  users,
  team,
  subject: subject,
};

export default chameleonReducers;
