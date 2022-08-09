import React, {useEffect} from 'react';
import ReportContent from "./reports/ReportContent";
import UsersContent from "./users/UsersContent";
import { useSelector } from "react-redux";
import {
    StatisticsCard,
    DoughnutChart,
    BarChart
} from '../../../admin/admin';


const initialValues = {
    normalReports: 0,
    warningReports: 0,
    criticalReports: 0,
}

const initialDashValues = {
    normalDash: false,
    warningDash: false,
    criticalDash: false,
    notDash: true,
}

function AdminHome(props) {
    const { reports, users, deleteUserUrl, deleteReportUrl } = props;
    const user = useSelector((state) => state.user.user);
    const [usersActive, setUsersActive] = React.useState(0);
    const [values, setValues] = React.useState(initialValues);
    const [dashValues, setDashValues] = React.useState(initialDashValues);
    const [isLoading, setIsLoading] = React.useState(true);


    useEffect(() => {
        const handleCounts = () => {
            // reset active users
            setUsersActive(0);
            // reset all values
            setValues(initialValues);
            setDashValues(initialDashValues);

            // handle users stuff
            users?.map((user) => {
                if (user?.isOnline) {
                    setUsersActive(usersActive + 1);
                }
            });

            // handle report stuff
            reports?.forEach((report) => {
                setDashValues({
                    ...dashValues,
                    normalDash: true,
                    warningDash: true,
                    criticalDash: true,
                });
                if (report?.reportType?.toString().toLowerCase() === "danger") {
                    setValues({
                        ...values,
                        criticalReports: values.criticalReports++
                    });
                } else if (report?.reportType?.toString().toLowerCase() === "warning") {
                    setValues({
                        ...values,
                        warningReports: values.warningReports++
                    });
                } else {
                    setValues({
                        ...values,
                        normalReports: values.normalReports++
                    });
                }
            });
        }

        if(reports?.length > 0 && users?.length > 0){
            setIsLoading(false);
        }

        handleCounts();
    }, [users, reports]);

    return (
        <React.Fragment>
            <div className="mt-16">
                {/* statistics */}
                <div className="grid md:grid-cols-3 pt-2 pb-2 gap-2 bg-white dark:bg-gray-900">
                    <StatisticsCard
                        notDash={dashValues.notDash}
                        itemTitle={"Total Users"}
                        itemCount={user ? users?.length : 0}
                    />
                    <StatisticsCard
                        notDash={dashValues.notDash}
                        itemTitle={"Total Users Active"}
                        itemCount={user ? usersActive : 0}
                    />
                    <StatisticsCard
                        notDash={dashValues.notDash}
                        itemTitle={"Total Reports"}
                        itemCount={user ? reports?.length : 0}
                    />
                </div>
                <div className="mt-4 pb-2 pt-2">
                    <div className="grid md:grid-cols-3 gap-2 bg-white dark:bg-gray-900">
                        <StatisticsCard
                            normalDash={dashValues.normalDash}
                            itemTitle={"Normal Reports"}
                            itemCount={user ? values.normalReports : 0}
                        />
                        <StatisticsCard
                            warningDash={dashValues.warningDash}
                            itemTitle={"Warning Reports"}
                            itemCount={user ? values.warningReports : 0}
                        />
                        <StatisticsCard
                            criticalDash={dashValues.criticalDash}
                            itemTitle={"Critical Reports"}
                            itemCount={user ? values.criticalReports : 0}
                        />
                    </div>
                    <div className="mt-8 mx-4 grid md:grid-cols-2 grid-rows-1 gap-2">
                        <div
                            className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                            <BarChart
                                normalReports={values.normalReports}
                                warningReports={values.warningReports}
                                criticalReports={values.criticalReports}
                            />
                        </div>
                        <div
                            className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                            <DoughnutChart
                                normalReports={values.normalReports}
                                warningReports={values.warningReports}
                                criticalReports={values.criticalReports}
                            />
                        </div>
                    </div>
                </div>
                {
                    !isLoading &&
                    <ReportContent
                        reports={reports}
                        deleteReportUrl={deleteReportUrl}
                    />
                }
                {
                    !isLoading &&
                    <UsersContent
                        users={users}
                        deleteUserUrl={deleteUserUrl}
                    />
                }
            </div>
        </React.Fragment>
    );
}

export default AdminHome;