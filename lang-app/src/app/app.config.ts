import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export interface AppConfig {
    apiRoot: string;
    appRoot: string;
}

export const AppConfig: AppConfig = {    
    apiRoot: "http://localhost:3000",
    appRoot: "http://localhost:4200"    
};
