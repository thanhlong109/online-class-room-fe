import { useDispatch, useSelector } from 'react-redux';
import { useGetQuizDetailQuery } from '../../../services/quiz.services';
import { RootState } from '../../../store';
import { QuestionUI } from '../../../components';
import { Button } from '@mui/material';
import {
    gotToNextStep,
    setNextStepCompletedPos,
    setQuestionList,
    setShowAnswer,
    tryAnswerAgain,
} from '../../../slices/learningCourseSlice';
import { useUpdateLastStepCompletedMutation } from '../../../services/registrationCourse.services';
import { useEffect } from 'react';
import { Skeleton } from 'antd';

const LearningQuiz = () => {
    const dispatch = useDispatch();
    const { isShowAnswer, stepActive, quizAnswer, registrationData } = useSelector(
        (state: RootState) => state.learningCourse,
    );
    const { data: quizData, isLoading: isQuizDataLoading } = useGetQuizDetailQuery(
        stepActive.quizId === null || stepActive?.quizId === 1 ? -1 : stepActive?.quizId,
    );

    const [updateLastStepCompleted, { isSuccess: isUpdateLastStepSuccess }] =
        useUpdateLastStepCompletedMutation();

    const correctRate =
        quizAnswer.filter((q) => q.correctAnswer === q.userSelectedAnswer).length /
        quizAnswer.length;

    const handleGoToNext = () => {
        updateLastStepCompleted({
            registrationId: registrationData ? registrationData.registrationId : 0,
            stepId: stepActive.stepId,
        });
    };

    useEffect(() => {
        if (isUpdateLastStepSuccess) {
            dispatch(setNextStepCompletedPos());
            dispatch(gotToNextStep());
        }
    }, [isUpdateLastStepSuccess]);

    useEffect(() => {
        if (quizData) {
            dispatch(setQuestionList(quizData?.questions));
        }
    }, [quizData?.questions]);

    return (
        <div>
            <div className="flex flex-col gap-12 bg-white px-8 py-8">
                {isQuizDataLoading && <Skeleton active />}
                <p className="text-lg font-bold text-[#1677ff]">{quizData?.title}</p>
                {quizData &&
                    quizData.questions.map((question, index) => (
                        <div key={index}>
                            <QuestionUI position={index + 1} question={question} seperator="|" />
                        </div>
                    ))}
                {!isShowAnswer && (
                    <Button
                        variant="outlined"
                        className="self-end"
                        disabled={
                            quizAnswer.length === 0 ||
                            quizAnswer.find((answer) => answer.userSelectedAnswer === -1) !=
                                undefined
                        }
                        onClick={() => dispatch(setShowAnswer(true))}
                    >
                        Kiểm tra
                    </Button>
                )}
                {isShowAnswer && correctRate < 0.8 && (
                    <div className="space-x-3 self-end">
                        <span className="text-sm font-bold text-red-500">
                            Bạn phải đúng ít nhất 80% câu hỏi để qua
                        </span>
                        <Button
                            onClick={() => dispatch(tryAnswerAgain())}
                            variant="outlined"
                            color="error"
                        >
                            Thử lại
                        </Button>
                    </div>
                )}
                {isShowAnswer && correctRate >= 0.8 && (
                    <Button
                        onClick={handleGoToNext}
                        className="self-end"
                        variant="outlined"
                        color="success"
                    >
                        Tiếp tục
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LearningQuiz;
