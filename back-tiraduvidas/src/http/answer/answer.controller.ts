import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('answers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto, @Req() req) {
    return await this.answerService.insertOne(createAnswerDto);
  }

  @Get()
  async findAll() {
    return await this.answerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.answerService.findOne(id);
  }

  // Busca por questão
  @Get('question/:questionId')
  async findManyById(@Param('questionId') questionId: number) {
    return await this.answerService.findMany({ questionId });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return await this.answerService.update(updateAnswerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.answerService.delete(+id);
  }
}
