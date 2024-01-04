import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';

interface GroupData {
    group_id: number;
    group_code: string;
    contacts: string;
    course: number;
    students: number;
    group_status: string;
    photo: string;
}

const MainPage: React.FC = () => {
    const [groups, setGroups] = useState<GroupData[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(100);
    const loadingGroup: GroupData = {
        group_id: -1,
        group_code: 'Загрузка...',
        contacts: 'Загрузка...',
        course: -1,
        students: -1,
        group_status: 'Загрузка...',
        photo: '/src/mocks/loading-thinking.gif',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/group/paginate?page=${currentPage}&pageSize=${itemsPerPage}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                const data = await response.json();
                setGroups(data?.groups?.groups || null);
            } catch (error) {
                console.error('Error fetching groups data:', error);
                setGroups([loadingGroup]);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    if (!groups) {
        return <div className='loading'>Загрузка...</div>;
    }

    const handleDelete = async (groupId: number) => {
        try {
            await fetch(`/api/group/${groupId}/delete`, {
                method: 'DELETE',
            });
            const response = await fetch(`/api/group/paginate?page=${currentPage}&pageSize=${itemsPerPage}`);
            const data = await response.json();
            setGroups(data?.groups?.groups || null);
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="group-list">
                {groups.map((group) => (
                    <NavLink to={`/group/${group.group_id}`} className='group-link' key={group.group_id}>
                        <div key={group.group_id} className='group-item'>
                            <img src={group.photo} alt={`Group ${group.group_code}`} className='img-group' />
                            <h2>{group.group_code}</h2>
                            <p>Контакты: {group.contacts}</p>
                            <form onSubmit={() => handleDelete(group.group_id)} className="delete-button">
                                <button type="submit" className="button">Удалить группу</button>
                            </form>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default MainPage;