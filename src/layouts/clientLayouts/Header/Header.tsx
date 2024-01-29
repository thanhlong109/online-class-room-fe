import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton, styled } from '@mui/material';
import { Badge, Divider, Drawer, Input, Popover, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FavoritePopover, MyLearningPopover, UserAvatar } from './Components';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Notification } from '../../../components';
import { useGetUserInfoQuery } from '../../../services/auth.services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setUserInfo } from '../../../slices/userSlice';
import { loadUser } from '../../../slices/authSlice';

function Header() {
    //load user data
    const dispatch = useDispatch();
    const { data, isSuccess } = useGetUserInfoQuery();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(loadUser());
            dispatch(setUserInfo({ ...data }));
        }
    }, [isSuccess]);

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

    return (
        <>
            <header className="max-w-[100vw] shadow-[0_2px_4px_rgb(0,0,0,0.08),0_4px_12px_rgb(0,0,0,0.08)]">
                <div className="container flex h-[76px] items-center justify-between  gap-8 bg-white ">
                    <div className="md:hidden">
                        <IconButton onClick={handleOpenMenuToggle}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <h1>
                        <Link to={'/'}>
                            <Typography.Title style={{ fontWeight: 'bold', margin: '0' }} level={2}>
                                EStudyHub
                            </Typography.Title>
                        </Link>
                    </h1>
                    <div className="hidden cursor-pointer text-[#2d2f31] hover:text-[#a435f0] md:block">
                        <Typography.Title style={{ margin: '0', color: 'inherit' }} level={5}>
                            khám phá
                        </Typography.Title>
                    </div>
                    <StyledSearch
                        allowClear
                        className="flex-1 md:max-w-[700px]"
                        placeholder="Tìm kiếm khóa học"
                        size="large"
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
                                    <Badge count="14" color="#a435f0">
                                        <FavoriteBorderIcon />
                                    </Badge>
                                </IconButton>
                            </Popover>
                        </div>
                        <div className="cursor-pointer">
                            <Notification />
                        </div>
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
                        {isLogin && (
                            <div>
                                <Tooltip title="Quản lý tài khoản">
                                    <Link to={'/user/12'}>
                                        <UserAvatar className="h-[64px] w-[64px] cursor-pointer md:h-[48px] md:w-[48px]" />
                                    </Link>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div>
                <Drawer
                    placement="left"
                    title={
                        <div className="flex items-center gap-2">
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
}

export default Header;
