import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChildAccountRespone } from '../types/Account.type';
import { RegistrationCourse } from '../types/RegistrationCourse.type';

export interface ParentSliceProps {
    childsData: ChildAccountRespone[];
    registrationCourses:
        | [
              {
                  childId: string;
                  courses: RegistrationCourse[];
              },
          ]
        | null;
    selectingAccountID: string;
}

const initialState: ParentSliceProps = {
    childsData: [],
    registrationCourses: null,
    selectingAccountID: '',
};

export const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        setChildsAccountId: (state, action: PayloadAction<ChildAccountRespone[]>) => {
            state.childsData = action.payload;
        },
        upsertRestrationCourses: (
            state,
            action: PayloadAction<{ childId: string; courses: RegistrationCourse[] }>,
        ) => {
            if (state.registrationCourses) {
                const index = state.registrationCourses.findIndex(
                    (data) => data.childId === action.payload.childId,
                );
                if (index >= 0) {
                    state.registrationCourses[index] = action.payload;
                } else {
                    state.registrationCourses.push(action.payload);
                }
            } else {
                state.registrationCourses = [{ ...action.payload }];
                state.selectingAccountID = action.payload.childId;
            }
        },
        setSelectAccountID: (state, action: PayloadAction<string>) => {
            state.selectingAccountID = action.payload;
        },
    },
});

export const { setChildsAccountId, upsertRestrationCourses, setSelectAccountID } =
    parentSlice.actions;

export default parentSlice.reducer;
