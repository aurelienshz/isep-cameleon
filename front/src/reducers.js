// import reducers :

import users from './data/users/reducer';
import equipesReducer from './pages/teacher/teacher';
import subject from './data/subject/reducer';

const chameleonReducers = {
  users,
  equipes: equipesReducer,
  subject: subject,
};

export default chameleonReducers;
