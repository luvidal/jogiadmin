import createHandler from '@/utils/handler'

import list from './list'
import redo from './redo'

const endpoints = [
    { name: 'tasks', method: 'POST', authRequired: true, handler: list },
    { name: 'tasks/[taskid]/reprocess', method: 'PATCH', authRequired: true, handler: redo },
];

export default createHandler(endpoints);
