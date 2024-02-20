import { InboxOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Divider, Progress, Typography, message } from 'antd';
import type { UploadFile } from 'antd';
import { Upload } from 'antd';
import { useEffect, useState } from 'react';
import { firebaseStorage } from '../../../../config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { FirebaseError } from 'firebase/app';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useUpdateUserInfoMutation } from '../../../../services/auth.services';
import { setUserInfo } from '../../../../slices/userSlice';

const { Dragger } = Upload;

const UploadAvatar = () => {
    const defaultPreviewImg = 'https://img-c.udemycdn.com/user/200_H/anonymous_3.png';
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const [imgPreview, setImgPreview] = useState<string | undefined>(defaultPreviewImg);
    const userInfo = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const storageRef = ref(firebaseStorage, `images/user-avatar/user-${userInfo.id}`);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [percent, setPercent] = useState(0);
    const [isImageFile, setIsImageFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateUserMutate, { isSuccess, data }] = useUpdateUserInfoMutation();

    const uploadFile = () => {
        if (selectedFile) {
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            setLoading(true);
            try {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const percent = Math.floor(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                        );
                        setPercent(percent);
                    },
                    (error: FirebaseError) => {
                        console.error(error);
                        setSelectedFile(null);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setLoading(false);
                            setSelectedFile(null);
                            //
                            updateUserMutate({ ...userInfo, profileImg: downloadURL });
                            setImgPreview(defaultPreviewImg);
                            console.log(`link ${downloadURL}`);
                        });
                    },
                );
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    useEffect(() => {
        if (isSuccess && data) {
            message.success('Cập nhật avatar thành công!');
            dispatch(setUserInfo(data));
        }
    }, [isSuccess]);
    const handleOnBeforeUpload = (file: RcFile) => {
        const extentionFile = file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2);
        const isAllowed = allowedExtensions.includes(extentionFile.toLocaleLowerCase());
        setIsImageFile(isAllowed);
        return false;
    };

    const handleOnSelectedFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (isImageFile) {
            const reader = new FileReader();
            const file = info.fileList.pop()?.originFileObj;
            console.log('select file');
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImgPreview(reader.result as string);
                };
                setSelectedFile(file);
            }
        } else {
            message.error('Vui lòng chỉ chọn file ảnh!');
        }
    };
    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Ảnh đại diện
                </Typography.Title>
                <Divider />
                <div className="m-auto flex max-w-[500px] flex-col gap-8">
                    <div>
                        <Typography.Title level={5}>Ảnh xem trước</Typography.Title>
                        <div className=" border-[1px] border-[#2d2f31] p-4">
                            <div className="bg-[#f7f9fa] ">
                                <img className="m-auto h-full" src={imgPreview} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dragger
                            showUploadList={false}
                            multiple={false}
                            onChange={handleOnSelectedFileChange}
                            beforeUpload={handleOnBeforeUpload}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Ấn hoặc kéo thả ảnh vào đây</p>
                            <p className="ant-upload-hint">
                                Nghiêm cấm hành vi tải lên các hình ảnh mang tính chất đồi trụy hoặc
                                bạo lực
                            </p>
                        </Dragger>
                    </div>
                    {percent > 0 && percent < 100 && (
                        <>
                            <div>
                                <Progress percent={percent} />
                                <div className="text-xs">
                                    <span className="font-medium">Upload file:</span>{' '}
                                    {selectedFile && selectedFile.name}
                                </div>
                            </div>
                        </>
                    )}
                    <LoadingButton
                        loading={loading}
                        onClick={uploadFile}
                        disabled={selectedFile == null}
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>
                </div>
            </div>
        </>
    );
};

export default UploadAvatar;
