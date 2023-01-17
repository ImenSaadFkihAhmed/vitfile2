import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async addFile(@Body() createFileDto: CreateFileDto ) {
    return this.fileService.addFile(createFileDto);
  }


  @Get(':id-service')
  async findOne(@Param('id') id: string) {
    return await this.fileService.getFilelist(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: Partial<FileEntity>) {
    return this.fileService.updateFile(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
