
export interface IEnvironmentConfiguration {
  production: boolean;
  apiVersion: string;
  version: string;
  origin: string;

  apiConfig: {
    apiUrl: string;
    bookingsUrl: string;
    clientsUrl: string;
    vehiclesUrl: string;
  };

  retryConfig: {
    initialInterval: number,
    maxRetries: number
  };
}
