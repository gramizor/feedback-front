// GroupList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import styles from "./GroupList.module.css";
import { Group } from "../../redux/group/groupListSlice";
import GroupTable from "../GroupTable/GroupTable";
import defaultPhoto from "/bmstu.png";

interface GroupListProps {
  groupData: Group[] | undefined;
  isFeedbackConstructor: boolean;
  isFeedbackNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddFeedback?: (groupId: number) => void;
  onRemoveFeedback?: (groupId: number) => void;
  isAdmin: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  groupData,
  isFeedbackConstructor,
  isFeedbackNotDraft,
  isAuthenticated,
  onAddFeedback,
  onRemoveFeedback,
  isAdmin,
}) => {
  return (
    <Container>
      {isAdmin ? (
        <GroupTable
          group={groupData}
          isAdmin={isAdmin}
          isFeedbackConstructor={false}
          isFeedbackNotDraft={false}
          onAddFeedback={onAddFeedback}
        />
      ) : (
        <Row className={styles.cards}>
          {Array.isArray(groupData) && groupData.length > 0 ? (
            groupData.map((item) => (
              <Col key={item.group_id} xs={12} sm={6} md={4} lg={3}>
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={item.photo || defaultPhoto}
                    className={styles.cardsImg}
                  />
                  <Card.Body>
                    <Link
                      to={`/group/${item.group_id}`}
                      className={styles.cardLink}
                    >
                      <h2 className={styles.cardsText}>
                        {item.group_code}
                      </h2>
                      <Card.Text className={styles.cardsText}>
                        Контакты: {item.contacts}
                        <br />
                        Курс: {item.course}
                      </Card.Text>
                    </Link>
                    <div className={styles.buttonsContainer}>
                      {isAuthenticated &&
                        !isFeedbackConstructor &&
                        !isFeedbackNotDraft && (
                          <Button
                            variant="success"
                            className={styles.btn}
                            onClick={() =>
                              onAddFeedback && onAddFeedback(item.group_id)
                            }
                          >
                            Запросить обратную связь
                          </Button>
                        )}
                      {isFeedbackConstructor && !isFeedbackNotDraft && (
                        <Button
                          variant="danger"
                          className={styles.btn}
                          onClick={() =>
                            onRemoveFeedback &&
                            onRemoveFeedback(item.group_id)
                          }
                        >
                          Удалить группу
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Card.Text className={styles.cardsText}>
              Нет доступных багажей
            </Card.Text>
          )}
        </Row>
      )}
    </Container>
  );
};

export default GroupList;
