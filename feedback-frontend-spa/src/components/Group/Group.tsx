import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Group.css';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';

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
  const defaultPhoto = '/src/mocks/bmstu.png';
  const updateBreadcrumbs = useBreadcrumbsUpdater();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateBreadcrumbs([{ name: 'Главная', path: '/' }, { name: group ? group.group_code : 'Загрузка...', path: 'group/' + group?.group_id }]);
  }, [group]);

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
    const fetchDataAndSetLoading = async () => {
      setLoading(true);
      await fetchGroupData();
      setLoading(false);
    };
    fetchDataAndSetLoading();
  }, [groupId, loading]);

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`/api/group/${groupId}`);
      if (!response.ok) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        setTimeout(fetchGroupData, 2000);
        return;
      }

      const data = await response.json();
      setGroup(data.group || null);
    } catch (error) {
      console.error('Error fetching group data:', error);
      setTimeout(fetchGroupData, 2000);
      setGroup(loadingGroup);
    }
  };

  return (
    <>
      <div className="group-info">
        <div className="group-block">
          <img src={group?.photo || defaultPhoto} alt={`Group ${group?.group_code}`} className="img-group" />
          <div className="info-about">
            <h2>{group?.group_code}</h2>
            <p>Курс: {group?.course}</p>
            <p>Контакты: {group?.contacts}</p>
            <p>Студентов: {group?.students}</p>
          </div>
        </div>
        <div className="buttons">
          <NavLink to={`/`} className="back">
            Вернуться на главную
          </NavLink>
          <NavLink to={`/`} className="back">
            Запросить обратную связь
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Group;
