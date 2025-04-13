"use client";
import { useState } from "react";
import { Loading } from "@components/ui/loading";
import { Header2 } from "@components/ui/title";
import { OuterCard } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { getStudentsProgress } from "@lib/dbController/progress";
import { NotFound } from "@components/ui/notFound";
import { StudentsProgress, SubjectWithUnits, UnitProgress } from "@/types/dashboardData";

export function StudentsDataDashboard({
  schoolName, admissionYear, grade, classNum
}: {
  schoolName?: string,
  admissionYear?: number,
  grade?: number,
  classNum?: number,
}) {
  const today = new Date();
  const thisYear = today.getFullYear();

  const [ schoolNameValue, setschoolNameValue ] = useState(schoolName || "");
  const [ admissionYearValue, setadmissionYearValue ] = useState(admissionYear || thisYear);
  const [ gradeValue, setgradeValue ] = useState(grade || 1);
  const [ classNumValue, setclassNumValue ] = useState(classNum || 1);
  const [ datas, setDatas ] = useState<StudentsProgress[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setschoolNameValue(e.target.value);
  }
  const handleAdmissionYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setadmissionYearValue(Number(e.target.value));
  }
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setgradeValue(Number(e.target.value));
  }
  const handleClassNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setclassNumValue(Number(e.target.value));
  }
  
  const handleFetchData = async() => {
    setIsLoading(true);
    setError(null);
    setDatas([]);
    console.log("読み込み");
    try {
      const res = await getStudentsProgress(
        schoolNameValue,
        admissionYearValue,
        gradeValue,
        classNumValue
      );
      if (res.isSuccess == false) {
        setError(res.messages.other || String(res.values));
      } else {
        setError(null);
      }
      if (res.isSuccess == true && res.values.length > 0) {
        setDatas(res.values);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <OuterCard>
      <Header2 title="各生徒の授業取り組み状況ダッシュボード" />
      <div>
        <div
          className="flex gap-4 items-end rounded-t-md border border-slate-200 p-4"
        >
          <div
            className="basis-1/5"
          >
            <label className="text-xs font-semibold">学校</label>
            <Input 
              type="text" 
              name="school-name" 
              value={ schoolNameValue } 
              onChange={ handleSchoolNameChange }
              className=""
            />
          </div>
          <div
            className="basis-1/5"
          >
            <label className="text-xs font-semibold">入学年度</label>
            <Input 
              type="number" 
              name="admission-year" 
              value={ admissionYearValue }
              onChange={ handleAdmissionYearChange }
            />
          </div>
          <div
            className="basis-1/5"
          >
            <label className="text-xs font-semibold">学年</label>
            <Input 
              type="number" 
              name="grade" 
              value={ gradeValue }
              onChange={ handleGradeChange }
            />
          </div>
          <div
            className="basis-1/5"
          >
            <label className="text-xs font-semibold">クラス(0を指定すると全クラス)</label>
            <Input 
              type="number"
              name="class-number" 
              value={ classNumValue }
              onChange={ handleClassNumChange }
            />
          </div>
          <div
            className="basis-1/5"
          >
            <Button
              onClick={ handleFetchData }
              className="w-full"
            >
              読み込み
            </Button>
          </div>
        </div>
        <div
          className="max-h-[480px] overflow-scroll rounded-b-md border-b border-x p-1"
        >
          <StudentDataTable
            studentsProgress={ datas }
            isLoading={ isLoading }
            error={ error }
          />
        </div>
      </div>
    </OuterCard>
  )
}

function StudentDataTable({
  studentsProgress,
  isLoading,
  error,
}: {
  studentsProgress: StudentsProgress[],
  isLoading: boolean,
  error: string | null,
}) {
  return (
    <table
      className=" table-fixed w-full border-collapse"
    >
      <thead
        className="sticky top-0"
      >
        <tr
          className="bg-white z-20 border-b border-slate-400"
        >
          <th className="sticky left-0 bg-white w-[60px] border-r px-1">番号</th>
          <th className="sticky left-[60px] bg-white w-[120px] border-r px-1">名前</th>
          <th>進捗</th>
        </tr>
      </thead>
      <tbody
        className="divide-y divide-slate-300"
      >
      { 
        isLoading == true 
        && 
        <tr>
          <td colSpan={ 3 }>
            <Loading />
          </td>
        </tr>
      }
      { 
        error != null 
        && 
        <tr>
          <td colSpan={ 3 }>
            <NotFound text={ error } />
          </td>
        </tr>
      }
      {
        studentsProgress.length > 0 
        &&
        studentsProgress.map(student => {
          return (
            <tr
              key={ student.studentId }
              className="odd:bg-white even:bg-slate-100"
            >
              <td
                className="sticky left-0 w-[60px] bg-white z-10 border-r px-1 text-center"
              >
                { student.studentNumber }
              </td>
              <td
                className="sticky left-[60px] bg-white z-10 border-r px-1"
              >
                { student.name }
              </td>
              <td
                className="px-2"
              >
                <ProgressView
                  progress={ student.progress }
                />
              </td>
            </tr>
          )
        }) 
      }
      {
        studentsProgress.length == 0
        &&
        <tr>
          <td colSpan={ 3 }>
            <NotFound text="学校や入学年度を指定してデータを読み込んでください。" />
          </td>
        </tr>
      }
      </tbody>
    </table>
  )
}

function ProgressView({
  progress
}: {
  progress: SubjectWithUnits<UnitProgress>[]
}) {
  return (
    <div>
      {
        progress.map(p => {
          return (
            <div
              key={ p.subjectId }
            >
              <p
                className="text-slate-600 text-xs font-semibold"
              >
                { p.subjectName }
              </p>
              <div
                className="flex gap-1"
              >
                {
                  p.units.map(u => {

                    return (
                      <ProgressTip
                        key={ u.unitId }
                        unitProgress={ u }
                      />
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

function ProgressTip({
  unitProgress
}: {
  unitProgress: UnitProgress
}) {
  let color;
  const progressRatio = Math.round(unitProgress.progress);
  if (progressRatio == 100) {
    color = "bg-sky-400 border-sky-400 text-sky-50";
  } else if (progressRatio >= 66) {
    color = "bg-sky-200 border-sky-400 text-sky-400";
  } else if (progressRatio >= 33) {
    color = "bg-sky-100 border-sky-400 text-sky-400"
  } else {
    color = "border-slate-400 text-slate-400";
  }
  return (
    <div
      className={`flex justify-between text-xs px-1 rounded w-32 border ${ color }`}
    >
      <p className="truncate">{ unitProgress.unitName }</p>
      <p>{ progressRatio }%</p>
    </div>
  )
}