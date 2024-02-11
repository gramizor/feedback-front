import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./FeedbackTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";
import { updateFeedbackStatusForModerator } from "../../redux/feedback/feedbackDetailsThunk";
import { useDispatch, useSelector } from "react-redux";
import { selectOwnerName } from "../../redux/feedback/feedbackListSelectors";

interface FeedbackTableProps {
  feedback: {
    feedback_id: number;
    feedback_status: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
    full_name: string;
    moderator_name?: string;
  }[];
  isAdmin: boolean;
}
const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedback, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ownerName = useSelector(selectOwnerName);

  const handleRowClick = (feedbackID: number, e: React.MouseEvent) => {
    navigate(`/feedback/${feedbackID}`);
    e.stopPropagation();
  };

  const handleCompleteClick = async (
    feedbackID: number,
    e: React.MouseEvent
  ) => {
    dispatch(
      updateFeedbackStatusForModerator({
        feedbackId: feedbackID.toString(),
        feedbackStatus: "завершен",
      }) as any
    );
    e.stopPropagation();
  };

  const handleRejectClick = async (feedbackID: number, e: React.MouseEvent) => {
    dispatch(
      updateFeedbackStatusForModerator({
        feedbackId: feedbackID.toString(),
        feedbackStatus: "отклонен",
      }) as any
    );
    e.stopPropagation();
  };

  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          {isAdmin && <th className={styles.th}>Создатель</th>}
          {isAdmin && <th className={styles.th}>Модератор</th>}
          <th className={styles.th}>Статус</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
          {/* {isAdmin && (
            <> */}
          <th className={styles.th}>Действия</th>
          {/* </>
          )} */}
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {feedback
          .filter((feedbackItem) =>
            ownerName ? feedbackItem.full_name.includes(ownerName) : true
          )
          .map((feedbackItem) => (
            <tr
              key={feedbackItem.feedback_id}
              className={`${styles.tr} ${styles.clickable}`}
            // onClick={(e) => handleRowClick(feedbackItem.feedback_id, e)}
            >
              {isAdmin && (
                <td className={styles.td}>{feedbackItem.full_name}</td>
              )}
              {isAdmin && (
                <td className={styles.td}>
                  {feedbackItem.moderator_name || "Отсутствует"}
                </td>
              )}
              <td className={styles.td}>{feedbackItem.feedback_status}</td>
              <td className={styles.td}>
                {formatDateTime(feedbackItem.creation_date)}
              </td>
              <td className={styles.td}>
                {formatDateTime(feedbackItem.formation_date)}
              </td>
              <td className={styles.td}>
                {formatDateTime(feedbackItem.completion_date)}
              </td>
              {/* {isAdmin && (
                <> */}
              <td className={styles.td}>
                {isAdmin && feedbackItem.feedback_status === "в работе" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className={`${styles.btn} ${feedbackItem.feedback_status !== "в работе"
                          ? styles.disabledLink
                          : ""
                        }`}
                      onClick={(e) =>
                        handleCompleteClick(feedbackItem.feedback_id, e)
                      }
                      disabled={
                        feedbackItem.feedback_status !== "в работе" && isAdmin
                      }
                    >
                      Завершить
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className={`${styles.btn} ${feedbackItem.feedback_status !== "в работе"
                          ? styles.disabledLink
                          : ""
                        }`}
                      onClick={(e) =>
                        handleRejectClick(feedbackItem.feedback_id, e)
                      }
                      disabled={
                        feedbackItem.feedback_status !== "в работе" && isAdmin
                      }
                    >
                      Отклонить
                    </Button>
                  </>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  className={`${styles.btn}`}
                  onClick={(e) => handleRowClick(feedbackItem.feedback_id, e)}
                >
                  Подробнее
                </Button>
              </td>
              {/* </>
              )} */}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
