"use client";

import { SubjectWithUnitsForMypage } from "@/types/dbOperation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Badgeをインポート
import { Video, FileQuestion } from "lucide-react";

interface MypageProps {
  subjects: SubjectWithUnitsForMypage[];
  contentActivity: {
    videos: { [contentId: string]: { playCount: number } };
    quizzes: { [contentId: string]: { clickCount: number } };
  };
}

export default function Mypage({ subjects, contentActivity }: MypageProps) {
  return (
      <Accordion type="multiple" className="w-full space-y-4">
        {subjects.map((subject) => (
          <AccordionItem key={subject.subjectId} value={`subject-${subject.subjectId}`}>
            <AccordionTrigger className="text-xl font-semibold">{subject.subjectName}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="multiple" className="w-full space-y-2 pl-4">
                {subject.units.map((unit) => (
                  <AccordionItem key={unit.unitId} value={`unit-${unit.unitId}`}>
                    <AccordionTrigger className="text-lg">{unit.unitName}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {unit.lessons.map((lesson) => (
                        <Card key={lesson.lessonId}>
                          <CardHeader>
                            <CardTitle>{lesson.title}</CardTitle>
                            <CardDescription>{lesson.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px]">種類</TableHead>
                                  <TableHead>コンテンツ名</TableHead>
                                  <TableHead className="text-right">回数</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {lesson.contents.map((content) => (
                                  <TableRow key={content.contentId}>
                                    <TableCell className="font-medium">
                                      {content.type === 'movie' ? <Video className="h-5 w-5" /> : <FileQuestion className="h-5 w-5" />}
                                    </TableCell>
                                    <TableCell>{content.title}</TableCell>
                                    <TableCell className="text-right">
                                      <Badge variant="secondary" className="px-3 w-[80px] items-center justify-center">
                                        <span className="text-lg font-bold">
                                          {content.type === 'movie'
                                            ? contentActivity.videos[content.contentId]?.playCount || 0
                                            : contentActivity.quizzes[content.contentId]?.clickCount || 0}
                                        </span>
                                        <span className="ml-1 text-xs">回</span>
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
  );
}
