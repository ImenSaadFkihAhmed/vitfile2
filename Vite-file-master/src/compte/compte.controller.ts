import { Controller, Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { CompteService } from './compte.service';
import { AddCompteDto } from './dto/addCompte.dto';
import { UpdateCompteDto } from './dto/updateCompte.dto';

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  @Post()
  addCompte(@Body() addCompteDto: AddCompteDto) {
    return this.compteService.addCompte(addCompteDto);
  }

  @Get(':id')
  getCompte(@Param('id') id: string) {
    return this.compteService.getCompte(id);
  }

  @Get()
  getComptes() {
    return this.compteService.getComptes();
  }

  @Patch(':id')
  updateCompte(@Param('id') id: string, @Body() updateCompteDto: UpdateCompteDto) {
      return this.compteService.updateCompte(id, updateCompteDto);
  }

  @Delete(':id')
  deleteCompte(@Param('id') id: string) {
    return this.compteService.deleteCompte(id);
  }

  @Get('/restore/:id')
    restoreCompte(@Param('id') id:string) {
      return this.compteService.restoreCompte(id);
    } 
}