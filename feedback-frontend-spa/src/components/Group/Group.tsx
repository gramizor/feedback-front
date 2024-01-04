import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './Group.css'

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
  const groupId = id ? parseInt(id, 10) : undefined; // Проверка на undefined

  const [group, setGroup] = React.useState<Group | null>(null);

  React.useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (groupId !== undefined) { // Добавляем проверку на undefined
          const response = await axios.get(`/api/group/${groupId}`);
          setGroup(response.data?.group || null);
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
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
