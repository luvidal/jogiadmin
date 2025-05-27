import createHandler from '@/utils/handler';

import hooks from './hooks';
import docs from './docs';
import file from './file';
import send from './send';

const endpoints = [
    { name: 'client/hooks', method: 'GET', authRequired: true, handler: hooks },
    { name: 'client/hooks/[hookid]/docs', method: 'GET', authRequired: true, handler: docs },
    { name: 'client/hooks/[hookid]/docs/[docid]/files/[fileid]', method: 'PATCH', authRequired: true, handler: file },
    { name: 'client/hooks/[hookid]/send', method: 'POST', authRequired: true, handler: send },
];

export default createHandler(endpoints);
