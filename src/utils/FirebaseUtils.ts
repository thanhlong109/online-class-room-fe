import { ref, deleteObject } from 'firebase/storage';
import { firebaseStorage } from '../config';

export const deleteFile = (
    filePath: string,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void,
) => {
    const storageRef = ref(firebaseStorage, filePath);

    deleteObject(storageRef)
        .then(() => {
            console.log('File deleted successfully');
            if (successCallback) {
                successCallback();
            }
        })
        .catch((error) => {
            console.error('Error deleting file:', error);
            if (errorCallback) {
                errorCallback(error);
            }
        });
};
