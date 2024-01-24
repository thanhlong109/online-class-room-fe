/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1240px',
                '2xl': '1496px',
            },
        },
        extend: {
            colors: {
                primary: 'white',
                greenHome: '#D2B4DE',
                grayLine: '#747474',
                blueAnt: '#1890FF',
            },
        },
    },
    extend: {
        transitionProperty: {
            height: 'height',
        },
        color: {
            primary: 'white',
        },
    },
    plugins: [],
};
