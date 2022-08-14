import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { nanoid } from 'nanoid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson({ name, startDate, endDate }: CreateLessonInput) {
    const lesson = this.lessonRepository.create({
      id: nanoid(),
      name,
      startDate,
      endDate,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string) {
    return this.lessonRepository.findOneBy({ id });
  }
}
