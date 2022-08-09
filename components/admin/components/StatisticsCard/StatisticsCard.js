const StatisticsCard = (props) => {

    const {
        itemCount,
        itemTitle,
        criticalDash,
        warningDash,
        normalDash,
        notDash,
    } = props;

    return (
        <div className="cursor-pointer m-2">
            <div className={normalDash ? "bg-white border-b-4 border-green-500 rounded-2xl" : "" | warningDash ? "bg-white border-b-4 border-yellow-500 rounded-2xl" : "" | criticalDash ? "bg-white dark:bg-gray-900 border-b-4 border-red-500 rounded-2xl" : "" | notDash ? "bg-white dark:bg-gray-900 border-b-4 border-blue-700 rounded-2xl" : ""}>
                <div className="bg-white dark:bg-gray-900 flex flex-col justify-center items-center h-40 shadow-lg rounded-xl p-4 border border-solid border-gray-200 dark:border-gray-500">
                    <h1 className={normalDash ? "text-green-900 font-bold uppercase dark:text-gray-300 text-lg md:text-xl" : "text-green-900 font-bold uppercase dark:text-gray-300 text-lg md:text-xl" | warningDash ? "text-yellow-500 font-bold uppercase dark:text-gray-300 text-lg md:text-xl" : "text-yellow-500 font-bold uppercase dark:text-gray-300 text-lg md:text-xl" | criticalDash ? "font-bold uppercase text-red-600 dark:text-gray-300 text-lg md:text-xl" : "font-bold uppercase text-red-600 dark:text-gray-300 text-lg md:text-xl" | notDash ? "text-blue-900 dark:text-gray-300 font-bold uppercase text-lg md:text-xl" : "text-blue-900 dark:text-gray-300 font-bold uppercase text-lg md:text-xl"}>
                        {itemTitle}
                    </h1>
                    <h1 className="text-gray-900 dark:text-gray-100 text-6xl md:text-8xl lg:text-8xl">
                        {itemCount}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default StatisticsCard;