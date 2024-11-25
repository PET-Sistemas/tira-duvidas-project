import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  transformOptions: { enableImplicitConversion: true },
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
};

export default validationOptions;
