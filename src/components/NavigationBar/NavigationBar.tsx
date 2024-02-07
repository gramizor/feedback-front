// NavigationBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button"; // Импортируем компонент Button из Bootstrap
import logo from "../../../public/BagTracker.png";
import styles from "./NavigationBar.module.css";
import { logout } from "../../redux/auth/authActions.ts"; // Импортируем экшен для выхода
import {
  selectIsAuthenticated,
  selectfull_name,
} from "../../redux/auth/authSelectors.ts";
import { selectFeedbackID } from "../../redux/group/groupListSelectors.ts";

const NavigationBar: React.FC = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch
  const navigate = useNavigate();
  const full_name = useSelector(selectfull_name);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const feedbackID = useSelector(selectFeedbackID);
  const showConstructor = {
    showConstructorButton: feedbackID > 0,
    feedbackID,
  };
  const handleLogout = () => {
    dispatch(logout({ navigate })); // Диспатчим экшен для выхода
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
              <div className={styles.authorized}>
                <>
                  <Nav.Link as={Link} to="/feedback" className={styles.navLink}>
                    Мои заявки
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
                </>
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
              </div>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/auth" className={styles.enter}>
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
