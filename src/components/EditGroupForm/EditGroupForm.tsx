// EditGroupForm.jsx
import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  GroupDetails,
  setFormData,
} from "../../redux/group/groupDetailsSlice";
import {
  updateGroup,
  updateGroupImage,
} from "../../redux/group/groupDetailsThunk";
import styles from "./EditGroupForm.module.css";
import { useParams } from "react-router";
import { selectUpdateFormData } from "../../redux/group/groupDetailsSelectors";
import { useNavigate } from "react-router-dom";

interface EditGroupFormProps {
  group: GroupDetails | null;
}

const EditGroupForm: React.FC<EditGroupFormProps> = ({ group }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const formData = useSelector(selectUpdateFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handlNavigateGroupList = () => {
    navigate("/group");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(updateGroupImage({ id: Number(id), imageData: formData }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentsAsNumber = Number(formData.students);

    if (!isNaN(studentsAsNumber)) {
      dispatch(
        updateGroup({
          id: Number(id) || 0,
          group: {
            ...formData,
            students: studentsAsNumber,
          },
          navigate: handlNavigateGroupList,
        })
      );
    } else {
      console.error("Ошибка: Количество студентов должно быть числом");
    }
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body className={styles.cardContent}>
          <Card.Title className={styles.cardTitle}>
            Форма изменения группы
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup} controlId="group_code">
              <Form.Label className={styles.formLabel}>Код группы</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите код группы"
                name="group_code"
                value={formData.group_code || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="formContacts">
              <Form.Label className={styles.formLabel}>Контакты</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите контакты"
                name="contacts"
                value={formData.contacts || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="course">
              <Form.Label className={styles.formLabel}>Номер курса</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите номер курса"
                name="course"
                value={formData.course || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="students">
              <Form.Label className={styles.formLabel}>Студентов</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите количество студентов"
                name="students"
                value={formData.students || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="image">
              <Form.Label className={styles.btn}>
                Загрузить изображение
              </Form.Label>
              <div className={styles.customFileInputContainer}>
                <Form.Control
                  className={styles.customFileInput}
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
            </Form.Group>
            <Container className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleSubmit}>
                Изменить группу
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditGroupForm;
