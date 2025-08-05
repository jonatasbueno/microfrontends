import { useSelector } from 'react-redux';

const Dashboard = () => {
  const data = useSelector((state: unknown) => state);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
