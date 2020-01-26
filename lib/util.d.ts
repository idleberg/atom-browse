declare const folderExists: (pathName: string) => Promise<boolean>;
declare const getConfig: (key?: string) => any;
declare const getPackagesDirs: () => string[];
declare const showFolder: (folderName: string, filePath: string) => Promise<void>;
declare const showInFolder: (filePath: string) => Promise<void>;
declare const warn: (message: string, dismissable?: boolean) => void;
export { folderExists, getConfig, getPackagesDirs, showFolder, showInFolder, warn };
