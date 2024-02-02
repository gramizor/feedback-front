import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';
import defaultPhoto from "/bmstu.png";
import GroupData from '../loadingGroup';
import Mock from '../Mock';

const MainPage: React.FC = () => {
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(100);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCourse, setSelectedCourse] = useState<number>(0);
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [online, setOnline] = useState("off");

    const updateBreadcrumbs = useBreadcrumbsUpdater();

    useEffect(() => {
        setGroups(Mock);
        updateBreadcrumbs([{ name: 'Главная', path: '/' }]);
    }, []);

    useEffect(() => {
        const fetchData = async (_query: string, _courseQuery: number) => {
            try {
                const groupQuery = searchTerm ? `&groupCode=${searchTerm}` : '';
                const courseQueryStr = selectedCourse !== null ? `&courseNumber=${selectedCourse}` : '';
                const response = await fetch(`/api/group/paginate?page=${currentPage}&pageSize=${itemsPerPage}${groupQuery}${courseQueryStr}`);
                const data = await response.json();
                setGroups(data?.groups || []);
                setOnline("on");
            } catch (error) {
                setGroups(Mock.filter((group) =>
                    group.group_code.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedCourse === 0 || group.course === selectedCourse)
                ));
                console.error("Error fetching group data:", error);
                setTimeout(() => {
                    fetchData(searchTerm, selectedCourse);
                }, 2000);
            }
        };

        fetchData(searchTerm, selectedCourse);
    }, [searchTerm, selectedCourse, currentPage, itemsPerPage]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const courseNumber = parseInt(event.target.value, 10);
        setSelectedCourse(isNaN(courseNumber) ? 0 : courseNumber);
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
                {online === "off" || groups.length === 0 ? (
                    Mock.filter((group) =>
                        group.group_code.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (selectedCourse === 0 || group.course === selectedCourse)
                    ).map((group) => (
                        <NavLink key={group.group_id} to={`/group/${group.group_id}`} className="group-link">
                            <div className='group-item'>
                                <img
                                    src={group.photo || defaultPhoto}
                                    alt={`Группа ${group.group_code}`}
                                    className='img-group'
                                />
                                <h2>{group.group_code}</h2>
                                <p>Контакты: {group.contacts}</p>
                            </div>
                        </NavLink>
                    ))
                ) : (
                    groups.map((group) => (
                        <NavLink key={group.group_id} to={`/group/${group.group_id}`} className="group-link">
                            <div className='group-item'>
                                <img
                                    src={group.photo || defaultPhoto}
                                    alt={`Группа ${group.group_code}`}
                                    className='img-group'
                                />
                                <h2>{group.group_code}</h2>
                                <p>Контакты: {group.contacts}</p>
                                <form onSubmit={() => handleDelete(group.group_id)} className="delete-button">
                                    <button type="submit" className="button">Удалить группу</button>
                                </form>
                            </div>
                        </NavLink>
                    ))
                )}
            </div>
        </>
    );
};

export default MainPage;
