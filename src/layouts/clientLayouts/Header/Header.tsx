import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton, styled } from '@mui/material';
import { Avatar, Badge, Divider, Drawer, Input, Popover, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FavoritePopover, MyLearningPopover } from './Components';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Notification } from '../../../components';

function Header() {
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
    const avatar = (
        <Avatar
            className="h-[64px] w-[64px] cursor-pointer md:h-[48px] md:w-[48px]"
            src="https://th.bing.com/th/id/R.5266058a828ed6ebc41ebc1dbe344a5c?rik=X53L0kwXMclm0A&riu=http%3a%2f%2fpm1.narvii.com%2f6450%2feeb45dc9a19f5010f252727a17a57d18ea13e333_hq.jpg&ehk=NARaFueHSa3xaawZTf4XLLejOP6kf7zYsJol8UvZpXg%3d&risl=&pid=ImgRaw&r=0"
            size={'large'}
        />
    );

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
                                EStudy
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
                        <div>
                            <Tooltip title="Quản lý tài khoản">
                                <Link to={'/user/12'}>{avatar}</Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <Drawer
                    placement="left"
                    title={
                        <div className="flex items-center gap-2">
                            {avatar}
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
