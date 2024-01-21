import { Paper, Tab, Tabs, styled } from '@mui/material';
import { CourseCard, CourseTabs } from '../../components';
import { useState } from 'react';
import { Carousel } from 'antd';

const imgBaner = [
    'https://img-b.udemycdn.com/notices/featured_carousel_slide/image/b677b28c-9faf-4439-b042-2a2add2828ef.jpg',
    'https://img-b.udemycdn.com/notices/featured_carousel_slide/image/9ea59bc2-bd61-463e-9ce9-7e71e8e586ae.jpg',
];

const HomePage = () => {
    return (
        <>
            <div className="container flex flex-col gap-16 text-[#2d2f31]">
                <div>
                    <Carousel autoplay autoplaySpeed={3000}>
                        {imgBaner.map((url, index) => (
                            <div key={index} className="relative w-full">
                                <img className="w-full object-cover" src={url} />
                                <div className="absolute left-[10%] top-[10%] hidden md:block ">
                                    <Paper elevation={2}>
                                        <div className="max-w-[400px] bg-white p-4 text-[#2d2f31]">
                                            <h1 className="text-4xl font-bold">Slow and steady</h1>
                                            <p className="mt-4">
                                                Try learning just 5–10 minutes a day. Continue your
                                                course and reach your peak potential.
                                            </p>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <CourseTabs />
                </div>
                <div>
                    <CourseTabs />
                </div>
                <div>
                    <CourseTabs />
                </div>
            </div>
        </>
    );
};

export default HomePage;
