import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-12 w-full text-center">
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">
                &copy; {new Date().getFullYear()} Wasion Security System
            </p>
        </footer>
    );
}
