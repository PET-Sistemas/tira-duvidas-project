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
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { AnswerService } from '../answer/answer.service';

@Controller('question')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService, 
    private categoryService: CategoryService,
    private answerService: AnswerService,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    const category = await this.categoryService.findOne({ name: createQuestionDto.categories[0] });
    
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return await this.questionService.insertOne({
      title: createQuestionDto.title,
      description: createQuestionDto.description,
      questionerId: createQuestionDto.questionerId,
      status: createQuestionDto.status,
      categories: [category],
     }
    );
  }

  @Get()
  async findAll() {
    return await this.questionRepository.find({ relations: ['categories', 'questioner'] });

//    return await this.questionService.findAll();
  }

  // Busca por id
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.questionService.findOne({ id });
  }

  // Busca por id do usuário
  @Get('user/:questionerId')
  async findManyById(@Param('questionerId') questionerId: number) {
    return await this.questionRepository.find({ 
      where: { 
        questionerId: questionerId 
      }, 
      relations: ['categories', 'questioner'] 
    });

    //return await this.questionService.findMany({ questionerId, relations: ['categories'] });
  }

  // Busca por id do usuário
  @Get('answered/:respondentId')
  async findManyAnswered(@Param('respondentId') respondentId: number) {
    const answers = await this.answerService.findMany({ respondentId });

    return await this.questionRepository.find({
      where: { 
        id: In(answers.map(answer => parseInt(answer.questionId.toString()))) 
      }, 
        relations: ['categories', 'questioner']
      });

    //return await this.questionService.findMany({ questionerId, relations: ['categories'] });
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
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    console.log(updateQuestionDto);
    return await this.questionService.update(updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionService.delete(+id);
  }
}
