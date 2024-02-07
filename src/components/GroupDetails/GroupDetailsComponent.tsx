import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./GroupDetailsComponent.module.css";
import { GroupDetails } from "../../redux/group/groupDetailsSlice";
import { Link } from "react-router-dom";

interface GroupDetailsComponentProps {
  groupDetails: GroupDetails | null;
}

const GroupDetailsComponent: React.FC<GroupDetailsComponentProps> = ({
  groupDetails,
}) => {
  if (!groupDetails) {
    return <div>Нет данных об этой группе</div>;
  }

  const {
    photo,
    group_code,
    course,
    contacts,
    students,
  } = groupDetails;

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Img
          className={styles.cardImg}
          variant="top"
          src={photo}
          alt={`Фото ${group_code}`}
        />
        <Card.Body>
          <h2 className={styles.cardTitle}>{group_code}</h2>
          <Card.Text className={styles.cardText}>
            <strong>Курс: </strong>{course}
            <br />
            <strong>Контакты: </strong>{contacts}
            <br />
            <strong>Студентов: </strong>{students}
          </Card.Text>
          <Link to={`/`} className={styles.back}>
            Вернуться на главную
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GroupDetailsComponent;
