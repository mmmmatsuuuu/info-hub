export default async function MyPage({
  params
}: {
  params: Promise<{ user_id: string }>
}) {
  return(
    <div>
      ユーザーページ
    </div>
  )
}