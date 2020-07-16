import { IEnvironmentConfiguration } from 'src/app/models/shared/environment-configuration.interface';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironmentConfiguration = {
  production: false,
  apiVersion: '1.0',
  version: 'DEV',
  origin: 'localhost:4200',
  
  apiConfig: {
    apiUrl: 'https://localhost:5001/api',
    bookingsUrl: '/booking',
    clientsUrl: '/client',
    vehiclesUrl: '/vehicle',
  },

  retryConfig: {
    initialInterval: 1000,
    maxRetries: 5
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
