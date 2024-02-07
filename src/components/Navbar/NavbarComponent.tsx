// NavbarComponent.tsx
import React, { useEffect, useState } from "react";
import styles from "./NavbarComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectcourseNumber, selectgroupCode } from "../../redux/group/groupListSelectors";
import { setcourseNumber, setgroupCode } from "../../redux/group/groupListSlice";


const NavbarComponent: React.FC = () => {

  const dispatch = useDispatch();

  const groupCode = useSelector(selectgroupCode);
  const courseNumber = useSelector(selectcourseNumber);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  useEffect(() => {

  }, [groupCode, courseNumber])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchTerm(event.target.value);
    dispatch(setgroupCode(event.target.value))
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courseNumber = parseInt(event.target.value, 10);
    // setSelectedCourse(isNaN(courseNumber) ? 0 : courseNumber);
    dispatch(setcourseNumber(courseNumber))
  };

  const handleFocus = () => {
    setPlaceholderVisible(false);
  };

  const handleBlur = () => {
    setPlaceholderVisible(true);
  };

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholderVisible ? "Поиск по названию группы" : ""}
        value={groupCode}
        onChange={handleSearchChange}
        className={styles.myInput}
      />
      <select
        id="courseSelect"
        value={courseNumber || ''}
        onChange={handleCourseChange}
        className={styles.selector}
      >
        <option value="">Поиск по курсу</option>
        <option value="1">1 курс</option>
        <option value="2">2 курс</option>
        <option value="3">3 курс</option>
        <option value="4">4 курс</option>
      </select>
    </div>
  );
};

export default NavbarComponent;
