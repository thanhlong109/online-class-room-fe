import { AccordionSection, QuestionUI, RenderRichText, Video } from '../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetCourseIDQuery } from '../../../services';
import { useGetQuizDetailQuery } from '../../../services/quiz.services';
import { Skeleton } from 'antd';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    LessionType,
    gotToNextStep,
    setLastStepCompleted,
    setLearingCourse,
    setNextStepCompletedPos,
    setRegistrationData,
    setShowAnswer,
    setStepActiveByStepId,
    tryAnswerAgain,
} from '../../../slices/learningCourseSlice';
import { RootState } from '../../../store';
import {
    useCheckRegistrationCourseQuery,
    useGetLastStepCompletedQuery,
    useUpdateLastStepCompletedMutation,
} from '../../../services/registrationCourse.services';

const LearningCoursePage = () => {
    //
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    //
    const courseId = location.pathname.split('/').pop();
    const accountId = useSelector((state: RootState) => state.user.id);

    const registrationId = useSelector((state: RootState) =>
        state.learningCourse.registrationData
            ? state.learningCourse.registrationData.registrationId
            : -1,
    );
    const lastPosCompleted = useSelector(
        (state: RootState) => state.learningCourse.lastPostionCompleted,
    );
    const { isShowAnswer, stepActive, quizAnswer, stepActiveType } = useSelector(
        (state: RootState) => state.learningCourse,
    );

    //
    const {
        data,
        isLoading,
        isSuccess: isGetCourseSuccess,
    } = useGetCourseIDQuery(courseId ? courseId : '');
    const { isSuccess: isGetCheckSuccess, data: checkData } = useCheckRegistrationCourseQuery({
        accountId: accountId ? accountId : '',
        courseId: courseId ? parseInt(courseId) : -1,
    });
    const { isSuccess: isGetLastStepCompletedSuccess, data: lastStepCompletedData } =
        useGetLastStepCompletedQuery(registrationId);
    const {
        data: quizData,
        isLoading: isQuizDataLoading,
        refetch,
    } = useGetQuizDetailQuery(stepActive?.quizId === 1 ? -1 : stepActive?.quizId);

    const [updateLastStepCompleted, { isSuccess: isUpdateLastStepSuccess }] =
        useUpdateLastStepCompletedMutation();

    useEffect(() => {
        if (isGetCheckSuccess) {
            if (checkData?.registrationId) {
                dispatch(setRegistrationData(checkData));
            } else {
                navigate('/*');
            }
        }
    }, [isGetCheckSuccess]);

    useEffect(() => {
        if (isGetCourseSuccess && data) {
            dispatch(setLearingCourse(data));
        }
    }, [isGetCourseSuccess]);

    useEffect(() => {
        if (isGetLastStepCompletedSuccess && isGetCourseSuccess) {
            if (lastStepCompletedData.stepId) {
                dispatch(setLastStepCompleted(lastStepCompletedData.stepId));
                dispatch(setStepActiveByStepId(lastStepCompletedData.stepId));
                dispatch(gotToNextStep());
            }
        }
    }, [isGetLastStepCompletedSuccess, isGetCourseSuccess, lastStepCompletedData]);

    useEffect(() => {
        if (stepActive?.quizId != 1) {
            refetch();
        }
    }, [stepActive]);

    useEffect(() => {
        if (isUpdateLastStepSuccess) {
            dispatch(setNextStepCompletedPos());
            dispatch(gotToNextStep());
        }
    }, [isUpdateLastStepSuccess]);

    const handleGoToNext = () => {
        updateLastStepCompleted({ registrationId: registrationId, stepId: stepActive.stepId });
    };

    const correctRate =
        quizAnswer.filter((q) => q.correctAnswer === q.userSelectedAnswer).length /
        quizAnswer.length;

    return (
        <>
            <div className="flex bg-[#f7f9fa]">
                <div className="flex-1  ">
                    <div className="flex-1  px-2 py-8">
                        {(isLoading || isQuizDataLoading) && <Skeleton active />}
                        {!isLoading && stepActiveType === LessionType.VIDEO && (
                            <Video src={stepActive?.videoUrl} />
                        )}
                        {!isLoading &&
                            !isQuizDataLoading &&
                            stepActiveType === LessionType.QUIZ && (
                                <div className="flex flex-col gap-12 bg-white px-8 py-8">
                                    <p className="text-lg font-bold text-[#1677ff]">
                                        {quizData?.title}
                                    </p>
                                    {quizData &&
                                        quizData.questions.map((question, index) => (
                                            <div key={index}>
                                                <QuestionUI
                                                    position={index + 1}
                                                    question={question}
                                                    seperator="|"
                                                />
                                            </div>
                                        ))}
                                    {!isShowAnswer && (
                                        <Button
                                            variant="outlined"
                                            className="self-end"
                                            disabled={
                                                quizAnswer.find(
                                                    (answer) => answer.userSelectedAnswer === -1,
                                                ) != undefined
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
                            )}
                    </div>
                    <div className="flex flex-col gap-4 px-4 py-4">
                        <div className="bg-white ">
                            <p className="mb-2 font-bold text-[#2d2f31] underline">Miêu tả</p>
                            <RenderRichText
                                jsonData={stepActive ? stepActive.stepDescription : ''}
                            />
                        </div>
                        {stepActiveType === LessionType.VIDEO && (
                            <Button
                                className="self-end"
                                onClick={handleGoToNext}
                                variant="outlined"
                            >
                                Tiếp tục
                            </Button>
                        )}
                    </div>
                </div>
                {data && stepActive && (
                    <div className="py-2">
                        <AccordionSection
                            lastPosition={lastPosCompleted + 1}
                            sections={data.sections}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default LearningCoursePage;
