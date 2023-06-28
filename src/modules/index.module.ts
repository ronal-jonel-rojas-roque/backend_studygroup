import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class/class.module';
import { CoursesModule } from './courses/courses/courses.module';
import { GroupeModule } from './groupe/groupe/groupe.module';
import { StudentsModule } from './students/students/students.module';
import { TeacherModule } from './teachers/teacher/teacher.module';

@Module({
  imports: [ClassModule, UserModule, CoursesModule, GroupeModule, StudentsModule, TeacherModule],
})
export class IndexModule {}
