import React from 'react';

interface DashboardProps {
  width: number;
  height: number;
}

// eslint-disable-next-line arrow-body-style
const Dashboard: React.FC<DashboardProps> = ({ width, height }) => {
  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default Dashboard;
