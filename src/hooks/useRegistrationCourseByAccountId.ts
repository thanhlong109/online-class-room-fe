import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { useGetRegisterCourseByAccountIdQuery } from '../services/registrationCourse.services';
import { RegistrationCourse } from '../types/RegistrationCourse.type';
import { useSelector } from 'react-redux';

// export const useCheckCourseIsInRegistrationCourse = (courseId: number | undefined) => {
//     const accountId = useSelector((state: RootState) => state.user.id);
//     const [inRegistrationCourse, setInRegistrationCourse] = useState(false);
//     const { isSuccess, data } = useGetRegisterCourseByAccountIdQuery(accountId);
//     useEffect(() => {
//         if (isSuccess && courseId) {
//             setInRegistrationCourse(checkCourseInRegistrationCourse(data, courseId));
//         }
//     }, [isSuccess]);
//     return inRegistrationCourse;
// };

// const checkCourseInRegistrationCourse = (
//     registrationCourses: RegistrationCourse[],
//     courseIdCheck: number,
// ) => {
//     const found = registrationCourses.find(({ courseId }) => courseId === courseIdCheck);
//     return found ? true : false;
// };
export const useRegistrationCourseByAccountId = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const [registrationCourses, setRegistrationCourses] = useState<RegistrationCourse[]>([]);
    const { isSuccess, data } = useGetRegisterCourseByAccountIdQuery(accountId);

    useEffect(() => {
        if (isSuccess && data) {
            setRegistrationCourses(data);
        }
    }, [isSuccess, data]);

    return registrationCourses;
};
