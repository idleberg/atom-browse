/// <reference types="node" />
import { stat } from 'fs';
declare const statAsync: typeof stat.__promisify__;
declare const getConfig: (key?: string) => any;
declare const getPackagesDirs: () => string[];
declare const showFolder: (folderName: string, filePath: string) => Promise<void>;
declare const showInFolder: (filePath: string) => Promise<void>;
declare const warn: (message: string, dismissable?: boolean) => void;
export { getConfig, getPackagesDirs, showFolder, showInFolder, statAsync as stat, warn };
