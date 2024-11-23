import React, { useEffect, useState } from 'react';
import { Card, List, Table, TableProps, Tag } from 'antd';
import { PlanOrderVo } from '../../types/plan-order-vo';
import { ResultPagePlanOrder } from '../../types/result-page-plan-order';

const SubscriptionsContent: React.FC = () => {
    const orderStatusMap = {
        0: { text: 'Unpaid', color: 'default' },
        1: { text: 'Paid', color: 'processing' },
        2: { text: 'Shipped', color: 'warning' },
        3: { text: 'Delivered', color: 'success' },
        [-1]: { text: 'Return Requested', color: 'error' },
        [-2]: { text: 'Returning', color: 'error' },
        [-3]: { text: 'Returned', color: 'error' },
        [-4]: { text: 'Cancelled', color: 'default' },
        [-5]: { text: 'Cancel Requested', color: 'default' },
    } as const;

    const payTypeMap = {
        0: { text: 'Offline', color: 'default' },
        1: { text: 'Stripe', color: 'blue' },
    } as const;

    const [dataSource, setDataSource] = useState<PlanOrderVo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const fetchData = async (page: number, pageSize: number) => {
        setLoading(true);
        try {
            const base64Data = btoa(JSON.stringify({ page: page - 1, pageSize }));
            const response = await fetch(process.env.REACT_APP_PLAN_ORDER_URL + `?list=${base64Data}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            const result: ResultPagePlanOrder = await response.json();
            setDataSource(result.data.content);
            setPagination({
                current: result.data.number + 1,
                pageSize: result.data.size,
                total: result.data.totalElements
            })
        } catch (error) {
            console.error('Fetch plan order list error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize).then();
    }, []);

    const handleTableChange = (newPagination: any) => {
        if (newPagination.current !== pagination.current || newPagination.pageSize !== pagination.pageSize) {
            fetchData(newPagination.current, newPagination.pageSize).then();
        }
    }

    const columns: TableProps<PlanOrderVo>['columns'] = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Pay Type',
            dataIndex: 'payType',
            key: 'payType',
            render: (type: number) => {
                const typeInfo = payTypeMap[type as keyof typeof payTypeMap];
                return (
                    <Tag color={typeInfo.color}>
                        {typeInfo.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (status: number) => {
                const statusInfo = orderStatusMap[status as keyof typeof orderStatusMap];
                return (
                    <Tag color={statusInfo.color}>
                        {statusInfo.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Create Time',
            dataIndex: 'createTime',
            key: 'createTime',
        }
    ];

    return (
        <div>
            <h2>Your Subscriptions</h2>
            <Table<PlanOrderVo>
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="id"
            />
        </div>
    );
};

export default SubscriptionsContent; 