import createHandler from '@/utils/handler';

import upload from './upload';

const endpoints = [
    { name: 'cloud', method: 'POST', authRequired: true, handler: upload },
];

export default createHandler(endpoints);
