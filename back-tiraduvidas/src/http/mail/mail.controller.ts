import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { RoleEnum } from '../role/role.enum';
import { RolesGuard } from '../role/roles.guard';
import { MailService } from './mail.service';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Mail')
@Controller({
  path: 'mail',
  version: '1',
})
export class MailController {
  constructor(private readonly mailService: MailService) {}
}
