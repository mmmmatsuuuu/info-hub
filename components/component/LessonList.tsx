import { Header2, Header3 } from '@components/ui/title';
import { getSubjectWithPublicUnits } from '@lib/dbController/subject';
import { LessonCard, SmallLessonCard } from './LessonCard';
import { NotFound } from '@components/ui/notFound';

export async function LessonList({ subjectId }: { subjectId: string }) {
  const res = await getSubjectWithPublicUnits(subjectId);

  if (res.isSuccess == false) {
    return (
      <NotFound
        text='データの取得に失敗しました。もう一度読み込み直してください。'
      />
    )
  }
  if (!res.values) {
    return (
      <NotFound
        text='データの取得に失敗しました。もう一度読み込み直してください。'
      />
    )
  }

  const subject = res.values;

  return (
    <div
      className='' 
    >
      {subject.units.map((unit) => {
        return (
          <div
            key={unit.unitId}
            className='p-2 py-4 border-b border-gray-400 pb-10'
          >
            <Header2 title={ unit.unitName } />
            <p className='text-gray-600'>
              {unit.description}
            </p>
            <div
              className='flex flex-col gap-4'
            >
              {unit.lessons.map((lesson) => {
                return (
                  <LessonCard
                    key={ lesson.lessonId }
                    lessonId={ lesson.lessonId }
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
  const res = await getSubjectWithPublicUnits(subjectId);

  if (res.isSuccess == false) {
    return (
      <NotFound
        text='データの取得に失敗しました。もう一度読み込み直してください。'
      />
    )
  }
  if (!res.values) {
    return (
      <NotFound
        text='データの取得に失敗しました。もう一度読み込み直してください。'
      />
    )
  }

  const subject = res.values;

  return (
    <div
      className='border-l border-slate-400 p-1' 
    >
      {subject.units.map((unit) => {
        return (
          <div
            key={unit.unitId}
            className='p-2 border-b border-slate-300'
          >
            <Header3 title={ unit.unitName } />
            <div
              className='flex flex-col gap-1'
            >
              {unit.lessons.map((lesson) => {
                return (
                  <SmallLessonCard
                    key={ lesson.lessonId }
                    lessonId={ lesson.lessonId }
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