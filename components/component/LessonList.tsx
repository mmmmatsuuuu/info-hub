import { prisma } from '@lib/prisma';

export default async function LessonList({ subjectId }: { subjectId: string }) {
  const LessonList = await prisma.subject.findUnique({
    where: {
      subject_id: subjectId,
    },
    include: {
      Units: {
        include: {
          Lessons: {
            orderBy: {
              lesson_id: 'asc'
            }
          }
        },
        orderBy: {
          unit_id: 'asc'
        }
      },
    },
  });

  return (
    <div
      className='' 
    >
      {LessonList?.Units.map((unit) => {
        return (
          <div
            key={unit.unit_id}
          >
            <h2
              className='text-2xl font-bold text-gray-800 mt-8 mb-2'
            >
              {unit.unit_name}
            </h2>
            <p className='text-gray-600'>
              {unit.description}
            </p>
            {unit.Lessons.map((lesson) => {
              return (
                <div
                  key={lesson.lesson_id}
                  className='bg-white shadow-sm rounded-md p-4 mt-4 flex'
                >
                  <h3
                    className='grow text-lg font-bold text-gray-800'
                  >
                    {`${lesson.lesson_id} - ${lesson.title}`}
                  </h3>
                  <div
                    className='text-gray-600'
                  >
                    <div>
                      実施回数: 13回
                    </div>
                    <div>
                      小テスト最高得点: 100点
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}