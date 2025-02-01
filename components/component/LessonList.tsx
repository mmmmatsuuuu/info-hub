import { Header2 } from '@components/ui/title';
import { getSubject } from '@lib/dbController';
import { LessonCard } from './LessonCard';

export default async function LessonList({ subjectId }: { subjectId: string }) {
  const subject = await getSubject(subjectId);

  if (!subject) {
    return null;
  }

  return (
    <div
      className='' 
    >
      {subject.Units.map((unit) => {
        return (
          <div
            key={unit.unit_id}
            className='p-2 py-4 border-b'
          >
            <Header2 title={ unit.unit_name } />
            <p className='text-gray-600'>
              {unit.description}
            </p>
            <div
              className='flex flex-col gap-4'
            >
              {unit.Lessons.map((lesson) => {
                return (
                  <LessonCard
                    key={ lesson.lesson_id }
                    lessonId={ lesson.lesson_id }
                    title={ lesson.title }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}