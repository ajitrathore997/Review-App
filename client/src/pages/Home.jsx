import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Filters from "../components/Filters";
import DealsList from "../components/DealsList";
import ContentX from "../components/Content";
import "./App.css";
import { getDeals, getAssignees, getStages } from "../api/dealService";

const { Content } = Layout;

const App = () => {
  const [deals, setDeals] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [stages, setStages] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    assignee: "",
    stage: "",
    dateRange: [],
  });

  useEffect(() => {
    getAssignees().then((res) => setAssignees(res.data));
    getStages().then((res) => setStages(res.data));
  }, []);

  useEffect(() => {
    const params = {
      search: filters.search,
      assignee: filters.assignee,
      stage: filters.stage,
    };
    getDeals(params)
      .then((res) => setDeals(res.data.deals || res.data))
      .catch(() => message.error("Error fetching deals"));
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: "", assignee: "", stage: "", dateRange: [] });
  };

  return (
    <Layout>
      <Header />
      <Content className="main-content">
        <ContentX />
        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          assignees={assignees}
          stages={stages}
        />
        <DealsList deals={deals} />
      </Content>
    </Layout>
  );
};

export default App;
