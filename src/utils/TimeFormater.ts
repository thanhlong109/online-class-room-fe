import { number } from 'yup';

export enum FormatType {
    HH_MM_SS,
    HH_MM,
    MM_SS,
}

export function secondsToTimeString(
    seconds: number | undefined,
    formatType: FormatType = FormatType.HH_MM_SS,
    seperator: string[] | string = ':',
): string {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    let result: string = '';
    switch (formatType) {
        case FormatType.HH_MM: {
            result = `${hours > 0 ? hours.toString().padStart(2, '0') + `${`${seperator[0]} ` || seperator}` : ''}${minutes.toString().padStart(2, '0')}${`${seperator[1]} ` || ''}`;
            break;
        }
        case FormatType.HH_MM_SS: {
            result = `${hours > 0 ? hours.toString().padStart(2, '0') + `${`${seperator[0]} ` || seperator}` : ''}${minutes.toString().padStart(2, '0') + `${`${seperator[1]} ` || seperator}`}${secondsLeft.toString().padStart(2, '0')}${seperator[2] || ''}`;
            break;
        }
        case FormatType.MM_SS: {
            result = `${minutes.toString().padStart(2, '0') + `${`${seperator[0]} ` || seperator}`}${secondsLeft.toString().padStart(2, '0')}${seperator[2] || ''}`;
            break;
        }
    }

    return result;
}

export function stringToSeconds(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds) * 1;
}

export function getVNDateString(date: string | undefined) {
    if (!date) return '';
    const iDate = new Date(date);
    return iDate.toLocaleDateString('vi-VN');
}
