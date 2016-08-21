import message from './message';
import session from './session';

// LOAD THE SAGA
export default function* rootSaga() {
  yield [
    message(),
    session()
  ]
}
