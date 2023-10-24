import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../../../services/store/store';
import { IUser } from '../../../models/User/UserInterface';
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartListUser = () => {
    const { users } = useAppSelector((state) => state.users);

    const activeAccount = useMemo(() => {
      return (users ?? []).filter((user: IUser) => user.status === 'ACTIVE');
  }, [users])

    const countRoleIdAdmin = activeAccount?.reduce((count, user) => {
        if (user?.roleId === 1) {
            return count + 1;
        }
        return count;
    }, 0);
    const countRoleIdStore = activeAccount?.reduce((count, user) => {
        if (user?.roleId === 2) {
            return count + 1;
        }
        return count;
    }, 0);

    const countRoleIdOwner = activeAccount?.reduce((count, user) => {
        if (user?.roleId === 3) {
            return count + 1;
        }
        return count;
    }, 0);
    const countRoleIdCustomer = activeAccount?.reduce((count, user) => {
        if (user?.roleId === 4) {
            return count + 1;
        }
        return count;
    }, 0);

    const labels = ['Admin', 'Store', 'Owner', 'Customer'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Số người',
                data: [countRoleIdAdmin, countRoleIdStore, countRoleIdOwner, countRoleIdCustomer],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        scales: {},
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    };

    return (
        <div>
            <Pie data={data} height={400} options={options} />
        </div>
    );
};

export default ChartListUser;
