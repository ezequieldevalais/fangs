import { Controller, Get } from '@nestjs/common';

@Controller('pet')
export class PetController {
  @Get('/cat')
  getCat(): string {
    return 'this is a cat';
  }

  @Get('/dog')
  getDog(): string {
    return 'this is a cat';
  }
}
