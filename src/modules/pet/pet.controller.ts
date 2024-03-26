import { Controller, Get, SetMetadata } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';

import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/cat')
  getCat(): string {
    return this.petService.getCat();
  }

  @UseRoles({
    resource: 'pet',
    action: 'read',
    possession: 'any',
  })
  @Get('/dog')
  getDog(): string {
    return this.petService.getDog();
  }
}
