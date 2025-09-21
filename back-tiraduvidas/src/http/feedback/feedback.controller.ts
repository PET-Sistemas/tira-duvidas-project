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
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('feedback')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbackService.insertOne(createFeedbackDto);
  }

  @Get()
  async findAll() {
    return await this.feedbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.feedbackService.findOne({ id });
  }

  @Get('answer/:answerId')
  async findManyById(@Param('answerId') answerId: number) {
    return await this.feedbackService.findMany({ answerId });
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return await this.feedbackService.update(updateFeedbackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackService.delete(+id);
  }
}
