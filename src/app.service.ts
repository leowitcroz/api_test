import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async create({ name, price, classes, total }: { name: string; price: string; classes: string; total: string }) {
    await this.prisma.classes.create({
      data: {
        name,
        price,
        classes,
        total 
      }
    })
  }


}
