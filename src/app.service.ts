import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) { }

  async getStudents() {
    const students = await this.prisma.classes.findMany();
    let totalMoney = 0;

    // soma total das aulas, ou seja o valor a receber
    for(let i =0; i < students.length; i++){
      totalMoney += Number(students[i].total)
    }

    return {
      students,
      totalMoney
    }
  }

  async getOne(id: number,) {
    return await this.prisma.classes.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, data) {
    await this.exist(id)

    const student = await this.getOne(id);

    const price = data.price ? data.price : student.price

    data.total = (Number(data.classes) * Number(price)).toString();

    return this.prisma.classes.update({
      data:data,
      where:{
        id
      }
    })
  }

  async delete(id: number){
    await this.exist(id)

    return this.prisma.classes.delete({
      where: {
        id
      }
    })
  }

  async create({ name, price, classes, total }: { name: string; price: string; classes: string; total: string }) {
    
    total = "";
   
    await this.prisma.classes.create({
      data: {
        name,
        price,
        classes,
        total:(Number(classes) * Number(price)).toString()
      }
    })
  }

  async exist(id: number) {
    if (!(await this.getOne(id))) {
      throw new NotFoundException('The user doesnt exist');
    }
  }
}
