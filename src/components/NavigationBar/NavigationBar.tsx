// NavigationBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import styles from "./NavigationBar.module.css";
import { logout } from "../../redux/auth/authActions.ts"; // Импортируем экшен для выхода
import {
  selectIsAuthenticated,
  selectRole,
  selectfull_name,
  selectisAdmin,
} from "../../redux/auth/authSelectors.ts";
import { selectFeedbackID } from "../../redux/group/groupListSelectors.ts";

const NavigationBar: React.FC = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch
  const navigate = useNavigate();
  const full_name = useSelector(selectfull_name);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const feedbackID = useSelector(selectFeedbackID);
  const isAdmin = useSelector(selectisAdmin);
  const role = useSelector(selectRole);
  const showConstructor = {
    showConstructorButton: feedbackID > 0,
    feedbackID,
  };
  const handleLogout = () => {
    dispatch(logout({ navigate }));
    navigate("/auth");
  };
  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Collapse className={styles.collapse}>

          <Navbar.Brand as={Link} to="/group" className={styles.someText}>
            Группы
          </Navbar.Brand>

          <Nav className={styles.nav}>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/feedback" className={styles.navLink}>
                  {isAdmin ? "Заявки" : "Мои заявки"}
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={`/feedback/${showConstructor.feedbackID}`}
                  disabled={!showConstructor.showConstructorButton}
                  className={`${styles.navLink} ${!showConstructor.showConstructorButton
                    ? styles.disabledLink
                    : ""
                    }`}
                >
                  Конструктор заявки
                </Nav.Link>
                <Navbar.Brand className={styles.someText}>
                  Вы вошли как {full_name}
                </Navbar.Brand>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className={styles.logout}
                >
                  Выйти
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/auth" className={styles.logout}>
                  Вход
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
