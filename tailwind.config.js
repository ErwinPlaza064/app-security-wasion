import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 1s ease-out forwards',
                'fade-in-up': 'fade-in-up 1s ease-out forwards',
            },
            colors: {
                // Primary navy blue color
                primary: {
                    50: '#e8e9f3',
                    100: '#c5c7e0',
                    200: '#9fa2cc',
                    300: '#787db8',
                    400: '#5b61a9',
                    500: '#3e459a',
                    600: '#383f92',
                    700: '#303788',
                    800: '#282f7e',
                    900: '#0C1869',
                    950: '#080f45',
                    DEFAULT: '#0C1869',
                },
                // Background cream color
                cream: {
                    50: '#FFFFFF',
                    100: '#FFF7F2',
                    200: '#FFE8DD',
                    300: '#FFD9C8',
                    400: '#FFCAB3',
                    DEFAULT: '#FFF7F2',
                },
            },
        },
    },

    plugins: [forms],
};
