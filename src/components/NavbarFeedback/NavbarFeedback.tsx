import React, { useEffect, useRef } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import styles from "./NavbarFeedback.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartFormationDate,
  setEndFormationDate,
  setFeedbackStatus,
} from "../../redux/feedback/feedbackListSlice";
import debounce from "lodash/debounce";
import {
  selectFeedbackStatus,
  selectEndFormationDate,
  selectStartFormationDate,
} from "../../redux/feedback/feedbackListSelectors";

interface NavbarFeedbackProps { }

const NavbarFeedback: React.FC<NavbarFeedbackProps> = () => {
  const dispatch = useDispatch();

  // Используем селекторы из редакса
  const startDate = useSelector(selectStartFormationDate);
  const endDate = useSelector(selectEndFormationDate);
  const status = useSelector(selectFeedbackStatus);

  const inputRef = useRef<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    dispatch(setStartFormationDate(newStartDate || null));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    dispatch(setEndFormationDate(newEndDate || null));
  };

  const handleStatusChange = (selectedStatus: string) => {
    if (selectedStatus === "Выберите статус") {
      dispatch(setFeedbackStatus(null));
    } else {
      dispatch(setFeedbackStatus(selectedStatus));
    }
  };

  // const handleSearch = debounce(() => {
  //   const currentValue = inputRef.current;
  //   if (currentValue && currentValue.trim() !== "") {
  //     dispatch(setsearchFlightNumber(currentValue.trim()));
  //   }
  // }, 200);

  // useEffect(() => {
  //   handleSearch();
  // }, [flightNumber, startDate, endDate, status]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   inputRef.current = e.target.value;
  //   handleSearch();
  // };

  // const handleClearSearch = () => {
  //   dispatch(setsearchFlightNumber(""));
  // };

  return (
    <div className={styles.center}>
    <Navbar className={styles.navbar}>
      <Container>
        <Form className={styles.form}>
          {/* <FormControl
            type="text"
            placeholder="Номер рейса"
            className={`${styles.searchInput} ${styles.datePicker}`}
            value={flightNumber || ""}
            onChange={handleInputChange}
            onInput={(e) => {
              if (!e.currentTarget.value.trim()) {
                handleClearSearch();
              }
            }}
          /> */}
          <FormControl
            type="date"
            placeholder="Дата начала"
            className={`${styles.searchInput} ${styles.datePicker}`}
            value={startDate || ""}
            onChange={handleStartDateChange}
          />
          <FormControl
            type="date"
            placeholder="Дата конца"
            className={`${styles.searchInput} ${styles.datePicker}`}
            value={endDate || ""}
            onChange={handleEndDateChange}
          />
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="dropdown-basic"
              className={styles.dropdownToggle}
            >
              {status || "Выберите статус"}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownContent}>
              {["в работе", "отклонен", "завершен"].map((s) => (
                <Dropdown.Item
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={styles.dropdownItem}
                >
                  {s}
                </Dropdown.Item>
              ))}
              {status &&
                ["в работе", "отклонен", "завершен"].includes(status) && (
                  <Dropdown.Item
                    key="Выберите статус"
                    onClick={() => handleStatusChange("Выберите статус")}
                    className={styles.dropdownItem}
                  >
                    Выберите статус
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavbarFeedback;
