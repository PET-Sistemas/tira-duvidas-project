export interface MailDataDto<T = never> {
  to: string;
  data: T;
}
