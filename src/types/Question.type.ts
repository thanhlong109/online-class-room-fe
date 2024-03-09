export interface Question {
    questionId: number;
    quizId: number;
    questionTitle: string;
    correctAnwser: number;
    anwser: string;
    quiz: any;
    answerHistories: any[];
}

export interface QuestionRequest {
    questionTitle: string;
    correctAnwser: number;
    anwser: string;
}
