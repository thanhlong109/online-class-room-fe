import { FaUsersLine } from 'react-icons/fa6';
import { FaDiscourse } from 'react-icons/fa6';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { BsCartCheckFill } from 'react-icons/bs';

export const cards = [
    {
        id: 1,
        title: 'Total Users',
        number: 10.928,
        change: +12,
        icon: FaUsersLine,
        iconColor: '#1e81b0',
        iconSize: 30,
        backgroundColor: 'bg-blue-100',
    },
    {
        id: 2,
        title: 'Total Courses',
        number: 8.236,
        change: +2,
        icon: FaDiscourse,
        iconColor: '#5619b3',
        iconSize: 30,
        backgroundColor: 'bg-purple-100',
    },
    {
        id: 3,
        title: 'Revenue',
        number: 6.642,
        change: +18,
        icon: FaMoneyBillTrendUp,
        iconColor: '#fff200',
        iconSize: 30,
        backgroundColor: 'bg-yellow-100',
    },
    {
        id: 4,
        title: 'Orders',
        number: 6.642,
        change: -21,
        icon: BsCartCheckFill,
        iconColor: '#02b88a',
        iconSize: 30,
        backgroundColor: 'bg-green-100',
    },
];
