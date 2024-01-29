import { Tab, Tabs, styled } from '@mui/material';
import { useState } from 'react';
import { CourseCard } from '..';
import { Course } from '../../types/Course.type';
import { Skeleton } from 'antd';

interface Props {
    courseList: Course[] | undefined;
    tabsTitle: string;
    isLoading: boolean;
}

const CourseTabs = ({ courseList, tabsTitle, isLoading }: Props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const StylingTab = styled(Tab)({
        textAlign: 'start',
        '&.Mui-selected': {
            color: 'inherit',
        },
        '&.MuiTab-root': {
            color: 'inherit',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s',
            },
        },
    });
    return (
        <>
            <div>
                {isLoading && <Skeleton active />}
                {!isLoading && courseList && (
                    <>
                        <h1 className="pl-4 text-2xl font-bold">{tabsTitle}</h1>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="tabscrollAble"
                            indicatorColor={undefined}
                            style={{ color: 'inherit' }}
                            className="md:mx-[-40px]"
                        >
                            {courseList.map((course, index) => (
                                <StylingTab key={index} label={<CourseCard course={course} />} />
                            ))}
                        </Tabs>
                    </>
                )}
            </div>
        </>
    );
};

export default CourseTabs;
