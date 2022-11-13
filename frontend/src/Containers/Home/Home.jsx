import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Code,
  Title,
  Text,
  Center,
  Modal,
  TextInput,
} from "@mantine/core";
import { Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../Utils/constants";
import axios from "axios";

const Home = () => {
  const exampleState = useSelector((state) => state.example.exampleState);
  const [forms, setForms] = React.useState([]);
  const [opened, setOpened] = React.useState(false);
  const [formName, setFormName] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data } = await axios.get(api.GET_ALL_FORMS);
      const form_data = data.map((form) => {
        return {
          ...form,
          questions: [],
          responses: [],
        };
      });
      console.log("response data", data);
      setForms(form_data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const createNewForm = async () => {
    try {
      const { data } = await axios.post(api.CREATE_FORM, {
        name: formName,
      });

      console.log("response data", data);
      setOpened(false);
      setFormName("");
      navigate(`/manage-form/${data._id}`);
      fetchForms();
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title
          order={2}
          style={{
            marginBottom: "0.5rem",
          }}
        >
          Your Forms
        </Title>
        <Button onClick={() => setOpened(true)} variant="outline">
          Create New Form
        </Button>
      </div>
      <div className={styles.formsList}>
        {forms.map((form) => (
          <Link
            to={"/manage-form/" + form._id}
            state={{ form: form }}
            className={styles.formCard}
          >
            <div className={styles.formCardHeader}>
              <Title order={4}>{form.name}</Title>
              <Badge>{form.status}</Badge>
            </div>
            <div className={styles.formCardBody}>
              <div className={styles.formCardBodyLeftSec}>
                <div className={styles.formCardBodyLeftSecItem}>
                  <Text color="gray.6" size={"sm"}>
                    Published
                  </Text>
                  <Text weight={500}>
                    {new Date(form.published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </div>
                <div className={styles.formCardBodyLeftSecItem}>
                  <Text color="gray.6" size={"sm"}>
                    Modified
                  </Text>
                  <Text weight={500}>
                    {new Date(form.modified).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </div>
              </div>
              <div className={styles.formCardBodyRightSec}>
                <div className={styles.formCardBodyRightSecItem}>
                  <Text weight={"bold"} size={"xl"}>
                    {form.questions.length}{" "}
                  </Text>
                  <Text color="gray.6" size={"sm"}>
                    Questions
                  </Text>
                </div>
                <div className={styles.formCardBodyRightSecItem}>
                  <Text weight={"bold"} size={"xl"}>
                    {form.responses.length}{" "}
                  </Text>
                  <Text color="gray.6" size={"sm"}>
                    Responses
                  </Text>
                </div>
              </div>
            </div>
            {console.log(form)}
          </Link>
        ))}
      </div>
      <Center>
        <Modal
          centered
          opened={opened}
          withCloseButton
          onClose={() => setOpened(false)}
          size="lg"
          position={{ top: 20, left: 20 }}
          radius="md"
          title="Create New Form"
        >
          <form className={styles.modalContainer} onSubmit={createNewForm}>
            <TextInput
              label="Form Name"
              placeholder="Enter Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Create
            </Button>
          </form>
        </Modal>
      </Center>
    </div>
  );
};

export default Home;
