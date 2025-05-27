import createHandler from '@/utils/handler'

import list from './list'
import rename from './rename'
import remove from './remove'

const endpoints = [
    { name: 'hooks', method: 'GET', authRequired: true, handler: list },
    { name: 'hooks/[hookid]', method: 'PATCH', authRequired: true, handler: rename },
    { name: 'hooks/[hookid]', method: 'DELETE', authRequired: true, handler: remove },  
];

export default createHandler(endpoints);
