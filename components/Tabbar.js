import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {/* Home */}
                <Link href="/">
                    <a className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            {/* SVG path here */}
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
                    </a>
                </Link>
                {/* Discover */}
                <Link href="/discover">
                    <a className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {/* SVG and text for Discover */}
                    </a>
                </Link>
                {/* My Library */}
                <Link href="/mylibrary">
                    <a className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {/* SVG and text for My Library */}
                    </a>
                </Link>
                {/* Upgrade */}
                <Link href="/upgrade">
                    <a className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {/* SVG and text for Upgrade */}
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
