import message from './message';
import session from './session';


export default function* rootSaga() {
  yield [
    message(),
    session()
  ]
}
