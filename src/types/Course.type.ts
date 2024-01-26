export interface Course {
    courseId: number;
    description: string;
    imageUrl: string;
    videoPreviewUrl: string;
    price: number;
    salesCampaign: number;
    title: string;
    isPublic: boolean;
    createAt: string;
    publicAt: string;
    updateAt: string;
    totalDuration: number;
    courseIsActive: boolean;
    knowdledgeDescription: string;
    courseCategories: any[];
    orders: any[];
    registrationCourses: any[];
    sections: any[];
    wishLists: any[];
}
