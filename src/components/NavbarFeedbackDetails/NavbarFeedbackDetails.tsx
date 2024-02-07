import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectFeedbackDetails } from "../../redux/feedback/feedbackDetailsSelectors";
import { selectFeedbackID } from "../../redux/group/groupListSelectors";
import { AppDispatch } from "../../redux/store";
import {
  deleteDraftFeedback,
  formFeedback,
  getFeedbackDetails,
} from "../../redux/feedback/feedbackDetailsThunk";
import { Button, Container, FormControl } from "react-bootstrap";
import styles from "./NavbarFeedbackDetails.module.css";

//NavbarFeedbackDetails.tsx
const NavbarFeedbackDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const feedback = useSelector(selectFeedbackDetails);
  const feedbackID = useSelector(selectFeedbackID);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFormFeedback = async () => {
    try {
      setLoading(true);
      await dispatch(formFeedback(String(id)));
    } catch (error) {
      console.error("Error forming feedback", error);
    } finally {
      setLoading(false);
      dispatch({ type: "setFeedbackDetails", payload: null });
    }
  };
  const onClearFeedback = async () => {
    try {
      setLoading(true);
      await dispatch(deleteDraftFeedback(String(id)));
      navigate("/group");
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch({ type: "setFeedbackDetails", payload: null });
    }
  };
  const isFormButtonDisabled =
    loading || !feedback?.groups;
  return (
    <Container className={styles.flexContainer}>
      {feedbackID !== 0 && feedbackID === feedback?.feedback_id && (
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            className={`${styles.btn} ${isFormButtonDisabled ? styles.disabledLink : ""
              }`}
            onClick={onFormFeedback}
            disabled={isFormButtonDisabled}
          >
            {loading ? "Сформировать..." : "Сформировать"}
          </Button>
          <Button
            variant="warning"
            className={styles.btn}
            onClick={onClearFeedback}
            disabled={loading}
          >
            {loading ? "Удалить..." : "Удалить"}
          </Button>
        </div>
      )}
    </Container>
  );
};
export default NavbarFeedbackDetails;
