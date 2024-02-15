export type ConfigTypes = {
    env: string;
    port: number;
    apiDocs: string;
    store: {
        database: {
            mongodb: IMongodb;
        };
    };
    credentials: {
        jwt: IJWT;
    };
    defaults: {
        saltWorker: number;
    }
};

interface IJWT {
    secret: string;
    expirationInterval: string;
}

interface IMongodb {
    mongooseDebug: boolean;
    uri: string;
    secureHost: string;
    testUri: string;
}


export interface ErrorResponseInterface {
    message: string;
    errors: string;
    stack: string | undefined;
    statusCode: number;
    payload?: object | null;
}

export interface ExpressErrorInterface extends Error {
    errors: string;
    status: number;
}