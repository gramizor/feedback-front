import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Group.css';

interface Group {
  group_id: number;
  group_code: string;
  contacts: string;
  course: number;
  students: number;
  group_status: string;
  photo: string;
}

const Group: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const groupId = id ? parseInt(id, 10) : undefined;

  const [group, setGroup] = useState<Group | null>(null);
  const loadingGroup: Group = {
    group_id: 0,
    group_code: 'Загрузка...',
    contacts: 'Загрузка...',
    course: 0,
    students: 0,
    group_status: 'Загрузка...',
    photo: '/src/mocks/loading-thinking.gif',
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (groupId !== undefined) {
          const response = await fetch(`/api/group/${groupId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
          const data = await response.json();
          setGroup(data.group || null);
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
        setGroup(loadingGroup);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (!group) {
    return <div className='loading'>Загрузка...</div>;
  }

  return (
    <>
      <div className="group-info">
        <div className="group-block">
          <img src={group.photo} alt={`Group ${group.group_code}`} className='img-group' />
          <div className="info-about">
            <h2>{group.group_code}</h2>
            <p>Курс: {group.course}</p>
            <p>Контакты: {group.contacts}</p>
            <p>Студентов: {group.students}</p>
          </div>
        </div>
        <div className="buttons">
          <NavLink to={`/`} className="back">Вернуться на главную</NavLink>
          <NavLink to={`/`} className="back">Запросить обратную связь</NavLink>
        </div>
      </div>
    </>
  );
};

export default Group;
