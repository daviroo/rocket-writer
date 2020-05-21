import { fork, all } from 'redux-saga/effects';

import readibilitySaga from './ReadibilitySaga';
import documentSaga from './DocumentSaga';
import documentListSaga from './DocumentListSaga';

const sagas = [readibilitySaga, documentSaga, documentListSaga];

export default function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)));
}