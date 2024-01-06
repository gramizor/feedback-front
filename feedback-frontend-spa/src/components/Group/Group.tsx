import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Group.css';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';
import loadingPhoto from "/loading-thinking.gif";
import defaultPhoto from "/bmstu.png";
import { GroupData, loadingGroup } from '../loadingGroup'; // Замени "path-to-loadingGroup" на путь к фай

const Group: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const groupId = id ? parseInt(id, 10) : undefined;
  const updateBreadcrumbs = useBreadcrumbsUpdater();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateBreadcrumbs([{ name: 'Главная', path: '/' }, { name: group ? group.group_code : 'Загрузка', path: 'group/' + group?.group_id }]);
  }, [loading]);

  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      setLoading(true);
      await fetchGroupData();
      setLoading(false);
    };
    fetchDataAndSetLoading();
  }, []);

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`/api/group/${groupId}`);

      if (!response.ok) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        setTimeout(fetchGroupData, 2000);
        return;
      }

      const data = await response.json();
      setGroup(data?.group || null);
    } catch (error) {
      console.error('Error fetching group data:', error);
      setTimeout(fetchGroupData, 2000);
    }
  };

  return (
    <>
      <div className="group-info">
        {loading || group === null ? (
          <div className="group-block">
            <img src={loadingPhoto} alt={`Группа`} className="img-group" />
            <div className="info-about">
              <h2>{loadingGroup.group_code}</h2>
              <p>Курс: {loadingGroup.course}</p>
              <p>Контакты: {loadingGroup.contacts}</p>
              <p>Студентов: {loadingGroup.students}</p>
            </div>
          </div>
        ) : (
          group.group_code === null ? (
            <p>Группа не найдена</p>
          ) : (
            <div className="group-block">
              <img src={group?.photo || defaultPhoto} alt={`Группа ${group?.group_code}`} className="img-group" />
              <div className="info-about">
                <h2>{group?.group_code}</h2>
                <p>Курс: {group?.course}</p>
                <p>Контакты: {group?.contacts}</p>
                <p>Студентов: {group?.students}</p>
              </div>
            </div>
          )
        )}
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
