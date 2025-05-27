import createHandler from '@/utils/handler';

import listall from './listall';
import foldersmine from './foldersmine';
import folderget from './folderget';
import folderset from './folderset';
import foldernew from './foldernew';
import rename from './rename';
import remove from './remove';
import instructions from './instructions';

const endpoints = [
    { name: 'doctypes', method: 'GET', authRequired: true, handler: listall },
    { name: 'doctypes/folders/me', method: 'GET', authRequired: true, handler: foldersmine },
    { name: 'doctypes/[folderid]', method: 'GET', authRequired: true, handler: folderget },
    { name: 'doctypes/[folderid]', method: 'PATCH', authRequired: true, handler: folderset },
    { name: 'doctypes', method: 'POST', authRequired: true, handler: foldernew },
    { name: 'doctypes/rename/[folderid]', method: 'PATCH', authRequired: true, handler: rename },
    { name: 'doctypes/[folderid]', method: 'DELETE', authRequired: true, handler: remove },
    { name: 'doctypes/[doctypeid]/instructions', method: 'GET', authRequired: true, handler: instructions },
];

export default createHandler(endpoints);
