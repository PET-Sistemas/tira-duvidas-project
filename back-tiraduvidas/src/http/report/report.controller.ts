import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateReportDto } from './dto/create-report.dto';
import { ExportReportDto } from './dto/export-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('export')
  async exportReport(
    @Query() query: ExportReportDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const report = await this.reportService.exportReport(query);

    response.setHeader('Content-Type', report.mimeType);
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${report.fileName}"`,
    );

    return new StreamableFile(report.buffer);
  }

  @Post()
  async generateReport(@Body() createReportDto: CreateReportDto) {
    return await this.reportService.insertOne(createReportDto);
  }
}
