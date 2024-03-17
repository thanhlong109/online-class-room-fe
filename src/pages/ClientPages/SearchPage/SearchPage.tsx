import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../services/course.services';
import { Course } from '../../../types/Course.type';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const navigate = useNavigate();
    const { id: searchTerm } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: fetchedCourses,
        isLoading,
        error,
    } = useGetAllCoursesQuery({
        pageNumber: currentPage,
        pageSize: 4,
        search: searchTerm || '',
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (isLoading) return <div className="text-center">Đang tải trang...</div>;
    if (error)
        return <div className="text-center text-red-500">Khóa học bạn tìm kiếm không có.</div>;

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {fetchedCourses?.courses.map((course: Course) => (
                    <div
                        key={course.courseId}
                        className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                        onClick={() => navigate(`/courses/${course.courseId}`)}
                    >                      
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <p className="my-2 text-xl font-bold">
                                Giá tiền: {course.price.toLocaleString()} VND
                            </p>
                            <p className="text-sm">
                                Tổng thời gian: {Math.round(course.totalDuration / 60)} phút
                            </p>
                            <p className="text-sm">
                                Cập nhật mới nhất: {
                                new Date(course.updateAt).toLocaleDateString('en-GB')
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {fetchedCourses && fetchedCourses.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                    {Array.from({ length: fetchedCourses.totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                className={`rounded-lg px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ),
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
