import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportService.insertOne(createReportDto);
  }

  @Get()
  async findAll() {
    return await this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.reportService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return await this.reportService.update({
      ...updateReportDto,
      id: parseInt(id, 10),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportService.delete(+id);
  }
}
