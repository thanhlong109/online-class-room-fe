import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton, styled } from '@mui/material';
import { Badge, Divider, Drawer, Input, Popover, Tooltip, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FavoritePopover, MyLearningPopover, UserAvatar } from './Components';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Notification } from '../../../components';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Kiểm tra nếu có dữ liệu tìm kiếm mới thực hiện chuyển hướng
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            // Sau khi chuyển hướng, bạn có thể gọi API ở đây bằng cách sử dụng dữ liệu đã nhập
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Kiểm tra nếu người dùng ấn phím Enter
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const location = useLocation();

    useEffect(() => {
        // Reset search input when not on the search page
        if (!location.pathname.startsWith('/search')) {
            setSearchQuery('');
        }
    }, [location]); // Re-run this effect when the location changes

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);

    const wishlistState = useSelector((state: RootState) => state.course.wishList);
    //load user data

    /*const { data, isSuccess, refetch } = useGetUserInfoQuery(
        userLocalData
            ? { email: userLocalData.email, accessToken: userLocalData.accessToken }
            : { email: null, accessToken: null },
    );

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(loadUser());
            dispatch(setUserInfo({ ...data }));
        }
    }, [isSuccess]);

    useEffect(() => {
        refetch();
    }, [userLocalData]);
*/
    //
    const StyledSearch = styled(Input.Search)({
        '.ant-input-wrapper': {
            '.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-dev-only-do-not-override-i1mju1.ant-input-outlined':
                {
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    paddingLeft: '24px',
                },
            '.ant-input-group-addon .ant-btn.ant-btn.css-dev-only-do-not-override-i1mju1.ant-btn-default.ant-btn-lg.ant-btn-icon-only.ant-input-search-button':
                {
                    borderWidth: '1px 1px 1px 0px',
                    borderStartEndRadius: '24px',
                    borderBottomRightRadius: '24px',
                },
            '.css-dev-only-do-not-override-i1mju1.ant-input-group-wrapper-outlined.ant-input-group-addon':
                {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                },
        },
    });

    const [open, setOpen] = useState(false);

    const handleOpenMenuToggle = () => {
        setOpen((pre) => !pre);
    };
    const [loginGoogle, setLoginGoogle] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userLogin');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserAvatar(userData.avatar);
            setLoginGoogle(true);
        }
    }, []);

    return (
        <>
            <header className="max-w-[100vw] shadow-[0_2px_4px_rgb(0,0,0,0.08),0_4px_12px_rgb(0,0,0,0.08)]">
                <div className="container flex h-[76px] items-center justify-between  gap-4 bg-white md:gap-8 ">
                    <div className="md:hidden">
                        <IconButton onClick={handleOpenMenuToggle}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <h1>
                        <Link to={'/'}>
                            <div className="hidden  items-center justify-center md:flex">
                                <img
                                    className="h-[40px]"
                                    src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Fe-black.png?alt=media&token=a0a401b9-6d20-4597-833c-962457c543ac"
                                    alt=""
                                />
                                <img
                                    className="ml-1 h-[32px]"
                                    src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Flogo-black-tail.png?alt=media&token=e65f65a8-94a6-4504-a370-730b122ba42e"
                                    alt=""
                                />
                            </div>
                        </Link>
                    </h1>
                    <div className="hidden cursor-pointer text-[#2d2f31] hover:text-[#a435f0] md:block">
                        <Typography.Title style={{ margin: '0', color: 'inherit' }} level={5}>
                            khám phá
                        </Typography.Title>
                    </div>
                    <StyledSearch
                        allowClear
                        autoFocus
                        className="flex-1 md:max-w-[700px]"
                        placeholder="Tìm kiếm khóa học"
                        size="large"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="hidden cursor-pointer text-[#2d2f31] hover:text-[#a435f0] md:block">
                        <Popover content={<MyLearningPopover />} trigger="hover">
                            <Typography.Title style={{ margin: '0', color: 'inherit' }} level={5}>
                                khóa học của tôi
                            </Typography.Title>
                        </Popover>
                    </div>
                    <div className="hidden items-center justify-between gap-8 md:flex">
                        <div className="cursor-pointer ">
                            <Popover content={<FavoritePopover />} trigger="hover">
                                <IconButton>
                                    <Badge
                                        count={wishlistState.length > 0 ? wishlistState.length : ''}
                                        color="#a435f0"
                                    >
                                        <FavoriteBorderIcon />
                                    </Badge>
                                </IconButton>
                            </Popover>
                        </div>
                        <div className="cursor-pointer">
                            <Notification />
                        </div>
                        {!isLogin && !loginGoogle && (
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    className="!border-[#2d2f31] !text-sm !font-bold !text-[#2d2f31] hover:!bg-[#0000000a]"
                                >
                                    <Link to={'/register'}>Đăng ký</Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    className=" !border-[#2d2f31] !bg-[#2d2f31] !text-sm !font-bold !shadow-none hover:!bg-[#747474]"
                                >
                                    <Link to={'/login'}>Đăng nhập</Link>
                                </Button>
                            </div>
                        )}
                        {/* {isLogin  && (
                            <div>
                                <Tooltip title="Quản lý tài khoản">
                                    <Link to={'/user/12'}>
                                        <UserAvatar className="h-[64px] w-[64px] cursor-pointer md:h-[48px] md:w-[48px]" />
                                    </Link>
                                </Tooltip>
                            </div>
                        )} */}
                        {isLogin ? (
                            <div>
                                <Tooltip title="Quản lý tài khoản">
                                    <Link to={'/user/12'}>
                                        <UserAvatar className="h-[64px] w-[64px] cursor-pointer md:h-[48px] md:w-[48px]" />
                                    </Link>
                                </Tooltip>
                            </div>
                        ) : (
                            loginGoogle && (
                                <div>
                                    <Tooltip title="Quản lí tài khoản">
                                        <Link to={'/user/12'}>
                                            <img
                                                src={userAvatar}
                                                className="h-[64px] w-[64px] cursor-pointer rounded-full md:h-[48px] md:w-[48px]"
                                            />
                                        </Link>
                                    </Tooltip>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </header>

            <div>
                <Drawer
                    placement="left"
                    title={
                        <div className="flex items-center gap-2">
                            {isLogin && (
                                <>
                                    {' '}
                                    <Button onClick={handleOpenMenuToggle}>
                                        <Link to={'/user/12'}>
                                            <UserAvatar className="h-[64px] w-[64px] cursor-pointer md:h-[48px] md:w-[48px]" />
                                        </Link>
                                    </Button>
                                    <div>
                                        <h2 className="text-lg font-bold">Hi, Long Nguyen</h2>
                                        <p className="text-sm">Chào mừng trở lại</p>
                                    </div>
                                    <Notification />
                                </>
                            )}
                            {!isLogin && (
                                <div className="flex gap-3">
                                    <Button
                                        variant="outlined"
                                        className="!border-[#2d2f31] !text-sm !font-bold !text-[#2d2f31] hover:!bg-[#0000000a]"
                                    >
                                        Đăng ký
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className=" !border-[#2d2f31] !bg-[#2d2f31] !text-sm !font-bold !shadow-none hover:!bg-[#747474]"
                                    >
                                        <Link to={'/login'}>Đăng nhập</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    }
                    closeIcon={<KeyboardDoubleArrowLeftIcon />}
                    onClose={handleOpenMenuToggle}
                    open={open}
                >
                    <div className="flex flex-col gap-2">
                        <Divider orientation="left" className="!my-0">
                            <h2 className="font-bold">Của tôi</h2>
                        </Divider>
                        <div className="mb-3 ml-[32px]">
                            <div>
                                <Button className="!normal-case" variant="text">
                                    Khóa học của tôi
                                </Button>
                            </div>
                            <div>
                                <Button className="!normal-case" variant="text">
                                    Khóa học yêu thích
                                </Button>
                            </div>
                        </div>
                        <Divider orientation="left" className="!my-0">
                            <h2 className="font-bold">Thể loại</h2>
                        </Divider>
                        <div className="mb-3 ml-[32px]">
                            <div>
                                <Button className="!normal-case" variant="text">
                                    Khóa học của tôi
                                </Button>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    );
};

export default Header;
