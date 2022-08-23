import ActivityDetail from '@pages/ActivityDetail';
import Dashboard from '@pages/Dashboard';
import NewActivity from '@pages/NewActivity';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new-activity" element={<NewActivity />} />
      <Route path="/activity/:id" element={<ActivityDetail />} />
    </Routes>
  );
}

export default App;
