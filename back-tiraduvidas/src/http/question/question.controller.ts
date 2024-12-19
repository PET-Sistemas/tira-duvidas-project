import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.insertOne(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  // Busca por id
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.questionService.findOne({ id });
  }

  // Busca por título (alterei o nome do método para distinguir as rotas)
  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    return this.questionService.findMany({ title });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.delete(+id);
  }
}
