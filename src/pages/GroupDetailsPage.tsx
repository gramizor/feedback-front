// GroupDetailsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupDetailsComponent from "../components/GroupDetails/GroupDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { selectGroupDetails } from "../redux/group/groupDetailsSelectors";
import { getGroupDetails } from "../redux/group/groupDetailsThunk";
import { AppDispatch } from "../redux/store";
import { setGroupDetails } from "../redux/group/groupDetailsSlice";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const GroupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const groupDetails = useSelector(selectGroupDetails);
  const loading = useSelector(selectLoading);
  useEffect(() => {
    if (id) {
      dispatch(getGroupDetails(id));
    }

    return () => {
      dispatch(setGroupDetails(null));
    };
  }, [dispatch, id]);

  const breadcrumbsPaths = [
    { to: "/", label: "Главная" },
    { to: "/group", label: "Список групп" },
    { to: `/group/${id}`, label: `${groupDetails?.group_code}` }
  ];

  return (
    <div>
      <NavigationBar />
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <GroupDetailsComponent groupDetails={groupDetails} />
      )}
    </div>
  );
};

export default GroupDetailsPage;
