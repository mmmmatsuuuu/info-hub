"use client";

import { useUserActivityStore } from "@/hooks/useUserActivityStore";
import { SubjectWithUnitsForMypage } from "@/types/dbOperation";
import Mypage from "@/components/component/common/Mypage";

interface MypageClientProps {
  subjects: SubjectWithUnitsForMypage[];
}

export default function MypageClient({ subjects }: MypageClientProps) {
  const { contentActivity } = useUserActivityStore();

  return (
      <Mypage subjects={subjects} contentActivity={contentActivity} />
  );
}
