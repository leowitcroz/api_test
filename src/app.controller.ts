import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getStudents() {
    return this.appService.getStudents();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id, @Body() { name, price, classes, total }) {
    return this.appService.update(id, { name, price, classes, total })
  }

  @Patch('paid/:id')
  paidStudent(@Param('id', ParseIntPipe) id, ) {
    return this.appService.paid(id)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.appService.delete(id)
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id) {
    return this.appService.getOne(id);
  }

  @Post()
  async create(@Body() { name, price, classes, total }) {
    return await this.appService.create({ name, price, classes, total });
  }
}
