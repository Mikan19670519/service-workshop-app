import { ApplicationError } from '..';

export interface ToastModel {
  header: string;
  body: string;
  class: string;
  autoHide: boolean;
  delay: number;
  link: string;
  error: ApplicationError;
}
