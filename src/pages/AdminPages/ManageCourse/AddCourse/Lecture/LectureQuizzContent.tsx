import { useEffect, useState } from 'react';
import { EditableText, MultipleQuestionInput } from '../../../../../components';
import {
    useAddQuizMutation,
    useGetQuizDetailQuery,
    useUpdateQuizMutation,
} from '../../../../../services/quiz.services';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteQuestion,
    updateQuizTile,
    upsertQuestion,
    upsertQuiz,
} from '../../../../../slices/quizSlice';
import { Step } from '../../../../../types/Course.type';
import { useUpdateStepMutation } from '../../../../../services/step.services';
import { setStep } from '../../../../../slices/courseSlice';
import { RootState } from '../../../../../store';
import { Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Question } from '../../../../../types/Question.type';
import { useDeleteQuestionMutation } from '../../../../../services/question.services';

export interface LectureQuizzContentProps {
    step: Step;
}

const LectureQuizzContent = ({ step }: LectureQuizzContentProps) => {
    const { quizId } = step;
    const dispatch = useDispatch();
    const [isCreateNew, setIsCreateNew] = useState(quizId === 1);
    const [questionDelete, setQuestionDelete] = useState(0);
    const quizState = useSelector((state: RootState) =>
        state.quiz.quizList.find((quiz) => quiz.quizId === quizId && !isCreateNew),
    );
    const { isSuccess: isGetQuizSuccess, data: getQuizData } = useGetQuizDetailQuery(
        quizId === 1 ? -1 : quizId,
    );
    const [
        updateStepMutation,
        { isSuccess: isUpdateSucess, isLoading: isUpdateLoading, data: updateData },
    ] = useUpdateStepMutation();
    const [addQuizzMutation, { isSuccess: isAddQuizzSuccess, data: addQuizzData }] =
        useAddQuizMutation();
    const [updateQuizMutation, { isSuccess: isUpdateQuizSuccess, data: updateQuizData }] =
        useUpdateQuizMutation();
    const [delteteQuestionMutation, { isSuccess: isDeleteQuestionSuccess }] =
        useDeleteQuestionMutation();
    const [titleTemp, setTitleTemp] = useState('');

    const handleOnClickDone = () => {
        if (isCreateNew) {
            addQuizzMutation({
                title: titleTemp,
                description: 'string',
            });
        } else {
            if (quizState) {
                updateQuizMutation({
                    ...quizState,
                });
            }
        }
    };

    const initalQuestionData: Question = {
        answerHistories: [],
        anwser: '',
        correctAnwser: 0,
        questionId: -1,
        questionTitle: '',
        quiz: '',
        quizId: quizId,
    };

    const handleOnAddQuestion = () => {
        dispatch(upsertQuestion({ question: initalQuestionData, quizId: quizId }));
    };
    const handleOnDeleteQuestion = (questionId: number) => {
        setQuestionDelete(questionId);
        delteteQuestionMutation(questionId);
    };

    const handleUpdateQuestions = () => {
        if (quizState) {
            updateQuizMutation({
                description: '',
                quizId: quizId,
                questions: quizState.questions,
                title: quizState.title,
            });
        }
    };

    useEffect(() => {
        if (isUpdateQuizSuccess && updateQuizData) {
            dispatch(upsertQuiz(updateQuizData));
        }
    }, [isUpdateQuizSuccess]);

    useEffect(() => {
        if (isGetQuizSuccess && getQuizData) {
            console.log(getQuizData);
            dispatch(upsertQuiz(getQuizData));
        }
    }, [isGetQuizSuccess]);

    useEffect(() => {
        if (isAddQuizzSuccess && addQuizzData) {
            console.log(addQuizzData);
            setIsCreateNew(false);
            dispatch(upsertQuiz(addQuizzData));
            updateStepMutation({
                duration: step!.duration,
                position: step!.position,
                quizId: addQuizzData.quizId,
                stepDescription: step!.stepDescription,
                stepId: step!.stepId,
                title: step!.title,
                videoUrl: step!.videoUrl,
            });
        }
    }, [isAddQuizzSuccess]);

    useEffect(() => {
        if (isUpdateSucess && updateData) {
            dispatch(setStep(updateData));
        }
    }, [isUpdateSucess]);

    useEffect(() => {
        if (isDeleteQuestionSuccess) {
            dispatch(deleteQuestion({ quizId: quizId, questionId: questionDelete }));
        }
    }, [isDeleteQuestionSuccess]);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <p className="w-fit font-medium text-[#1976d2]">Tiêu đề:</p>
                <div className="flex-1">
                    <EditableText
                        isLoading={isUpdateLoading}
                        maxLength={76}
                        showCount
                        textCSS="font-medium text-base"
                        edit={isCreateNew}
                        value={isCreateNew ? titleTemp : quizState?.title ? quizState?.title : ''}
                        onDoneClick={handleOnClickDone}
                        onChage={(value) => {
                            if (typeof value === 'string') {
                                if (isCreateNew) {
                                    setTitleTemp(value);
                                } else {
                                    dispatch(updateQuizTile({ quizId: quizId, title: value }));
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6 px-6">
                {quizState?.questions.map((question, index) => (
                    <MultipleQuestionInput
                        maxInputItem={10}
                        onDataChange={(q) => {
                            dispatch(upsertQuestion({ quizId: quizId, question: q }));
                        }}
                        seperator="|"
                        values={question}
                        key={index}
                        position={index + 1}
                        onDoneClick={handleUpdateQuestions}
                        onDeleteClick={() => handleOnDeleteQuestion(question.questionId)}
                        isCreate={question.questionId === -1}
                    />
                ))}

                <MuiButton
                    onClick={handleOnAddQuestion}
                    className="!w-fit justify-start"
                    variant="text"
                    size="small"
                    style={{ fontSize: '12px' }}
                    startIcon={<AddIcon />}
                >
                    Thêm câu hỏi
                </MuiButton>
            </div>
        </div>
    );
};

export default LectureQuizzContent;
