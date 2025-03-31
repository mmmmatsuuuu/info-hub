export default async function QuizPage({
  params
}: {
  params: Promise<{ quiz_id: string }>
}) {
  return (
    <div>
      { (await params).quiz_id }小テストのページです。
    </div>
  )
}