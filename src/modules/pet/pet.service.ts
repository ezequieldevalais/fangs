import { Injectable } from '@nestjs/common';

@Injectable()
export class PetService {
  getDog(): string {
    return 'this is a dog';
  }

  getCat(): string {
    return 'this is a cat';
  }
}
