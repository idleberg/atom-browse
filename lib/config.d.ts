declare const config: {
    notify: {
        title: string;
        description: string;
        type: string;
        enum: {
            value: string;
            description: string;
        }[];
        default: string;
        order: number;
    };
    dependencyPaths: {
        title: string;
        description: string;
        type: string;
        default: string[];
        items: {
            type: string[];
        };
        order: number;
    };
    beep: {
        title: string;
        description: string;
        type: string;
        default: boolean;
        order: number;
    };
    openAppPackage: Object;
    customFileManager: {
        title: string;
        type: string;
        order: number;
        properties: {
            fullPath: {
                title: string;
                description: string;
                type: string;
                default: string;
                order: number;
            };
            openArgs: {
                title: string;
                description: string;
                type: string;
                default: never[];
                items: {
                    type: string[];
                };
                order: number;
            };
            revealArgs: {
                title: string;
                description: string;
                type: string;
                default: never[];
                items: {
                    type: string[];
                };
                order: number;
            };
        };
    };
};
export { config };
