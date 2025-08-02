import deals from '../data/deals.js';

export const fetchDeals = (req, res) => {
  const { search, assignee, stage } = req.query;

  let filtered = [...deals];

  // Optional Filters
  if (search) {
    filtered = filtered.filter(d =>
      d.dealName.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (assignee) {
    filtered = filtered.filter(d => d.assignee === assignee);
  }
  if (stage) {
    filtered = filtered.filter(d => d.stage === stage);
  }

  const grouped = Object.values(
    filtered.reduce((acc, curr) => {
      const key = `${curr.assignee}_${curr.stage}`;
      if (!acc[key]) {
        acc[key] = {
          assignee: curr.assignee,
          stage: curr.stage,
          data: []
        };
      }

      acc[key].data.push({
        client: curr.client,
        initials: curr.initials,
        dealName: curr.dealName,
        budget: curr.budget,
        assignee: curr.assignee
      });

      return acc;
    }, {})
  );

  res.json(grouped);
};


const fetchAssignees = (req, res) => {
  const assignees = [...new Set(deals.map(d => d.assignee))]; // Corrected: used deals.map
  res.json(assignees);
};

const fetchStages = (req, res) => {
  const stages = [...new Set(deals.map(d => d.stage))]; // Corrected: used deals.map
  res.json(stages);
};

export default {
  fetchDeals,
  fetchAssignees,
  fetchStages
};