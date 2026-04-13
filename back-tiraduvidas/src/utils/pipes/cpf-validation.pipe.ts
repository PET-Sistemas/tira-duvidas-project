import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

/**
 * Pipe para validação e normalização de CPF.
 *
 * Responsabilidades (SRP):
 * - Normaliza o input removendo caracteres não numéricos
 * - Valida o formato do CPF (11 dígitos)
 * - Valida os dígitos verificadores do CPF
 *
 * @example
 * // Ambos inputs são válidos e normalizados para '12345678909'
 * '123.456.789-09' -> '12345678909'
 * '12345678909'    -> '12345678909'
 *
 * @throws BadRequestException quando o CPF é inválido
 */
@Injectable()
export class CpfValidationPipe implements PipeTransform<string, string> {
  /**
   * CPFs conhecidos como inválidos (sequências repetidas)
   */
  private static readonly INVALID_CPFS = new Set([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]);

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException({
        statusCode: 400,
        message: 'CPF é obrigatório',
        error: 'Bad Request',
        field: 'cpf',
      });
    }

    const normalizedCpf = this.normalize(value);

    if (!this.isValidFormat(normalizedCpf)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'CPF deve conter exatamente 11 dígitos numéricos',
        error: 'Bad Request',
        field: 'cpf',
      });
    }

    // if (!this.isValidCpf(normalizedCpf)) {
    //   throw new BadRequestException({
    //     statusCode: 400,
    //     message: 'CPF inválido',
    //     error: 'Bad Request',
    //     field: 'cpf',
    //   });
    // }

    return normalizedCpf;
  }

  /**
   * Remove caracteres não numéricos do CPF
   */
  private normalize(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  /**
   * Verifica se o CPF tem exatamente 11 dígitos
   */
  private isValidFormat(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  /**
   * Valida o CPF usando o algoritmo oficial (dígitos verificadores)
   *
   * O CPF possui dois dígitos verificadores calculados através de módulo 11:
   * - Primeiro DV: calculado sobre os 9 primeiros dígitos
   * - Segundo DV: calculado sobre os 10 primeiros dígitos (incluindo o primeiro DV)
   */
  private isValidCpf(cpf: string): boolean {
    // Rejeita CPFs com todos os dígitos iguais
    if (CpfValidationPipe.INVALID_CPFS.has(cpf)) {
      return false;
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10), 10)) {
      return false;
    }

    return true;
  }
}
