// CreateGroupForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createGroup } from "../../redux/group/groupListThunk";
import styles from "./CreateGroupForm.module.css";
import { useNavigate } from "react-router";
import { selectFormData } from "../../redux/group/groupListSelectors";
import { setFormData } from "../../redux/group/groupListSlice";

interface FormState {
  contacts: string;
  group_code: string;
  course: number;
  students: number;
}

const CreateGroupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formData = useSelector(selectFormData); // Получаем данные формы из Redux
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Диспетчим действие для обновления данных формы в Redux
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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      createGroup({
        contacts: formData.contacts,
        group_code: formData.group_code,
        course: Number(formData.course),
        students: Number(formData.students),
        navigate: handlNavigateGroupList, // Передаем функцию навигации
      })
    );
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            Форма создания группы
          </Card.Title>
          <Form className={styles.formContainer} onSubmit={handleSubmit}>
            <Form.Group
              className={styles.formGroup || ""}
              controlId="formGroupCode"
            >
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
            <Container className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleSubmit}>
                Создать багаж
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateGroupForm;
