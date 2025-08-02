import React from "react";
import {
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Avatar,
  Divider,
  Typography,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  ApartmentOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function Filters({
  filters,
  onChange,
  onClear,
  assignees = [],
}) {
  return (
    <div style={{ padding: "10px 0", background: "#f9fbff" }}>
      {/* Top row */}
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
            }}
          >
            {/* Left side of top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Select
                value={filters.assignee}
                onChange={(value) => onChange("assignee", value)}
                placeholder="My Deals"
                style={{ minWidth: 120 }}
                allowClear
              >
                {assignees.map((assignee) => (
                  <Select.Option key={assignee} value={assignee}>
                    {assignee}
                  </Select.Option>
                ))}
              </Select>

              <Select
                value={'All clients'}
                placeholder="All clients"
                style={{ minWidth: 120 }}
              >
              </Select>

              <Avatar
                style={{
                  backgroundColor: "#e0e7ff",
                  color: "#1d4ed8",
                  fontWeight: "bold",
                }}
              >
                MS
              </Avatar>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ApartmentOutlined />
                <Text>Pipeline</Text>
                <Divider
                  type="vertical"
                  style={{ height: 16, margin: "0 8px" }}
                />
                <UnorderedListOutlined />
                <Text>List</Text>
              </div>
            </div>

            {/* Right side of top row */}
            <Text style={{ color: "#888", whiteSpace: "nowrap" }}>
              Total Deals: <b>6</b> &nbsp;&nbsp; Total Revenue in Pipeline:{" "}
              <b>$68,877</b>
            </Text>
          </div>
        </Col>
      </Row>

      {/* Bottom row */}
      <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Input
              value={filters.search}
              onChange={(e) => onChange("search", e.target.value)}
              prefix={<SearchOutlined />}
              placeholder="Search..."
              style={{ minWidth: 200, flexGrow: 1, maxWidth: 300 }}
              allowClear
            />

            <RangePicker
              value={filters.dateRange}
              onChange={(dates) => onChange("dateRange", dates)}
              style={{ minWidth: 250 }}
            />

            <Checkbox
              checked={filters.active}
              onChange={(e) => onChange("active", e.target.checked)}
            >
              Active Deals
            </Checkbox>

            <Button type="text" danger style={{ padding: 0 }} onClick={onClear}>
              clear
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
