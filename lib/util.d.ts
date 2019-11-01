declare const getConfig: (key?: string) => any;
declare const getPackagesDirs: () => string[];
declare const showFolder: (filePath: string) => Promise<void>;
declare const showInFolder: (filePath: any) => Promise<void>;
declare const warn: (message: string, dismissable?: boolean) => void;
export { getConfig, getPackagesDirs, showFolder, showInFolder, warn };
