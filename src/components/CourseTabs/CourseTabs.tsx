import { Tab, Tabs, styled } from '@mui/material';
import { useState } from 'react';
import { CourseCard } from '..';

const CourseTabs = () => {
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
                <h1 className="pl-4 text-2xl font-bold">Our top pick for you</h1>
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
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                    <StylingTab label={<CourseCard />} />
                </Tabs>
            </div>
        </>
    );
};

export default CourseTabs;
