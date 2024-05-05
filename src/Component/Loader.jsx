// Loader.js
const Loader = () => {
    return (
        <>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-4">
                <div className="loader h-20 w-20 border border-black dark:border-white">
                    <div className="eye border border-black dark:border-white"></div>
                </div>
                <span className="text-4xl text-black dark:text-white text-center">Netra AI <br/>
                Loading... Please Wait</span>
            </div>
        </>
    );
};

export default Loader;