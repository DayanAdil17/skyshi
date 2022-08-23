import ActivityCard from '@components/ActivityCard';
import Button from '@components/Button';
import Layout from '@components/Layout/Layout';
import { axios } from '@config/axios';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Activity, Response } from 'src/types';

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const {
      data: { data },
    } = await axios.get<Response<Activity[]>>('activity-groups');

    setActivities(data);
  };
  return (
    <Layout>
      <div flex="~" justify="between" p="y-15" data-cy="activity-title">
        <h1 font="bold" text="size-[36px]">
          TESt
        </h1>
        <Button
          text="Tambah"
          icon={<AiOutlinePlus />}
          onClick={() => navigate('/new-activity')}
        />
      </div>

      {activities.length <= 0 ? (
        <div
          flex="~"
          align="items-center"
          justify="center"
          data-cy="activity-empty-state"
        >
          <img src="/activity-empty-state.png" />
        </div>
      ) : (
        <div
          // className="justify-center"
          grid="~ gap-5 cols-1 sm:cols-2 lg:cols-3 xl:cols-4"
          data-cy="activity-card"
        >
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              data={activity}
              refetch={fetchActivities}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
