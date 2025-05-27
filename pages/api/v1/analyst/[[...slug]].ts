import createHandler from '@/utils/handler';

import hooks from './hooks';
import docs from './docs';
import inviteuser from './inviteuser';
import bizlist from './bizlist';
import bizmine from './bizmine';
import bizset from './bizset';
import viewfile from './viewfile';
import downloadhook from './downloadhook';
import reject from './reject';

const endpoints = [
    { name: 'analyst/hooks', method: 'GET', authRequired: true, handler: hooks },
    { name: 'analyst/inviteuser', method: 'POST', authRequired: true, handler: inviteuser },
    { name: 'analyst/hooks/[hookid]/docs', method: 'GET', authRequired: true, handler: docs },
    { name: 'analyst/businesses', method: 'GET', authRequired: true, handler: bizlist },
    { name: 'analyst/businesses/me', method: 'GET', authRequired: true, handler: bizmine },
    { name: 'analyst/businesses', method: 'POST', authRequired: true, handler: bizset },
    { name: 'analyst/files/[fileid]/view', method: 'GET', authRequired: true, handler: viewfile },
    { name: 'analyst/hooks/[hookid]/download', method: 'GET', authRequired: true, handler: downloadhook },
    { name: 'analyst/hooks/[hookid]/reject', method: 'POST', authRequired: true, handler: reject },
];

export default createHandler(endpoints);
