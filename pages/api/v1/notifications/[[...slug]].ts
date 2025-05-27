import createHandler from '@/utils/handler';

import list from './list';
import read from './read';
import remove from './remove';

const endpoints = [
    { name: 'notifications', method: 'GET', authRequired: true, handler: list },
    { name: 'notifications/[notificationid]/read', method: 'PATCH', authRequired: true, handler: read },
    { name: 'notifications/[notificationid]', method: 'DELETE', authRequired: true, handler: remove },
];

export default createHandler(endpoints);
