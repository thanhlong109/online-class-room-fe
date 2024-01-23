import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CourseCardHover = () => {
    const [isFavorite, setFavorite] = useState(false);
    const handleOnClickFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setFavorite((pre) => !pre);
    };

    const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className="flex max-w-[300px] flex-col gap-1 p-4 pb-6">
                <h1 className="text-lg font-bold">
                    Mastering Game Feel in Unity: Where Code Meets Fun!
                </h1>
                <p className="mt-1 text-xs text-green-600">
                    Updated <span className="font-bold">November 2023</span>
                </p>
                <p className="text-xs">8 total hoursAll LevelsSubtitles</p>
                <p>Code your own top-down RPG game combat system in Unity using C#</p>
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex gap-4">
                        <span>
                            <CheckOutlinedIcon style={{ fontSize: 'inherit' }} />
                        </span>
                        <span>
                            Learn to manage a bigger project from start to finish learning beginner
                            to more intermediate techniques
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <span>
                            <CheckOutlinedIcon style={{ fontSize: 'inherit' }} />
                        </span>
                        <span>
                            Learn to manage a bigger project from start to finish learning beginner
                            to more intermediate techniques
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <span>
                            <CheckOutlinedIcon style={{ fontSize: 'inherit' }} />
                        </span>
                        <span>
                            Learn to manage a bigger project from start to finish learning beginner
                            to more intermediate techniques
                        </span>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <LoadingButton fullWidth onClick={handleBuyClick} variant="contained">
                        Mua khóa học
                    </LoadingButton>
                    <IconButton onClick={handleOnClickFavorite} size="large">
                        {isFavorite ? (
                            <FavoriteIcon style={{ color: '#e95c5c' }} />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default CourseCardHover;
