import {
    Avatar,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    styled,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { ManageProfileMenu } from './ManageProfile.enum';
import {
    Profile,
    Security,
    Avatar as AvatarComponent,
    Favorite as FavoriteComponent,
} from './Components';

interface Menu {
    type: ManageProfileMenu;
    MenuIcon: any;
    menutext: string;
    component: JSX.Element;
}

const ManageProfilePage = () => {
    const menuList: Menu[] = [
        {
            type: ManageProfileMenu.PROFILE,
            MenuIcon: AccountCircleIcon,
            menutext: 'Hồ Sơ',
            component: <Profile />,
        },
        {
            type: ManageProfileMenu.AVATAR,
            MenuIcon: ImageIcon,
            menutext: 'Ảnh đại diện',
            component: <AvatarComponent />,
        },
        {
            type: ManageProfileMenu.SECURITY,
            MenuIcon: LockPersonIcon,
            menutext: 'Mật khẩu tài khoản',
            component: <Security />,
        },
        {
            type: ManageProfileMenu.FAVORITE,
            MenuIcon: FavoriteIcon,
            menutext: 'Khóa học yêu thích',
            component: <FavoriteComponent />,
        },
    ];

    const StyledListItemText = styled(ListItemText)({
        '.css-10hburv-MuiTypography-root': {
            fontSize: '16px',
        },
    });

    const [menuSelected, setMenuSeleted] = useState(menuList[0]);

    const StyledMenuItem = styled(MenuItem)({
        '&.MuiListItem-root': {
            padding: '12px 16px 12px 16px',
        },
        '&.Mui-selected': {
            backgroundColor: '#6a6f73',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#6a6f73',
                color: '#fff',
            },
        },
    });

    const onMenuSelectEvent = (menu: Menu) => {
        setMenuSeleted(menu);
    };

    return (
        <>
            <Paper elevation={1} className="container flex min-h-[80vh] max-w-[1000px]">
                <div className="py-4">
                    <div className="mb-4">
                        <Avatar
                            className="m-auto"
                            style={{ height: '120px', width: '120px' }}
                            src="https://th.bing.com/th/id/OIP.KjsLCgX3HbKX9lx73cXzWQAAAA?rs=1&pid=ImgDetMain"
                        />
                        <h1 className="mt-2 text-center font-bold">Your Full Name</h1>
                    </div>
                    <MenuList>
                        {menuList.map(({ type, MenuIcon, menutext, component }, index) => {
                            return (
                                <StyledMenuItem
                                    onClick={() =>
                                        onMenuSelectEvent({ type, MenuIcon, menutext, component })
                                    }
                                    key={index}
                                    selected={type === menuSelected.type}
                                >
                                    <ListItemIcon style={{ color: 'inherit' }}>
                                        <MenuIcon style={{ color: 'inherit', fontSize: '22px' }} />
                                    </ListItemIcon>
                                    <StyledListItemText>{menutext}</StyledListItemText>
                                </StyledMenuItem>
                            );
                        })}
                    </MenuList>
                </div>
                <div className="mx-2 border-l-[1px] border-l-[#d1d7dc]"></div>
                <div className="ml-10 flex-1 pb-12 pt-4">{menuSelected.component}</div>
            </Paper>
        </>
    );
};

export default ManageProfilePage;
