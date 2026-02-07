const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-zinc-500 text-sm font-medium animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
