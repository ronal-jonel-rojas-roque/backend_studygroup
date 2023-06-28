import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
