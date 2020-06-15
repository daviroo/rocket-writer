import { fork, all } from 'redux-saga/effects';

import readibilitySaga from './ReadibilitySaga';
import documentSaga from './DocumentSaga';
import documentListSaga from './DocumentListSaga';
import authSaga from './AuthSaga';
import documentWarningsSaga from './DocumentWarningsSaga';

const sagas = [readibilitySaga, documentSaga, documentListSaga, documentWarningsSaga, authSaga];

export default function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)));
}