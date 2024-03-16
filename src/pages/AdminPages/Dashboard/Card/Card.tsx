import React, { useEffect } from 'react';
import { FaRegIdCard } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { useTotalIncomeQuery, useTotalOrderQuery } from '../../../../services/order.services';
import { useCountTotalAccountsQuery } from '../../../../services/account.services';
import { useCountTotalCoursesQuery } from '../../../../services/course.services';
interface CardItem {
    id: number;
    title: string;
    number: number;
    change: number;
    icon?: IconType;
    iconColor?: string;
    iconSize?: number;
    backgroundColor?: string;
}
interface CardProps {
    item: CardItem;
}
const Card: React.FC<CardProps> = ({ item }) => {
    const IconComponent = item.icon || FaRegIdCard;
    const {
        data: incomeData,
        isLoading: incomeLoading,
        isError: incomeError,
    } = useTotalIncomeQuery();
    const { data: orderData, isLoading: orderLoading, isError: orderError } = useTotalOrderQuery();
    const {
        data: totalAccounts,
        isLoading: accountsLoading,
        isError: accountsError,
    } = useCountTotalAccountsQuery();
    const {
        data: totalCourses,
        isLoading: coursesLoading,
        isError: coursesError,
    } = useCountTotalCoursesQuery();

    useEffect(() => {
        // Nếu muốn thực hiện các hành động khác khi dữ liệu được fetch, bạn có thể thực hiện ở đây
    }, [
        incomeData,
        incomeLoading,
        incomeError,
        orderData,
        orderLoading,
        orderError,
        accountsLoading,
        accountsError,
        coursesLoading,
        coursesError,
    ]);

    let number: number;

    if (item.title === 'Revenue') {
        number = incomeData || 0;
    } else if (item.title === 'Orders') {
        number = orderData || 0;
    } else if (item.title === 'Total Users') {
        number = totalAccounts || 0;
    } else if (item.title === 'Total Courses') {
        number = totalCourses || 0;
    } else {
        number = item.number;
    }

    if (incomeLoading || orderLoading) return <div>Loading...</div>;
    if (incomeError || orderError) return <div>Error fetching data</div>;

    return (
        <div className="flex w-[100%] cursor-pointer flex-row gap-2 rounded-lg bg-[#f2f2f2] hover:bg-orange-300">
            <div className="flex flex-col gap-4 p-2 ">
                <span className="ml-4 font-bold">{item.title}</span>
                <span className="ml-4 text-3xl ">{number}</span>
                <span className="">
                    <span className={item.change < 0 ? 'text-red-500' : 'text-green-500'}>
                        {item.change > 0 ? '+' : ''}
                        {item.change}%
                    </span>{' '}
                    {item.change > 0 ? 'more' : 'less'} than previous week
                </span>
            </div>
            <div className="icon mt-3 border-none pr-2 ">
                <div className={`rounded-full ${item.backgroundColor || 'bg-orange-100'} p-2`}>
                    <IconComponent size={item.iconSize || 30} color={item.iconColor || '#eb9b34'} />
                </div>
            </div>
        </div>
    );
};

export default Card;
