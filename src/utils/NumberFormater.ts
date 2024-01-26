export function formatNumberWithCommas(number: number | undefined) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}
