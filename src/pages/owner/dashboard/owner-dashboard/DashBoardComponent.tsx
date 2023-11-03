import React, { useEffect, useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { clearMotor, getMotorByOwnerId } from '../../../../services/features/motorbike/motorbikeSlice';
ChartJS.register(ArcElement, Tooltip, Legend);


const DashBoardComponent = () => {
    const dispatch = useAppDispatch()

    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes)
    const { account } = useAppSelector((state) => state.account)

    useEffect(() => {
        dispatch(clearMotor());
        if (account?.userId) {
            dispatch(getMotorByOwnerId({ ownerId: Number(account.userId) }));
        }
    }, [dispatch, account?.userId]);

    const motorOwner = useMemo(() => {
        return (motorbikesByOwner ?? []).filter((motor: IMotorbike) => {
            return motor?.storeId === null
                && motor?.motorStatus?.motorStatusId === 3
                || motor?.storeId === null
                && motor?.motorStatus?.motorStatusId !== 3;
        });
    }, [motorbikesByOwner]);

    const motorInStorageOwner = motorOwner?.reduce((count, motor) => {
        if (motor?.storeId === null
            && motor?.motorStatus?.motorStatusId === 3) {
            return count + 1;
        }
        return count;
    }, 0);

    const motorInPosted = motorOwner?.reduce((count, motor) => {
        if (motor?.storeId === null
            && motor?.motorStatus?.motorStatusId !== 3) {
            return count + 1;
        }
        return count;
    }, 0);


    const labels = ['Trong Kho', 'Đã Đăng'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Số Xe Máy: ',
                data: [motorInStorageOwner, motorInPosted],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1.5,

            }
        ]
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
    )
}

export default DashBoardComponent