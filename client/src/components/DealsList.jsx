// import React from "react";
// import {
//   Typography,
//   Avatar,
//   Collapse,
//   Row,
//   Col,
// } from "antd";

// const { Title, Text } = Typography;
// const { Panel } = Collapse;

// const DealsList = ({ deals }) => {
//   const groupedDeals = deals.reduce((acc, deal) => {
//     const assignee = deal.assignee || "Unassigned";
//     if (!acc[assignee]) acc[assignee] = [];
//     acc[assignee].push(deal);
//     return acc;
//   }, {});

//   return (
//     <div className="deals-list">
//           {deals.map((group, idx) => (
//             <Collapse
//               defaultActiveKey={[`group-${idx}`]}
//               bordered={false}
//               className="stage-collapse"
//             >
//               <Panel
//                 header={
//                   <div className="stage-header">
//                     <Text strong>{group.stage}</Text>
//                     <Text className="amount">$12,000</Text>
//                   </div>
//                 }
//                 key={`group-${idx}`}
//               >
//                 {group.data.map((deal, i) => (
//                   <Row key={i} className="deal-row" gutter={16}>
//                     <Col span={6} className="deal-client">
//                       <Avatar className="client-avatar">{deal.initials}</Avatar>
//                       <div>
//                         <Text strong>{deal.client}</Text>
//                       </div>
//                     </Col>
//                     <Col span={6}>
//                       <Text>{deal.dealName}</Text>
//                     </Col>
//                     <Col span={6}>
//                       <Text>{deal.budget}</Text>
//                     </Col>
//                     <Col span={6}>
//                       <Text>
//                         <Avatar size="small">MS</Avatar> Michael Speed
//                       </Text>
//                     </Col>
//                   </Row>
//                 ))}
//               </Panel>
//             </Collapse>
//           ))}
//         </div>
//   );
// };

// export default DealsList;

import React, { useState } from "react";
import { Table, Typography, Avatar } from "antd";
import { UpOutlined, DownOutlined } from '@ant-design/icons'; // Import arrow icons

const { Text } = Typography;

const DealsList = ({ deals }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const expandedRowRender = (record) => {
    const columns = [
      { title: 'Client', dataIndex: 'client', key: 'client', render: (text, record) => (
        <div>
          <Avatar className="client-avatar">{record.initials}</Avatar>
          <Text strong style={{ marginLeft: '8px' }}>{text}</Text>
        </div>
      )},
      { title: 'Deal Name', dataIndex: 'dealName', key: 'dealName' },
      { title: 'Deal Budget', dataIndex: 'budget', key: 'budget' },
      { title: 'Assignee', dataIndex: 'assignee', key: 'assignee', render: (text, record) => (
        <Text>
         {record.assignee}
        </Text>
      )},
    ];

    return <Table columns={columns} dataSource={record.data} pagination={false} />;
  };

  const columns = [
    {
      dataIndex: 'stage',
      key: 'stage',
      render: (text, record) => {
        const totalBudget = record.data.reduce((sum, deal) => {
          const budget = parseFloat(deal.budget.replace('$', '').replace(',', ''));
          return isNaN(budget) ? sum : sum + budget;
        }, 0);

        return (
          <Text strong style={{ fontSize: 16 }}>
            {text} <Text type="secondary">({record.data.length})</Text>
            <Text type="secondary" style={{ marginLeft: '8px' }}>
              ${totalBudget.toLocaleString()}
            </Text>
          </Text>
        );
      },
    },
  ];

  const onExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const expandIcon = ({ expanded, onExpand, record }) => (
    expanded ? (
      <UpOutlined onClick={e => onExpand(record, e)} style={{ fontSize: '12px', marginRight: '8px' }} />
    ) : (
      <DownOutlined onClick={e => onExpand(record, e)} style={{ fontSize: '12px', marginRight: '8px' }} />
    )
  );

  return (
    <div className="deals-list">
      <Table
        columns={columns}
        dataSource={deals.map((item, index) => ({ ...item, key: index }))}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand,
          defaultExpandedRowKeys: [],
          expandIcon, // Custom expand icon with up/down arrows
        }}
        bordered={false}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};

export default DealsList;