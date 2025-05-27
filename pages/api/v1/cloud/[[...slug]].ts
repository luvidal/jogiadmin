import createHandler from '@/utils/handler';

import list from './list';
import upload from './upload';
import download from './download';
import view from './view';
import remove from './remove';
import removeall from './removeall';
import rename from './rename';

const endpoints = [
    { name: 'cloud', method: 'GET', authRequired: true, handler: list },
    { name: 'cloud', method: 'POST', authRequired: true, handler: upload },
    { name: 'cloud/[cloudfileid]/view', method: 'GET', authRequired: true, handler: view },
    { name: 'cloud/[cloudfileid]/download', method: 'GET', authRequired: true, handler: download },
    { name: 'cloud/[cloudfileid]', method: 'DELETE', authRequired: true, handler: remove },
    { name: 'cloud', method: 'DELETE', authRequired: true, handler: removeall },
    { name: 'cloud/[cloudfileid]', method: 'PATCH', authRequired: true, handler: rename },
];

export default createHandler(endpoints);
