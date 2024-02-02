import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Group.css';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';
import defaultPhoto from "/bmstu.png";
import GroupData from '../loadingGroup';
import Mock from '../Mock';

const Group: React.FC = () => {
  const [, setGroups] = useState<GroupData[]>([]);
  const { id } = useParams<{ id?: string }>();
  const groupId = id ? parseInt(id, 10) : undefined;
  const updateBreadcrumbs = useBreadcrumbsUpdater();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [online, setOnline] = useState("off");

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/group/${groupId}`);
        const data = await response.json();
        setGroup(data?.group || null);
        setGroups(data?.groups || []);
        setOnline("on");
      } catch (error) {
        setGroups(Mock);
        setTimeout(() => {
          fetchGroupData();
        }, 2000);
      }
    };
    fetchGroupData();
  }, []);

  useEffect(() => {
    const hasGroupDataInMock = Mock.length > 0 && Mock.some(item => item.group_id === groupId);

    updateBreadcrumbs([
      { name: 'Главная', path: '/' },
      {
        name: hasGroupDataInMock ? String(Mock.find(item => item.group_id === groupId)?.group_code) : (group ? group.group_code : 'Загрузка'),
        path: 'group/' + (hasGroupDataInMock ? groupId : group?.group_id)
      }
    ]);
  }, [group, groupId, Mock]);

  return (
    <>
      <div className="group-info">
        <div className="group-block">
          {online === "on" && group ? (
            <>
              <img src={group.photo || defaultPhoto} alt={`Группа ${group.group_code}`} className="img-group" />
              <div className="info-about">
                <h2>{group.group_code}</h2>
                <p>Курс: {group.course}</p>
                <p>Контакты: {group.contacts}</p>
                <p>Студентов: {group.students}</p>
              </div>
            </>
          ) : (
            Mock.filter(mockGroup => mockGroup.group_id === groupId).map((mockGroup) => (
              <div key={mockGroup.group_id} className="group-block">
                <img src={mockGroup.photo || defaultPhoto} alt={`Группа ${mockGroup.group_code}`} className="img-group" />
                <div className="info-about">
                  <h2>{mockGroup.group_code}</h2>
                  <p>Курс: {mockGroup.course}</p>
                  <p>Контакты: {mockGroup.contacts}</p>
                  <p>Студентов: {mockGroup.students}</p>
                </div>
              </div>
            ))
          )}
          {online === "on" && !group && Mock.every(mockGroup => mockGroup.group_id !== groupId) && (
            <p>К сожалению, такой группы еще нет</p>
          )}
        </div>
        <div className="buttons">
          <NavLink to={`/`} className="back">
            Вернуться на главную
          </NavLink>
          {online === "on" && !group && Mock.every(mockGroup => mockGroup.group_id !== groupId) && null}
          {online === "on" && group && (
            <NavLink to={`/`} className="back">
              Запросить обратную связь
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Group;
