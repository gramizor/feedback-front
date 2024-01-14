import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

interface RegisterFormProps {
  onRegister: (full_name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [full_name, setfull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    onRegister(full_name, email, password);
    navigate("/auth"); // После успешной регистрации переходим на главную страницу
  };

  return (
    <Form className={styles.registerForm}>
      <Form.Label className={styles.title}>Регистрация</Form.Label>
      <Form.Group controlId="formName" className={styles.formgroup}>
        <Form.Label className={styles.label}>ФИО:</Form.Label>
        <Form.Control
          className={styles.input}
          type="name"
          placeholder="Введите ФИО"
          value={full_name}
          onChange={(e) => setfull_name(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className={styles.formgroup}>
        <Form.Label className={styles.label}>Почта:</Form.Label>
        <Form.Control
          className={styles.input}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className={styles.formgroup}>
        <Form.Label className={styles.label}>Пароль:</Form.Label>
        <Form.Control
          className={styles.input}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleRegister}
        className={styles.registerButton}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegisterForm;