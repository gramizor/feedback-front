import React from "react";
import { Table } from "react-bootstrap";
import styles from "./FeedbackTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";

interface FeedbackTableProps {
  feedback: {
    feedback_id: number;
    feedback_status: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
  }[];
}


const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedback }) => {
  const navigate = useNavigate();

  if (!feedback || feedback.length === 0) {
    return (
      <Table className={styles.table}>
        <thead className={styles.tblHeader}>
          <tr>
            <th className={styles.th}>Статус</th>
            <th className={styles.th}>Дата создания</th>
            <th className={styles.th}>Дата формирования</th>
            <th className={styles.th}>Дата завершения</th>
          </tr>
        </thead>
        <tbody className={styles.tblContent}></tbody>
      </Table>
    );
  }

  const handleRowClick = (feedbackId: number) => {
    // Переадресация на другую страницу
    navigate(`/feedback/${feedbackId}`);
  };

  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          <th className={styles.th}>Статус</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {feedback.map((feedbackItem) => (
          <tr
            key={feedbackItem.feedback_id}
            className={`${styles.tr} ${styles.clickable}`}
            onClick={() => handleRowClick(feedbackItem.feedback_id)}
          >
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;