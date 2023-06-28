import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(private readonly connection: Connection) { }
  async query() {
    try {
      //crear schema
      const [{ exists }] = await this.connection.query(
        `SELECT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'dbstudentgroup');`,
      );
      if (!exists) {
        await this.connection.query(`CREATE SCHEMA dbstudentgroup`);
        //crear tabla usuario
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.user (
                        user_id SERIAL NOT NULL,
                        username VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        CONSTRAINT user_pkey PRIMARY KEY (user_id)
                      )`,
        );

        //crear tabla students
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.students (
                        student_id SERIAL NOT NULL,
                        dni VARCHAR(100) NOT NULL,
                        name VARCHAR(100) NOT NULL,
                        birth_day Date NOT NULL,
                        CONSTRAINT students_pkey PRIMARY KEY (student_id)
                    )`,
        );

        //crear tabla courses
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.courses (
                        course_id SERIAL NOT NULL,
                        name VARCHAR(100) NOT NULL,
                        description VARCHAR(100) NOT NULL,
                        CONSTRAINT courses_pkey PRIMARY KEY (course_id)
                    )`,
        );
        //crear tabla teacher
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.teacher (
                        teacher_id SERIAL NOT NULL,
                        dni VARCHAR(100) NOT NULL,
                        name VARCHAR(100) NOT NULL,
                        birth_day Date NOT NULL,
                        group_id int not null,
                        CONSTRAINT teacher_pkey PRIMARY KEY (teacher_id)
                    )`,
        );
 
        //crear tabla Groupe
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.groupe (
                        group_id numeric NOT NULL,
                        name VARCHAR(100) NOT NULL,
                        description VARCHAR(100) NOT NULL,
                        class_id int NOT NULL,
                        CONSTRAINT groupe_pkey PRIMARY KEY (group_id)
                    )`,
        );

        //crear tabla CLASS
        await this.connection.query(
          `CREATE TABLE dbstudentgroup.class (
                        class_id numeric NOT NULL,
                        name VARCHAR(100) NOT NULL,
                        max_students Int NOT NULL,
                        CONSTRAINT class_pkey PRIMARY KEY (class_id)
                    )`,
        );

        return Logger.log('Database dbstudentgroup created successfully');
      }
    } catch (error) {
      return Logger.log(error.message);
    }
  }
}
