export interface SaveEmailDto {
  to: string;
  subject: string;
  template?: string;
  context?: object;
  additionalInformation?: string;
}
