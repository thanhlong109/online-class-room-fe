import { AccordionSection, RenderRichText, Video } from '../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetCourseIDQuery } from '../../../services';
import { Skeleton, Typography } from 'antd';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import congratulation1 from '../../../assets/congratulationAnimation1.json';
import {
    LessionType,
    gotToNextStep,
    setLastStepCompleted,
    setLearingCourse,
    setNextStepCompletedPos,
    setRegistrationData,
    setStepActiveByStepId,
} from '../../../slices/learningCourseSlice';
import { RootState } from '../../../store';
import {
    useCheckRegistrationCourseQuery,
    useGetLastStepCompletedQuery,
    useUpdateLastStepCompletedMutation,
} from '../../../services/registrationCourse.services';
import LearningQuiz from './LearningQuiz';
import Lottie from 'lottie-react';

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
    const { stepActive, stepActiveType, isDone } = useSelector(
        (state: RootState) => state.learningCourse,
    );

    //get course
    const {
        data,
        isLoading,
        isSuccess: isGetCourseSuccess,
    } = useGetCourseIDQuery(courseId ? courseId : '');

    //check user is registered or not
    const { isSuccess: isGetCheckSuccess, data: checkData } = useCheckRegistrationCourseQuery({
        accountId: accountId ? accountId : '',
        courseId: courseId ? parseInt(courseId) : -1,
    });

    //get last step
    const { isSuccess: isGetLastStepCompletedSuccess, data: lastStepCompletedData } =
        useGetLastStepCompletedQuery(registrationId);

    //get quiz data

    //update last step
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
        if (isUpdateLastStepSuccess) {
            dispatch(setNextStepCompletedPos());
            dispatch(gotToNextStep());
        }
    }, [isUpdateLastStepSuccess]);

    const handleGoToNext = () => {
        updateLastStepCompleted({ registrationId: registrationId, stepId: stepActive.stepId });
    };

    return (
        <>
            <div className=" bg-[#f7f9fa]">
                <div className="flex">
                    {isDone && (
                        <div className="flex-1 p-10">
                            <div className="flex h-full bg-white p-10">
                                <div className=" m-auto flex flex-col items-center">
                                    <Lottie
                                        className="w-[200px]"
                                        animationData={congratulation1}
                                        loop={false}
                                    />

                                    <Typography.Text className="text-xl italic text-[#ffba00]">
                                        <strong>Chúc mừng bạn đã hoàn thành khóa học</strong>
                                    </Typography.Text>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isDone && (
                        <div className="flex-1  ">
                            <div className="flex-1  px-2 py-8">
                                {isLoading && <Skeleton active />}
                                {!isLoading && stepActiveType === LessionType.VIDEO && (
                                    <Video src={stepActive?.videoUrl} />
                                )}
                                {!isLoading && stepActiveType === LessionType.QUIZ && (
                                    <LearningQuiz />
                                )}
                            </div>
                            <div className="flex flex-col gap-4 px-4 py-4">
                                <div className="bg-white ">
                                    <p className="mb-2 font-bold text-[#2d2f31] underline">
                                        Miêu tả
                                    </p>
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
                    )}
                    {data && stepActive && (
                        <div className="py-2">
                            <AccordionSection
                                lastPosition={lastPosCompleted + 1}
                                sections={data.sections}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LearningCoursePage;
