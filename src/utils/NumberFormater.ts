export function formatNumberWithCommas(number: number | undefined) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function convertFileSize(bytes: number): string {
    if (bytes === 0) return '0 Byte';
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
