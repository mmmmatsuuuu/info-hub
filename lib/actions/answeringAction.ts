"use server"
import { AnswerType, QuizResult, UserAnswer } from "@/types/quiz";
import { getQuiz } from "@lib/dbController/quiz";
import { Message, OperationResult } from "@/types/dbOperation";
import { createQuizResult } from "@lib/dbController/quizResult";

export async function SaveQuizReslut(userAnswer: UserAnswer)
: Promise<OperationResult<QuizResult, Message>> {
  const res: OperationResult<QuizResult, Message> = {
    isSuccess: false,
    values: {
      quizId: "",
      userId: "",
      score: 0,
      pointAllocation: 0,
      answers: [],
    },
    messages: {
      other: "小テストの結果を保存できませんでした。",
    }
  };
  try {
    // データの取得

    const { quizId, userId, answers } = userAnswer;
    const quizRes = await getQuiz(quizId);
    if (quizRes.isSuccess == false) {
      throw new Error("回答に対応する小テストが見つかりませんでした。");
    }
    const quiz = quizRes.values;
    const questions = quiz.questions;
    // 合否の判定
    let pointAllocation = 0; // 配点
    let score = 0; // ユーザの得点

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer:AnswerType = {
        questionId: question.questionId,
        questionType: question.type,
        answer: answers[i].answer,
        correct: false,
        correctAnswer: null,
      }
      pointAllocation++;
      switch (question.type) {
        case "記述式":
          if (question.correct == answer.answer) {
            answer.correct = true;
            score++;
          }
          answer.correctAnswer = question.correct;
          break;
        case "単一選択":
          question.options.map(o => {
            if (String(o.isCorrect) == "true") {
              answer.correctAnswer = o.text;
              if (o.text == answer.answer) {
                answer.correct = true;
                score++;
              }
            }
          });
          break;
        case "複数選択":
          // 正解選択肢を抽出
          const correctOptions = question.options
          .filter(o => String(o.isCorrect) === "true")
          .map(o => o.text)
          .sort();

          // ユーザーの回答をソートして比較（順序は無視）
          const userOptions = answer.answer.slice().sort();

          // 正解選択肢を保存（返却用）
          answer.correctAnswer = correctOptions;

          // 完全一致で正解
          const isCorrectMulti = JSON.stringify(correctOptions) === JSON.stringify(userOptions);
          if (isCorrectMulti) {
            answer.correct = true;
            score++;
          }
          break;
        case "並び換え":
          let correctOrder = question.correctOrder;
          let userOrder = answer.answer.join(" ");
          if (userOrder == correctOrder) {
            answer.correct = true;
            score++;
          }
          answer.correctAnswer = correctOrder;
          break;
        default:
          throw new Error("問題の形式が不正です。");
      }
      res.values.answers.push(answer);
    }
    
    // 結果をデータベースに保存
    const quizResult: QuizResult = {
      quizId: quizId,
      userId: userId,
      score: score,
      pointAllocation: pointAllocation,
      answers: res.values.answers,
    }
    const createRes = await createQuizResult(quizResult);
  
    // 結果をユーザに返却
    res.values.userId = userId;
    res.values.quizId = quizId;
    res.values.score = score;
    res.values.pointAllocation = pointAllocation;
    res.isSuccess = true;
    res.messages.other = "小テストの結果を保存しました。";
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  }

}