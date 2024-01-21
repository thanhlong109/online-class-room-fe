import { InboxOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Divider, Typography } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { useState } from 'react';

const { Dragger } = Upload;

const UserAvatar = () => {
    const [img, setImg] = useState('https://img-c.udemycdn.com/user/200_H/anonymous_3.png');
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            /*const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }*/
            if (info.file.url) {
                setImg(info.file.url);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onPreview(file) {
            if (file.url) {
                setImg(file.url);
            }
        },
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
                                <img className="m-auto h-full" src={img} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dragger {...props}>
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
                    <LoadingButton variant="contained">Lưu</LoadingButton>
                </div>
            </div>
        </>
    );
};

export default UserAvatar;
