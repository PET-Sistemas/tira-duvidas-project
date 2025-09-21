import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('question')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.insertOne(createQuestionDto);
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  // Busca por id
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.questionService.findOne({ id });
  }

  // Busca por id do usuário
  @Get('user/:questionerId')
  async findManyById(@Param('questionerId') questionerId: number) {
    return await this.questionService.findMany({ questionerId });
  }

  // Busca por título (alterei o nome do método para distinguir as rotas)
  @Get('title/:title')
  async findByTitle(@Param('title') title: string) {
    return await this.questionService.findMany({ title });
  }

  // Busca por status 
  @Get('status/:status')
  async findByStatus(@Param('status') status: string) {
    return await this.questionService.findMany({ status });
  }
  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionService.update(updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionService.delete(+id);
  }
}
