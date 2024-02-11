// FeedbackDetailsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store.ts";
import { getFeedbackDetails } from "../redux/feedback/feedbackDetailsThunk";
import { Card, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar/NavigationBar.tsx";
import { selectFeedbackDetails } from "../redux/feedback/feedbackDetailsSelectors";
import { setFeedbackDetails } from "../redux/feedback/feedbackDetailsSlice";
import GroupList from "../components/GroupList/GroupList.tsx";
import styles from "../components/GroupList/GroupList.module.css";
import { formatDateTime } from "../components/FeedbackTable/Datafunc.ts";
import { selectFeedbackID } from "../redux/group/groupListSelectors.ts";
import { deleteFeedback } from "../redux/group/groupListThunk.ts";
import NavbarFeedbackDetails from "../components/NavbarFeedbackDetails/NavbarFeedbackDetails.tsx";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors.ts";
import { selectisAdmin } from "../redux/auth/authSelectors.ts";

const FeedbackDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const feedback = useSelector(selectFeedbackDetails);
  const feedbackID = useSelector(selectFeedbackID);
  const loading = useSelector(selectLoading);
  const isAdmin = useSelector(selectisAdmin);
  useEffect(() => {
    if (id) {
      dispatch(getFeedbackDetails(id));
    }

    return () => {
      dispatch(setFeedbackDetails(null));
    };
  }, [dispatch, id]);

  const onRemoveFeedback = async (groupID: number) => {
    try {
      await dispatch(deleteFeedback(groupID));
      dispatch(getFeedbackDetails(String(feedbackID)));
    } catch (error) {
    } finally {
    }
  };

  return (
    <Container>
      <NavigationBar />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Container>
          {feedback && (
            <Card className={styles.cardDel}>
              <Card.Body>
                <Card.Title className={styles.cardsTitleDel}>
                  {`ID: ${feedback.feedback_id || ""}`}
                </Card.Title>
                <Card.Text className={styles.cardsTextDel}>
                  {`Статус доставки: ${feedback.feedback_status || ""}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата создания: ${formatDateTime(feedback.creation_date)}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата формирования: ${formatDateTime(
                    feedback.formation_date
                  )}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата завершения: ${formatDateTime(
                    feedback.completion_date
                  )}`}
                </Card.Text>
                <NavbarFeedbackDetails />
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
      <GroupList
        isAdmin={isAdmin}
        groupData={feedback?.groups}
        isFeedbackConstructor={feedbackID != 0}
        isFeedbackNotDraft={feedbackID !== feedback?.feedback_id}
        onRemoveFeedback={onRemoveFeedback}
      />
    </Container>
  );
};

export default FeedbackDetailsPage;
