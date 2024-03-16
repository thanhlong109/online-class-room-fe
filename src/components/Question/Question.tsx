import { Radio, Typography } from 'antd';
import { Question } from '../../types/Question.type';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setQuestionAnswer } from '../../slices/learningCourseSlice';

const answerPrefix: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'];

export interface QuestionProps {
    question: Question;
    seperator: string;
    position: number;
}

const QuestionUI = ({ question, seperator, position }: QuestionProps) => {
    const { anwser, correctAnwser, questionTitle, questionId } = question;
    const isShowAnswer = useSelector((state: RootState) => state.learningCourse.isShowAnswer);
    //const stepActive = useSelector((state: RootState) => state.learningCourse.stepActive);
    const dispatch = useDispatch();
    const questionData = useSelector((state: RootState) =>
        state.learningCourse.quizAnswer.find((q) => q.questionId === question.questionId),
    );
    useEffect(() => {
        dispatch(
            setQuestionAnswer({
                correctAnswer: correctAnwser,
                questionId: questionId,
                userSelectedAnswer: -1,
            }),
        );
    }, [question]);
    return (
        <div className="flex flex-col gap-8">
            <p className="text-base font-medium text-[#1677ff]">{`Câu ${position}: ${questionTitle}`}</p>
            <Radio.Group
                className="grid grid-cols-2 gap-8 px-4"
                onChange={(e) => {
                    if (questionData) {
                        dispatch(
                            setQuestionAnswer({
                                ...questionData,
                                userSelectedAnswer: e.target.value,
                            }),
                        );
                    }
                }}
                value={questionData?.userSelectedAnswer}
                disabled={isShowAnswer}
            >
                {anwser
                    .split(seperator)
                    .filter((question) => question.length > 0)
                    .map((answer, index) => (
                        <label
                            htmlFor={`q${question.questionId}a${index}`}
                            key={index}
                            className="flex cursor-pointer items-center bg-[#f7f9fa] py-4 pl-4 pr-2"
                        >
                            <div className="flex flex-1 items-center justify-between gap-2 pr-2">
                                <div className="flex items-start gap-2">
                                    <Typography.Title level={5}>
                                        {index < answerPrefix.length
                                            ? answerPrefix[index] + '.'
                                            : ''}
                                    </Typography.Title>
                                    <Typography.Text className="!mt-0 flex-1 ">
                                        {answer}
                                    </Typography.Text>
                                </div>
                                <Radio
                                    id={`q${question.questionId}a${index}`}
                                    value={index}
                                    checked={questionData?.userSelectedAnswer === index}
                                />
                            </div>

                            {isShowAnswer && questionData?.correctAnswer === index && (
                                <CheckCircleIcon className="font-base text-[#52c41a]" />
                            )}
                            {isShowAnswer &&
                                questionData?.correctAnswer != index &&
                                questionData?.userSelectedAnswer === index && (
                                    <CancelIcon className="font-base text-[#ff4d4f]" />
                                )}
                        </label>
                    ))}
            </Radio.Group>
        </div>
    );
};

export default QuestionUI;
