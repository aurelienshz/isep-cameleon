// import reducers :

import users from './data/users/reducer';
import equipesReducer from './pages/teacher/teacher';

const chameleonReducers = {
  users,
  equipes: equipesReducer,
};

export default chameleonReducers;
