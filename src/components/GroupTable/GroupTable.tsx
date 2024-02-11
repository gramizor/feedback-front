// GroupTable.tsx
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./GroupTable.module.css";

import { Group } from "../../redux/group/groupListSlice";
import { useNavigate } from "react-router";
import { deleteGroup } from "../../redux/group/groupListThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import defaultPhoto from "/bmstu.png";
import { selectcourseNumber, selectgroupCode } from "../../redux/group/groupListSelectors";

interface GroupTableProps {
  group: Group[] | undefined;
  isAdmin: boolean;
  isFeedbackConstructor: boolean;
  isFeedbackNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddFeedback?: (groupId: number) => void;
}

const GroupTable: React.FC<GroupTableProps> = ({
  group,
  isAdmin,
  isFeedbackConstructor,
  isFeedbackNotDraft,
  isAuthenticated,
  onAddFeedback,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const groupCode = useSelector(selectgroupCode);
  const courseNumber = useSelector(selectcourseNumber);
  const handleRowClick = (groupID: number, e: React.MouseEvent) => {
    navigate(`/group/${groupID}`);
    e.stopPropagation();
  };

  const handleEditClick = (groupID: number, e: React.MouseEvent) => {
    navigate(`/group/${groupID}/update`);
    e.stopPropagation();
  };

  const handleDeleteClick = (groupID: number, e: React.MouseEvent) => {
    dispatch(deleteGroup({ groupID: groupID, groupCode: groupCode, courseNumber: courseNumber }));
    e.stopPropagation();
  };

  const handleCreateClick = () => {
    navigate("/group/create");
  };
  return (
    <>

      <Table className={styles.table}>
        {isAdmin && (
          <tr>
            <td colSpan={9} className={styles.td}>
              <Button
                variant="success"
                onClick={handleCreateClick}
                className={styles.createBtn}
              >
                Добавить новую группу
              </Button>
            </td>
          </tr>
        )}
        <thead className={styles.tblHeader}>
          <tr>
            <th className={styles.th}>Название группы</th>
            <th className={styles.th}>Контакты</th>
            <th className={styles.th}>Номер курса</th>
            <th className={styles.th}>Количество студентов</th>
            <th className={styles.th}>Фото</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody className={styles.tblContent}>
          {group &&
            group.map((groupItem) => (
              <tr
                key={groupItem.group_id}
                className={`${styles.tr} ${styles.clickable}`}
              // onClick={(e) => handleRowClick(groupItem.group_id, e)}
              >
                <td className={styles.td}>{groupItem.group_code}</td>
                <td className={styles.td}>{groupItem.contacts}</td>
                <td className={styles.td}>{groupItem.course}</td>
                <td className={styles.td}>{groupItem.students}</td>
                <td className={styles.td} style={{ position: "relative" }}>
                  <img
                    src={groupItem.photo || defaultPhoto}
                    alt={`Group ${groupItem.group_id}`}
                    className={styles.photo}
                  />
                </td>
                <td className={styles.td} style={{ position: "relative" }}>
                  {isAdmin && (
                    <>
                      <Button
                        variant="warning"
                        onClick={(e) =>
                          handleEditClick(groupItem.group_id, e)
                        }
                        className={styles.btn}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="danger"
                        className={styles.btn}
                        onClick={(e) =>
                          handleDeleteClick(groupItem.group_id, e)
                        }
                      >
                        Удалить
                      </Button>
                    </>
                  )}
                  <Button
                    variant="danger"
                    className={styles.btn}
                    onClick={(e) => handleRowClick(groupItem.group_id, e)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    variant="success"
                    className={styles.btn}
                    onClick={() =>
                      onAddFeedback && onAddFeedback(groupItem.group_id)
                    }
                  >
                    Добавить группу
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default GroupTable;
