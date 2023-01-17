import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>
  ){}

 async addFile(createFileDto: CreateFileDto): Promise<FileEntity> {
  const newfile=new FileEntity
  const chaine=createFileDto.Id+createFileDto.Adress
  newfile.Id=await bcrypt.hash(chaine,10)
  newfile.Adress=createFileDto.Adress
  newfile.numerofile=0
  newfile.guichet=createFileDto.guichet
  return await this.FileRepository.save(newfile);
  }
  async getFilelist(Id: string):Promise<FileEntity[]> {
  
    const fileList = await this.FileRepository
    .createQueryBuilder("File")
    .leftJoinAndSelect("files.admin", "compte_entity")
    .where("admin.id = :Id", { Id })
    .getMany();
    if (!fileList) {
      throw new NotFoundException("Compte not found!");}
   else
    return fileList;
}
async updateFile(Id: string, updatefile:Partial<FileEntity>):Promise<FileEntity> {
  const new_file= await this.FileRepository.findOne({where:{Id}});
  if (new_file){
    Object.assign(new_file, updatefile);
    return await this.FileRepository.save(new_file);
  }
  else {
      throw new NotFoundException("Compte not found to be updated!");
  }
}
  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
