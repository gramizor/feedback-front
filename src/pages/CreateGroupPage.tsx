// CreateGroupPage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import CreateGroupForm from "../components/CreateGroupForm/CreateGroupForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const CreateGroupPage: React.FC = () => {
  return (
    <Container>
      <NavigationBar />
      <CreateGroupForm />
    </Container>
  );
};

export default CreateGroupPage;
