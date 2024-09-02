import Link from 'next/link';

const Tabbar = () => {
    return (
        <div className="btm-nav fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            {/* Home Button */}
            <Link href="/">
                <button className="inline-flex flex-col items-center justify-center flex-grow hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span className="btm-nav-label">Home</span>
                </button>
            </Link>
            {/* Discover/Categories Button */}
            <Link href="/categories">
                <button className="inline-flex flex-col items-center justify-center flex-grow hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 9h10a1 1 0 110 2H3a1 1 0 110-2zM3 14h10a1 1 0 110 2H3a1 1 0 110-2zM3 19h10a1 1 0 110 2H3a1 1 0 110-2zM21 12l-4-4m0 0l4-4m-4 4h9m-9 6l4 4m-4-4l4-4m-4 4H12"></path>
                    </svg>
                    <span className="btm-nav-label">Discover</span>
                </button>
            </Link>
            {/* Library/Dashboard Button */}
            <Link href="/dashboard">
                <button className="inline-flex flex-col items-center justify-center flex-grow hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M8 6h.01M12 6h.01M16 6h.01M8 14h.01M12 14h.01M16 14h.01M12 18h.01M12 2a9.953 9.953 0 00-7.588 3.42c-3.905 3.906-3.905 10.242 0 14.148a9.954 9.954 0 007.588 3.432c2.761 0 5.522-1.055 7.612-3.146 4.195-4.194 4.195-11.02 0-15.214A10.713 10.713 0 0012 2z"></path>
                    </svg>
                    <span className="btm-nav-label">Library</span>
                </button>
            </Link>
            {/* Upgrade/Pricing Button */}
            <Link href="/pricing">
                <button className="inline-flex flex-col items-center justify-center flex-grow hover:bg-base-500 dark:hover:bg-red-800 group">
                    <svg className="h-6 w-6" fill="black" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 2.686-3 6s1.343 6 3 6 3-2.686 3-6-1.343-6-3-6zM12 20c-1.657 0-3-2.686-3-6 0-.736.088-1.437.25-2.094m2.75 8.094h0m0 0A11.978 11.978 0 019 14c0-2.387.876-4.575 2.336-6.364m.664 12.364h0m0 0c.654-2.618 1.985-4.773 3.618-6.364C17.124 9.425 18 11.613 18 14c0 3.314-1.343 6-3 6zM3 3l18 18"></path>
                    </svg>
                    <span className="btm-nav-label">Upgrade</span>
                </button>
            </Link>
        </div>
    );
};

export default Tabbar;
