import createHandler from '@/utils/handler';

import update from './update';
import remove from './remove';
import login from './login';
import info from './info';
import keys from './keys';

const endpoints = [
    { name: 'users', method: 'PATCH', authRequired: true, handler: update },
    { name: 'users', method: 'DELETE', authRequired: true, handler: remove },
    { name: 'users', method: 'GET', authRequired: true, handler: info },
    { name: 'users/keys', method: 'GET', authRequired: true, handler: keys },
    { name: 'users/login', method: 'POST', authRequired: true, handler: login },
];

export default createHandler(endpoints);
