// FeedbackListPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getFeedbacks } from "../redux/feedback/feedbackListThunk";
import { Container } from "react-bootstrap";
import FeedbackTable from "../components/FeedbackTable/FeedbackTable";
import styles from "../components/FeedbackTable/FeedbackTable.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
  selectStartFormationDate,
  selectEndFormationDate,
  selectFeedbackStatus,
  selectFeedbacks,
} from "../redux/feedback/feedbackListSelectors";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors";
import NavbarFeedback from "../components/NavbarFeedback/NavbarFeedback";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";

const FeedbackListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startFormationDate = useSelector(selectStartFormationDate);
  const endFormationDate = useSelector(selectEndFormationDate);
  const feedbackStatus = useSelector(selectFeedbackStatus);
  const feedbacks = useSelector(selectFeedbacks);
  const loading = useSelector(selectLoading);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    await dispatch(
      getFeedbacks({
        startFormationDate,
        endFormationDate,
        feedbackStatus,
      })
    );
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 1500);
    return () => clearInterval(fetchInterval);
  }, [
    dispatch,
    startFormationDate,
    endFormationDate,
    feedbackStatus,
  ]);

  return (
    <>
      <Container>
        <NavigationBar />
        <div className={styles.center}>
          <NavbarFeedback />
        </div>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <section className={styles.section}>
            <FeedbackTable feedback={feedbacks} />
          </section>
        )}
      </Container>
    </>
  );
};

export default FeedbackListPage;
