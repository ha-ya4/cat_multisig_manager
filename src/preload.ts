import { contextBridge } from 'electron';
import { test, isDev } from './nodelib/Dev';

contextBridge.exposeInMainWorld('nodelib', {
    test,
    isDev,
});
