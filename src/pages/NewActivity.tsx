import Button from '@components/Button';
import Layout from '@components/Layout/Layout';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import React, { useEffect, useState } from 'react';
import { Activity, Response } from 'src/types';
import { axios } from '@config/axios';
import ButtonIcon from '@components/Button/ButtonIcon';
import Back from '@components/Icon/Back';

export default function NewActivity() {
  const [activity, setActivity] = useState<Activity>({
    title: 'New Activity',
    email: 'dayan@gmail.com',
  });

  const [inputActivity, setInputActivity] = useState(false);

  useEffect(() => {
    createActivity();
  }, []);

  const createActivity = async () => {
    const { data } = await axios.post<Response<Activity>>(
      'activity-groups',
      activity
    );

    setActivity({
      ...activity,
      ...data,
    });
  };

  const handleSubmitActivity = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: e.target.value,
    });
  };

  const handleToggleActivityInput = async () => {
    if (inputActivity) {
      const {
        data: { data },
      } = await axios.patch<Response<Activity>>(
        `activity-groups/${activity.id}`,
        {
          title: activity.title,
        }
      );

      setActivity({
        ...activity,
        ...data,
      });
    }

    setInputActivity(!inputActivity);
  };

  return (
    <Layout>
      <div flex="~" justify="between" p="y-15">
        <div
          flex="~"
          align="items-center"
          justify="between"
          space="x-4"
          data-cy="todo-back-button"
        >
          <div>
            <a href="/">
              <ButtonIcon icon={<Back />} type="small" onClick={() => ''} />
            </a>
          </div>

          <div w="max-60" h="10" data-cy="todo-title">
            {inputActivity ? (
              <input
                w="max-60"
                font="bold"
                text="size-[36px]"
                border="~ gray-500 rounded-lg active:gray-700"
                required
                value={activity.title}
                id="title"
                onChange={handleChange}
              />
            ) : (
              <span font="bold" text="size-[36px]">
                {activity.title}
              </span>
            )}
          </div>

          <button
            flex="~"
            align="items-center"
            justify="center"
            onClick={handleToggleActivityInput}
          >
            <HiOutlinePencil />
          </button>
        </div>

        <Button
          text="Tambah"
          icon={<AiOutlinePlus />}
          onClick={handleSubmitActivity}
        />
      </div>
    </Layout>
  );
}
