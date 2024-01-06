import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [loading, setLoading] = useState(true)

    const defaultPhoto = '/src/mocks/bmstu.png';
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const updateBreadcrumbs = useBreadcrumbsUpdater();
    useEffect(() => {
        updateBreadcrumbs([{ name: 'Главная', path: '/' }]);
    }, []);

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
        const fetchDataAndSetLoading = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
            setItemsPerPage(10);
            paginate(1);
        };

        fetchDataAndSetLoading();
    }, [currentPage, itemsPerPage, selectedCourse, searchTerm]);


    const fetchData = async () => {
        try {
            const query = searchTerm ? `&groupCode=${searchTerm}` : '';
            const courseQuery = selectedCourse !== null ? `&courseNumber=${selectedCourse}` : '';
            const response = await fetch(`/api/group/paginate?page=${currentPage}&pageSize=${itemsPerPage}${query}${courseQuery}`);

            if (!response.ok) {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                setTimeout(fetchData, 2000);
                return;
            }

            const data = await response.json();
            setGroups(data?.groups || []);
        } catch (error) {
            console.error('Error fetching groups data:', error);
            setTimeout(fetchData, 2000);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
        console.log('Изменения в поисковом запросе:', event.target.value);
    };

    const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const courseNumber = parseInt(event.target.value, 10);
        setSelectedCourse(isNaN(courseNumber) ? null : courseNumber);
        setCurrentPage(1);
    };

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

    const handleFocus = () => {
        setPlaceholderVisible(false);
    };

    const handleBlur = () => {
        setPlaceholderVisible(true);
    };

    return (
        <>
            <div className="filter-bar">
                <input
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholderVisible ? "Поиск по названию группы" : ""}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='my-input'
                />
                <select
                    id="courseSelect"
                    value={selectedCourse || ''}
                    onChange={handleCourseChange}
                    className='selector'
                >
                    <option value="">Поиск по курсу</option>
                    <option value="1">1 курс</option>
                    <option value="2">2 курс</option>
                    <option value="3">3 курс</option>
                    <option value="4">4 курс</option>
                </select>
            </div>
            <div className="group-list">
                {loading || groups === null ? (
                    <div className='group-item'>
                        <NavLink to={`/group/${loadingGroup.group_id}`} className="group-link">
                            <img
                                src={loadingGroup.photo}
                                alt={`Group ${loadingGroup.group_code}`}
                                className='img-group'
                            />
                            <h2>{loadingGroup.group_code}</h2>
                            <p>Контакты: {loadingGroup.contacts}</p>
                        </NavLink>
                    </div>
                ) : (
                    groups.length === 0 ? (
                        <p>Группы не найдены</p>
                    ) : (
                        groups.map((group) => (
                            <div key={group.group_id} className='group-item'>
                                <NavLink to={`/group/${group.group_id}`} className="group-link">
                                    <img
                                        src={group.photo || defaultPhoto}
                                        alt={`Group ${group.group_code}`}
                                        className='img-group'
                                    />
                                    <h2>{group.group_code}</h2>
                                    <p>Контакты: {group.contacts}</p>
                                </NavLink>
                                <form onSubmit={() => handleDelete(group.group_id)} className="delete-button">
                                    <button type="submit" className="button">Удалить группу</button>
                                </form>
                            </div>
                        )))
                )}
            </div>
        </>
    );
};

export default MainPage;