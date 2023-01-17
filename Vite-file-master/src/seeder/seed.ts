import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { randFirstName, randLastName, randSequence, randPhoneNumber, randEmail, randCompanyName, randBic, randAddress, randNumber, randFullAddress } from "@ngneat/falso";
import { CompteEntity } from "../compte/entity/compte.entity"
import { CompteService } from "../compte/compte.service";
import { FileService } from "../file/file.service";
import { FileEntity } from "../file/entities/file.entity";
import { guichet_number } from "../file/etatfile/enumguichet";
import { randomUUID } from "crypto";
import { CreateFileDto } from "../file/dto/create-file.dto";

async function bootstrap () {
    const app = await NestFactory.createApplicationContext(AppModule);
    const compteService = app.get(CompteService);
    const fileService=app.get(FileService)
    function getRandomEnumValue(anEnum: any): any {
        const enumValues = Object.keys(anEnum)
        .map(n => anEnum[n]);
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }

    for (let i=0;i<10;i++){
  
        const newCompte = new CompteEntity();
        const newfile=new CreateFileDto
        newCompte.firstname = randFirstName();
        newCompte.lastname = randLastName();
        newCompte.cin = randSequence();
        newCompte.phoneNumber = parseInt(randPhoneNumber());
        newCompte.email = randEmail();
        newCompte.compagny = randCompanyName();
        newCompte.taxIdentificationNumber = randBic();
        newfile.Adress=randFullAddress()
        newfile.guichet=getRandomEnumValue(guichet_number)
        await compteService.addCompte(newCompte);
        newfile.Id=newCompte.id
        await fileService.addFile(newfile)
    }
    await app.close();
}
bootstrap();