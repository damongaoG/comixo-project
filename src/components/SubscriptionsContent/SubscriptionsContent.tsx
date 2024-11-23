import React from 'react';
import { Card, List, Tag } from 'antd';

const SubscriptionsContent: React.FC = () => {
  const subscriptions = [
    {
      id: 1,
      plan: 'Premium Plan',
      status: 'Active',
      startDate: '2024-03-01',
      endDate: '2024-04-01',
    },
    // Add more subscription data as needed
  ];

  return (
    <div>
      <h2>Your Subscriptions</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={subscriptions}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.plan}>
              <p>Status: <Tag color={item.status === 'Active' ? 'green' : 'red'}>{item.status}</Tag></p>
              <p>Start Date: {item.startDate}</p>
              <p>End Date: {item.endDate}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SubscriptionsContent; 