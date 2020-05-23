import { fork, all } from 'redux-saga/effects';

import readibilitySaga from './ReadibilitySaga';
import documentSaga from './DocumentSaga';
import documentListSaga from './DocumentListSaga';
import authSaga from './AuthSaga';

const sagas = [readibilitySaga, documentSaga, documentListSaga, authSaga];

export default function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)));
}