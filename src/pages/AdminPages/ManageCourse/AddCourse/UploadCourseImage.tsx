import { useState } from 'react';
import { firebaseStorage } from '../../../../config';
import { ref } from 'firebase/storage';

const UploadCourseImage = () => {
    const defaultPreviewImg = 'https://img-c.udemycdn.com/user/200_H/anonymous_3.png';
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const [imgPreview, setImgPreview] = useState<string | undefined>(defaultPreviewImg);
    const storageRef = ref(firebaseStorage, `images/courses/`);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [percent, setPercent] = useState(0);
    return <div>UploadCourseImage</div>;
};

export default UploadCourseImage;
