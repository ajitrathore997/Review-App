import React from "react";
import {
  Layout,
  Typography,
  Button,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Avatar,
  Collapse,
  Row,
  Col,
  Divider,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import "./App.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const deals = [
  {
    assignee: "Michael Speed",
    stage: "Negotiating",
    data: [
      {
        client: "Chandan Kalita",
        initials: "CK",
        dealName: "Chandan Deal",
        budget: "$5,000",
      },
      {
        client: "michael speed",
        initials: "MS",
        dealName: "some deal 4",
        budget: "$7,000",
      },
    ],
  },
];

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          # <span className="logo-sub">ROSTER GRID</span>
        </div>
        <div className="nav-menu">
          <span>Dashboard</span>
          <span>Roster</span>
          <span>Communications</span>
          <span className="active">CRM</span>
          <span>Contracts</span>
          <span>Settings</span>
          <span>More</span>
        </div>
        <div className="user-profile">
          <span>Michael</span>
          <Avatar icon={<UserOutlined />} />
        </div>
      </Header>
      <Content className="main-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <Title level={4}>Welcome!</Title>
            <Title level={2}>
              Manage your <span className="highlight">Deals</span>
            </Title>
            <Button type="primary" className="get-started">
              Get Started
            </Button>
          </div>
          <div className="illustration-box">
            <img
              src="/illustration.png"
              alt="CRM Illustration"
              className="illustration"
            />
          </div>
        </div>

      <div className="filters">
  <div className="filters-left">
    <Select defaultValue="My Deals" className="filter-select" />
    <Select defaultValue="All clients" className="filter-select" />
    <Avatar className="filter-avatar">MS</Avatar>
    <div className="icons">
      <ApartmentOutlined />
      <Text className="icon-label">Pipeline</Text>
      <Divider type="vertical" />
      <UnorderedListOutlined />
      <Text className="icon-label">List</Text>
    </div>
    <Text className="total-text">
      Total Deals: 6 &nbsp;&nbsp; Total Revenue in Pipeline: $66,817
    </Text>
  </div>
  <div className="filters-right">
    <Input
      prefix={<SearchOutlined />}
      placeholder="Search..."
      className="filter-search"
    />
    <RangePicker className="filter-date" />
    <Checkbox defaultChecked className="filter-checkbox">
      Active Deals
    </Checkbox>
    <Button type="text" danger className="clear-btn">
      clear
    </Button>
  </div>
</div>



        <div className="deals-list">
          {deals.map((group, idx) => (
            <Collapse
              defaultActiveKey={[`group-${idx}`]}
              bordered={false}
              className="stage-collapse"
            >
              <Panel
                header={
                  <div className="stage-header">
                    <Text strong>{group.stage}</Text>
                    <Text className="amount">$12,000</Text>
                  </div>
                }
                key={`group-${idx}`}
              >
                {group.data.map((deal, i) => (
                  <Row key={i} className="deal-row" gutter={16}>
                    <Col span={6} className="deal-client">
                      <Avatar className="client-avatar">{deal.initials}</Avatar>
                      <div>
                        <Text strong>{deal.client}</Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Text>{deal.dealName}</Text>
                    </Col>
                    <Col span={6}>
                      <Text>{deal.budget}</Text>
                    </Col>
                    <Col span={6}>
                      <Text>
                        <Avatar size="small">MS</Avatar> Michael Speed
                      </Text>
                    </Col>
                  </Row>
                ))}
              </Panel>
            </Collapse>
          ))}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
