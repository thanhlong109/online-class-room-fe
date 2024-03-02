import { useState } from 'react';
import { firebaseStorage } from '../../config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { Empty, Progress, Typography, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Video } from '..';

export enum UploadFileType {
    IMAGE,
    VIDEO,
}

interface UploadFileProps {
    storePath: string;
    fileName: string;
    onUploadFileSuccess: (downloadURL: string) => void;
    onUploadFileError: (error: FirebaseError) => void;
    fileType: UploadFileType;
    showPreview: boolean;
    buttonText?: string;
    isLoading?: boolean;
}

const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const VideoExtensions = ['mp4', 'avi', 'mov', 'webm', 'mkv'];
//const defaultPreviewImg = 'https://img-c.udemycdn.com/user/200_H/anonymous_3.png';
const UploadFileCustom = ({
    storePath,
    onUploadFileSuccess,
    onUploadFileError,
    fileType,
    showPreview,
    fileName,
    buttonText = 'Lưu',
    isLoading = false,
}: UploadFileProps) => {
    const [Preview, setPreview] = useState<string | undefined>(undefined);
    const allowedExtensions = fileType === UploadFileType.IMAGE ? ImageExtensions : VideoExtensions;
    const errorMessageTypeFit =
        UploadFileType.IMAGE === fileType
            ? 'Vui lòng chỉ chọn file ảnh!'
            : 'Vui lòng chỉ chọn file video!';
    const filePath = (storePath.endsWith('/') ? storePath : storePath + '/') + fileName;
    const storageRef = ref(firebaseStorage, filePath);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [percent, setPercent] = useState(0);
    const [isImageFile, setIsImageFile] = useState(false);
    const [loading, setLoading] = useState(false);

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
                        console.error(error.message);
                        onUploadFileError(error);
                        setSelectedFile(null);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setLoading(false);
                            setSelectedFile(null);
                            //
                            onUploadFileSuccess(downloadURL);
                            setPreview(undefined);
                            console.log(`link ${downloadURL}`);
                            message.success('Upload file thành công!');
                        });
                    },
                );
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

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
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setPreview(reader.result as string);
                };
                setSelectedFile(file);
            }
        } else {
            message.error(errorMessageTypeFit);
        }
    };
    return (
        <div>
            <div className="m-auto flex max-w-[500px] flex-col gap-8">
                {showPreview && (
                    <div>
                        <Typography.Title level={5}>Xem trước</Typography.Title>
                        <div className=" border-[1px] border-[#2d2f31] p-4">
                            <div className="bg-[#f7f9fa] ">
                                {!Preview && <Empty />}
                                {Preview && fileType === UploadFileType.IMAGE && (
                                    <img className="m-auto h-full" src={Preview} alt="" />
                                )}
                                {Preview && fileType === UploadFileType.VIDEO && (
                                    <Video src={Preview} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
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
                        <p className="ant-upload-text">Ấn hoặc kéo file vào đây</p>
                        <p className="ant-upload-hint">
                            Nghiêm cấm hành vi tải lên các file mang tính chất đồi trụy hoặc bạo lực
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
                    loading={isLoading}
                    onClick={uploadFile}
                    disabled={selectedFile == null}
                    variant="contained"
                >
                    {buttonText}
                </LoadingButton>
            </div>
        </div>
    );
};

export default UploadFileCustom;
