// EditGroupPage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import EditGroupForm from "../components/EditGroupForm/EditGroupForm";

import { selectGroupDetails } from "../redux/group/groupDetailsSelectors";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const EditGroupPage: React.FC = () => {
  const group = useSelector(selectGroupDetails);

  return (
    <Container>
      <NavigationBar />
      <EditGroupForm group={group} />
    </Container>
  );
};

export default EditGroupPage;
