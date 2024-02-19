// GroupListPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import GroupList from "../components/GroupList/GroupList";
import styles from "../App.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store";
import { addFeedback, getGroupList } from "../redux/group/groupListThunk";
import {
  selectcourseNumber,
  selectgroupCode,
  selectGroupData,
} from "../redux/group/groupListSelectors";
import { selectIsAuthenticated, selectisAdmin } from "../redux/auth/authSelectors";
import { Spin } from "antd";
import { selectLoading, selectResult, } from "../redux/additional/additionalSelectors";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";
import Pagination from "../components/Pagination/Pagination";

const GroupListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const groupCode = useSelector(selectgroupCode);
  const groupData = useSelector(selectGroupData);
  const courseNumber = useSelector(selectcourseNumber);
  const result = useSelector(selectResult);
  const load = useSelector(selectLoading);
  const isAdmin = useSelector(selectisAdmin);
  // Добавим состояние для хранения текущей страницы
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber }));
  }, [groupCode, courseNumber]);

  // const handleSearch = (code: string) => {
  //   dispatch(getGroupList(code));
  // };

  const handleAddFeedback = async (groupId: number) => {
    dispatch(addFeedback({ groupID: groupId, groupCode: groupCode, courseNumber: courseNumber }));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber, page: newPage }));
    }
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber, page: newPage }));
  };


  const breadcrumbsPaths = [
    { to: "/", label: "Главная" },
    { to: "/group", label: "Список групп" },
  ];


  return (
    <div className={styles.body}>
      <NavigationBar />
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      <NavbarComponent />
      {load ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : !result ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <>
          <GroupList
            isAuthenticated={isAuthenticated}
            groupData={groupData}
            isFeedbackConstructor={false}
            isFeedbackNotDraft={false}
            onAddFeedback={handleAddFeedback}
            isAdmin={isAdmin}
          />
          <Pagination
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </>

      )}
    </div>
  );
};

export default GroupListPage;
