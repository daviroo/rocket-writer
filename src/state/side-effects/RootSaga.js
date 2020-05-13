import { fork, all } from 'redux-saga/effects';

import readibilitySaga from './ReadibilitySaga';
import documentSaga from './DocumentSaga';

const sagas = [readibilitySaga, documentSaga];

export default function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)));
}