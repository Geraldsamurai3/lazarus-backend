import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './Dto/create-incident.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly service: IncidentsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  create(
    @Body() dto: CreateIncidentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const mediaUrls = file ? [file.filename] : [];
    return this.service.create({ ...dto, mediaUrls });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
