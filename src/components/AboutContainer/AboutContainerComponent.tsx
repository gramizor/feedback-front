// NavigationBar.tsx
import React from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./AboutContainerComponent.module.css";
const AboutContainerComponent: React.FC = () => {
  return (
    <Container className={styles.aboutContainer}>
      <Card>
        <Card.Body>
          {/* <Card.Title className={styles.aboutTitle}>
            Feedback
          </Card.Title> */}
          <Card.Text className={styles.aboutInformation}>
            Этот веб - сайт — настоящая находка для преподавателей, и вот почему: здесь вы можете создавать опросы, спрашивая своих студентов об их впечатлениях от курса.
            Полученные ответы — настоящее сокровище ценной информации, которая помогает вам совершенствовать свои занятия.Так что если вы хотите, чтобы ваш курс был на высшем уровне, вы попали по адресу!
            На этом сайте мы стремимся создать мост между преподавателями и студентами, давая вам возможность не только учить, но и учиться на основе обратной связи. Здесь вы можете легко проводить опросы, собирая не только похвалы, но и конструктивные предложения.
            Мы верим, что образование — это взаимный процесс, и ваш курс заслуживает быть лучшим, благодаря мнению тех, кто его проходит.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutContainerComponent;
