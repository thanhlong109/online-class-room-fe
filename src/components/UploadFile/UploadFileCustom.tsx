import { useState } from 'react';
// import { firebaseStorage } from '../../config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { Empty, Progress, Typography, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Video } from '..';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { convertFileSize } from '../../utils/NumberFormater';
import { firebaseStorage } from '../../firebase/firebase';

export enum UploadFileType {
    IMAGE,
    VIDEO,
}

export enum UploadStyle {
    LARGE,
    SMALL,
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
    imgLink?: string;
    uploadStyle?: UploadStyle;
}

const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const VideoExtensions = ['mp4', 'avi', 'mov', 'webm', 'mkv'];
const UploadFileCustom = ({
    storePath,
    onUploadFileSuccess,
    onUploadFileError,
    fileType,
    showPreview,
    fileName,
    buttonText = 'Lưu',
    isLoading = false,
    imgLink = '',
    uploadStyle = UploadStyle.LARGE,
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
    const [showImage, setShowImage] = useState(imgLink && imgLink?.length > 10);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [tempSelectedFile, setTempSelectedFile] = useState<any>(null);
    const uploadFile = () => {
        if (selectedFile) {
            setUploadLoading(true);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
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
                            setSelectedFile(null);
                            //
                            onUploadFileSuccess(downloadURL);
                            setPreview(undefined);
                            console.log(`link ${downloadURL}`);
                            message.success('Upload file thành công!');
                            setShowImage(true);
                            setUploadLoading(false);
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

    const handleOnInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var extentionFile = e.target.value.slice(((e.target.value.lastIndexOf('.') - 1) >>> 0) + 2);
        const isAllowed = allowedExtensions.includes(extentionFile.toLocaleLowerCase());
        if (isAllowed) {
            setSelectedFile(e.target.files?.[0]);
            setTempSelectedFile(e.target.files?.[0]);
        } else {
            message.error(errorMessageTypeFit);
        }
    };

    return (
        <div>
            {uploadStyle === UploadStyle.LARGE && (
                <div className="m-auto flex w-[500px] max-w-[500px] overflow-hidden">
                    <motion.div
                        initial={{ transform: showImage ? 'translateX(-50%)' : 'translateX(0)' }}
                        animate={{ transform: showImage ? 'translateX(-50%)' : 'translateX(0)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <div className="flex w-[500px] min-w-[500px] max-w-[500px] flex-col gap-8">
                                {showPreview && (
                                    <div>
                                        <Typography.Title level={5}>Xem trước</Typography.Title>
                                        <div className=" border-[1px] border-[#2d2f31] p-4">
                                            <div className="bg-[#f7f9fa] ">
                                                {!Preview && <Empty />}
                                                {Preview && fileType === UploadFileType.IMAGE && (
                                                    <img
                                                        className="m-auto h-full"
                                                        src={Preview}
                                                        alt=""
                                                    />
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
                                            Nghiêm cấm hành vi tải lên các file mang tính chất đồi
                                            trụy hoặc bạo lực
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
                                    loading={isLoading || uploadLoading}
                                    onClick={uploadFile}
                                    disabled={selectedFile == null}
                                    variant="contained"
                                >
                                    {buttonText}
                                </LoadingButton>
                            </div>
                            <div className="flex w-[500px] min-w-[500px] max-w-[500px] flex-col gap-8">
                                <div className=" border-[1px] border-[#2d2f31] p-4">
                                    <div className="bg-[#f7f9fa] ">
                                        {imgLink && fileType === UploadFileType.IMAGE && (
                                            <img className="m-auto h-full" src={imgLink} alt="" />
                                        )}
                                        {imgLink && fileType === UploadFileType.VIDEO && (
                                            <Video src={imgLink} />
                                        )}
                                    </div>
                                </div>
                                <Button onClick={() => setShowImage(false)} variant="contained">
                                    Chỉnh sửa
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {uploadStyle === UploadStyle.SMALL && (
                <div>
                    {percent == 0 && (
                        <div className="flex">
                            <label
                                htmlFor="upload"
                                className="flex h-[48px] w-full cursor-pointer items-center border-[1px] border-[#333] bg-[#f7f9fa]  px-4 text-base font-medium"
                            >
                                {!selectedFile && <span>Chưa chọn file nào</span>}
                                {selectedFile && <span>File: {selectedFile?.name}</span>}
                            </label>
                            <input
                                className="hidden"
                                id="upload"
                                type="file"
                                onChange={handleOnInputFileChange}
                            />
                            <LoadingButton
                                loading={isLoading || uploadLoading}
                                onClick={uploadFile}
                                disabled={selectedFile == null}
                                variant="outlined"
                                className="!h[48-px] !w-[100px] !rounded-none"
                            >
                                {buttonText}
                            </LoadingButton>
                        </div>
                    )}

                    {percent > 0 && (
                        <>
                            <table className="w-full">
                                <thead>
                                    <tr className="border- border-b-[1px] text-left ">
                                        <th>Tên File</th>
                                        <th>Kích thước</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tempSelectedFile?.name}</td>
                                        <td>{convertFileSize(tempSelectedFile?.size)}</td>
                                        <td>
                                            <Progress percent={percent} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadFileCustom;
