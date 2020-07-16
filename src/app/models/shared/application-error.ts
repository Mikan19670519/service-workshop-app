export interface ApplicationError {
  errorNumber: number;
  errorMessage: string;
  detailedMessage: string;
  redirectTo: string;
  originalError: any;
}
