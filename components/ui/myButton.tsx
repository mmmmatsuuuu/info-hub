'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button' // UIライブラリ使ってる場合

export function BackButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()}>
      戻る
    </Button>
  )
}