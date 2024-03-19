import { Controller, Get } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/cat')
  getCat(): string {
    return this.petService.getCat();
  }

  @Get('/dog')
  getDog(): string {
    return this.petService.getDog();
  }
}
