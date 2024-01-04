import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css'

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
    const [itemsPerPage, setItemsPerPage] = useState<number>(4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/group/');
                setGroups(response.data?.groups?.groups || null);
            } catch (error) {
                console.error('Error fetching groups data:', error);
            }
        };

        fetchData();
    }, []);

    if (!groups) {
        return <div className='loading'>Загрузка...</div>;
    }

    const handleDelete = async (groupId: number) => {
        try {
            await axios.delete(`/api/group/${groupId}/delete`);
            const response = await axios.get('/api/group/');
            setGroups(response.data?.groups?.groups || null);
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groups.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="group-list">
                {currentItems.map((group) => (
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
            <div className="pagination">
                {Array.from({ length: Math.ceil(groups.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default MainPage;
