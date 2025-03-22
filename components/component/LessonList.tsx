import { Header2, Header3 } from '@components/ui/title';
import { getSubjectWithPublicUnits } from '@lib/dbController/subject';
import { LessonCard, SmallLessonCard } from './LessonCard';

export async function LessonList({ subjectId }: { subjectId: string }) {
  const subject = await getSubjectWithPublicUnits(subjectId);

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
            className='p-2 py-4 border-b border-gray-400 pb-10'
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

export async function SmallLessonList({ subjectId }: { subjectId: string }) {
  const subject = await getSubjectWithPublicUnits(subjectId);

  if (!subject) {
    return null;
  }

  return (
    <div
      className='border-l border-slate-400 p-1' 
    >
      {subject.Units.map((unit) => {
        return (
          <div
            key={unit.unit_id}
            className='p-2 border-b border-slate-300'
          >
            <Header3 title={ unit.unit_name } />
            <div
              className='flex flex-col gap-1'
            >
              {unit.Lessons.map((lesson) => {
                return (
                  <SmallLessonCard
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