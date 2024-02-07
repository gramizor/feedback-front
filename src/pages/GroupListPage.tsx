// GroupListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import GroupList from "../components/GroupList/GroupList";
import styles from "../App.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store";
import { addFeedback, getGroupList } from "../redux/group/groupListThunk";
import { selectcourseNumber, selectgroupCode, selectGroupData } from "../redux/group/groupListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd";
import { selectLoading, selectResult } from "../redux/additional/additionalSelectors";
import { loading } from "../redux/additional/additionalSlice";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";

const GroupListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const groupCode = useSelector(selectgroupCode);
  const courseNumber = useSelector(selectcourseNumber);
  const groupData = useSelector(selectGroupData);
  const result = useSelector(selectResult);
  const load = useSelector(selectLoading);
  useEffect(() => {
    dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber }));
  }, [groupCode, courseNumber]);

  // const handleSearch = (code: string, course: number) => {
  //   dispatch(getGroupList({ groupCode: code, courseNumber: course }));
  // };

  const handleAddFeedback = async (groupId: number) => {
    dispatch(addFeedback({ groupID: groupId, groupCode: groupCode, courseNumber: courseNumber }));
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
        <GroupList
          isAuthenticated={isAuthenticated}
          groupData={groupData}
          isFeedbackConstructor={false}
          isFeedbackNotDraft={false}
          onAddFeedback={handleAddFeedback}
        />
      )}
    </div>
  );
};

export default GroupListPage;
