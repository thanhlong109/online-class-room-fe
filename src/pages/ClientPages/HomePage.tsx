import { useGetCoursesQuery } from '../../services';

const HomePage = () => {
    const { data } = useGetCoursesQuery();
    console.log(data);
    return <div>HomePage</div>;
};

export default HomePage;
