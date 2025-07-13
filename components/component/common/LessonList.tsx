import { getSubjectWithPublicUnits } from '@lib/dbController/subject';
import { LessonCard, SmallLessonCard } from './LessonCard';
import { NotFound } from '@components/ui/notFound';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      className='flex flex-col gap-4' 
    >
      {subject.units.map((unit) => {
        return (
          <Card
            key={unit.unitId}
            className='p-4'
          >
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='text-xl font-bold text-foreground'>
                { unit.unitName }
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-foreground mb-4'>
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
            </CardContent>
          </Card>
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
      className='p-1 flex flex-col gap-2' 
    >
      {subject.units.map((unit) => {
        return (
          <Card
            key={unit.unitId}
            className='p-2'
          >
            <CardTitle className="text-base font-bold text-foreground mb-2">
              { unit.unitName }
            </CardTitle>
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
          </Card>
        );
      })}
    </div>
  );
}