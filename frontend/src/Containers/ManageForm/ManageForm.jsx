import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Code,
  Title,
  Text,
  TextInput,
  Input,
  Select,
  CloseButton,
  ActionIcon,
  Modal,
  Divider,
  Chip,
  Center,
} from "@mantine/core";
import { Tabs } from "@mantine/core";
import {
  IconArrowLeft,
  IconListDetails,
  IconListCheck,
  IconTrash,
  IconEdit,
  IconLink as ExternalLinkIcon,
} from "@tabler/icons";
import styles from "./ManageForm.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import * as api from "../../Utils/constants";
import { ReactComponent as GoogleSheetsLogo } from "./Google_Sheets_Logo.svg";

const ManageForm = ({ isNew }) => {
  const [form, setForm] = React.useState([]);
  const [opened, setOpened] = React.useState(false);
  const [editOpened, setEditOpened] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState({
    question: "",
    type: "text",
    mendatory: false,
    metadata: {
      options: [],
    },
  });
  const [editQuestion, setEditQuestion] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const { formId } = useParams();
  const location = useLocation();

  useEffect(() => {
    !isNew && fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data } = await axios.get(api.GET_FORM_DATA_BY_ID + formId);
      console.log(data);
      setForm(data);
      setQuestions(data.questions);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <IconArrowLeft size={24} />
          </Link>
          <Title
            order={1}
            size="1.25rem"
            style={{
              marginBottom: "0.5rem",
            }}
          >
            {isNew ? "Create Form" : "Manage Form"}
          </Title>
        </div>
        <div className={styles.headerButtons}>
          <Link to={`/form/${formId}`} target="_blank">
            <Button variant="subtle" color="gray">
              Preview
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await axios.post(api.UPDATE_FORM, {
                  ...form,
                });
                console.log(form);
                console.log("response data", form);
              } catch (err) {
                alert("Error in updating form");
                console.log(err);
              }
            }}
          >
            SaveButton
          </Button>
        </div>
      </div>
      <div className={styles.bodyData}>
        <div className={styles.LeftSide}>
          <TextInput
            className={styles.titleInput}
            placeholder="Form Name"
            label="Form Name"
            value={form.name || ""}
            onChange={(e) => {
              setForm({ ...form, name: e.currentTarget.value });
            }}
            withAsteriskform_questions
          />
          <Tabs defaultValue="questions">
            <Tabs.List>
              <Tabs.Tab value="questions" icon={<IconListDetails size={14} />}>
                Questions
              </Tabs.Tab>
              <Tabs.Tab value="rules" icon={<IconListCheck size={14} />}>
                Rules
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="questions" pt="xs">
              <div className={styles.questions}>
                {questions &&
                  questions.map((question, questionIndex) => (
                    <div className={styles.question} key={questionIndex}>
                      <div className={styles.questionHeader}>
                        <div className={styles.questionHeaderLeft}>
                          <Badge variant="filled" color="gray.7" size="xl">
                            {questionIndex + 1}
                          </Badge>
                          <Text fw={100}>{question.question}</Text>
                        </div>
                        <div className={styles.questionHeaderRight}>
                          <ActionIcon
                            className={styles.questionDelete}
                            onClick={() => {
                              setEditQuestion(question);
                              setEditOpened(true);
                            }}
                            color="red.5"
                            variant="light"
                          >
                            <IconEdit size={20} />
                          </ActionIcon>
                          <ActionIcon
                            className={styles.questionDelete}
                            onClick={async () => {
                              const tempQuestions = JSON.parse(
                                JSON.stringify(questions)
                              );
                              tempQuestions.splice(questionIndex, 1);
                              await axios.get(
                                api.DELETE_QUESTION + question._id
                              );

                              setQuestions(tempQuestions);
                            }}
                            color="red.5"
                            variant="light"
                          >
                            <IconTrash size={20} />
                          </ActionIcon>
                        </div>
                      </div>
                      <Divider my="xs"></Divider>
                    </div>
                  ))}
                <Button
                  variant="outline"
                  className={styles.addQuestion}
                  onClick={() => {
                    setOpened(true);
                  }}
                  color="gray"
                >
                  Add Question
                </Button>
                <Center>
                  <Modal
                    centered
                    opened={opened}
                    withCloseButton
                    onClose={() => setOpened(false)}
                    size="lg"
                    position={{ top: 20, left: 20 }}
                    radius="md"
                    title="Add Question"
                  >
                    <TextInput
                      className={styles.questionTitle}
                      placeholder="Question"
                      label="Question"
                      value={newQuestion.question}
                      onChange={(e) => {
                        setNewQuestion({
                          ...newQuestion,
                          question: e.currentTarget.value,
                        });
                      }}
                    />
                    <Select
                      label="Question Type"
                      placeholder="Pick one"
                      value={newQuestion.type}
                      data={[
                        { value: "single", label: "Single Choice" },
                        { value: "multiple", label: "Multiple Choice" },
                        { value: "text", label: "Text" },
                        { value: "number", label: "Number" },
                      ]}
                      className={styles.questionType}
                      onChange={(value) => {
                        setNewQuestion({
                          ...newQuestion,
                          type: value,
                        });
                      }}
                      style={{ marginTop: "0.5rem" }}
                    />
                    {(newQuestion.type === "single" ||
                      newQuestion.type === "multiple") && (
                      <div className={styles.questionOptions}>
                        <Title
                          order={5}
                          className={styles.questionOptionsTitle}
                        >
                          Options
                        </Title>
                        {newQuestion.metadata.options.map((item, index) => (
                          <div className={styles.questionOption} key={index}>
                            <TextInput
                              placeholder="Option Name"
                              value={item.name || ""}
                              className={styles.questionOptionInput}
                              onChange={(e) => {
                                const tempNewQuestion = JSON.parse(
                                  JSON.stringify(newQuestion)
                                );
                                tempNewQuestion.metadata.options[index].name =
                                  e.currentTarget.value;
                                setNewQuestion(tempNewQuestion);
                              }}
                            />
                            <CloseButton
                              className={styles.questionOptionIcon}
                              variant="light"
                              onClick={() => {
                                const tempNewQuestion = JSON.parse(
                                  JSON.stringify(newQuestion)
                                );
                                tempNewQuestion.metadata.options.splice(
                                  index,
                                  1
                                );
                                setQuestions(tempNewQuestion);
                              }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => {
                            const tempNewQuestion = JSON.parse(
                              JSON.stringify(newQuestion)
                            );
                            tempNewQuestion.metadata.options.push({
                              name: "",
                            });
                            setNewQuestion(tempNewQuestion);
                          }}
                          className={styles.questionOptionAdd}
                          color="gray"
                        >
                          Add Option
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="filled"
                      style={{ marginTop: "1rem" }}
                      onClick={async () => {
                        const tempQuestions = JSON.parse(
                          JSON.stringify(questions)
                        );
                        const uploadedNewQuestion = await axios.post(
                          api.ADD_QUESTION,
                          { ...newQuestion, formId: form._id }
                        );
                        tempQuestions.push(uploadedNewQuestion.data);
                        setQuestions(tempQuestions);
                        setNewQuestion({
                          question: "",
                          type: "",
                          metadata: {
                            options: [],
                          },
                        });
                        setOpened(false);
                      }}
                      className={styles.questionAdd}
                    >
                      Add Question
                    </Button>
                  </Modal>
                </Center>
                <Center>
                  <Modal
                    centered
                    opened={editOpened}
                    withCloseButton
                    onClose={() => setEditOpened(false)}
                    size="lg"
                    position={{ top: 20, left: 20 }}
                    radius="md"
                    title="Update Question"
                  >
                    <TextInput
                      className={styles.questionTitle}
                      placeholder="Question"
                      label="Question"
                      value={editQuestion?.question}
                      onChange={(e) => {
                        setEditQuestion({
                          ...editQuestion,
                          question: e.currentTarget.value,
                        });
                      }}
                    />
                    <Select
                      label="Question Type"
                      placeholder="Pick one"
                      value={editQuestion?.type}
                      data={[
                        { value: "single", label: "Single Choice" },
                        { value: "multiple", label: "Multiple Choice" },
                        { value: "text", label: "Text" },
                        { value: "number", label: "Number" },
                      ]}
                      className={styles.questionType}
                      onChange={(value) => {
                        setEditQuestion({
                          ...editQuestion,
                          type: value,
                        });
                      }}
                      style={{ marginTop: "0.5rem" }}
                    />
                    {console.log("editQuestion", editQuestion)}
                    {(editQuestion?.type === "single" ||
                      editQuestion?.type === "multiple") && (
                      <div className={styles.questionOptions}>
                        <Title
                          order={5}
                          className={styles.questionOptionsTitle}
                        >
                          Options
                        </Title>
                        {editQuestion.metadata?.options?.map((item, index) => (
                          <div className={styles.questionOption} key={index}>
                            <TextInput
                              placeholder="Option Name"
                              value={item.name || ""}
                              className={styles.questionOptionInput}
                              onChange={(e) => {
                                const tempNewQuestion = JSON.parse(
                                  JSON.stringify(editQuestion)
                                );
                                tempNewQuestion.metadata.options[index].name =
                                  e.currentTarget.value;
                                setEditQuestion(tempNewQuestion);
                              }}
                            />
                            <CloseButton
                              className={styles.questionOptionIcon}
                              variant="light"
                              onClick={() => {
                                const tempNewQuestion = JSON.parse(
                                  JSON.stringify(editQuestion)
                                );
                                tempNewQuestion.metadata.options.splice(
                                  index,
                                  1
                                );
                                setQuestions(tempNewQuestion);
                              }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => {
                            const tempNewQuestion = JSON.parse(
                              JSON.stringify(editQuestion)
                            );

                            tempNewQuestion.metadata.options.push({
                              name: "",
                            });
                            setEditQuestion(tempNewQuestion);
                          }}
                          className={styles.questionOptionAdd}
                          color="gray"
                        >
                          Add Option
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="filled"
                      style={{ marginTop: "1rem" }}
                      onClick={async () => {
                        const tempQuestions = JSON.parse(
                          JSON.stringify(questions)
                        );
                        const updatedQuestion = await axios.post(
                          api.UPDATE_QUESTION,
                          { ...editQuestion }
                        );
                        tempQuestions[tempQuestions.indexOf(editQuestion)] =
                          updatedQuestion.data;

                        setQuestions(tempQuestions);
                        setEditOpened(false);
                        setEditQuestion(null);
                      }}
                      className={styles.questionAdd}
                    >
                      Update Question
                    </Button>
                  </Modal>
                </Center>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="rules" pt="xs">
              Rules tab content
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className={styles.rightSide}>
          <Select
            label="Form Status"
            placeholder="Pick one"
            value={form.status}
            data={[
              { value: "Paused", label: "Paused" },
              { value: "Draft", label: "Draft" },
              { value: "Live", label: "Live" },
            ]}
            className={styles.formStatus}
            onChange={(value) => {
              setForm({ ...form, status: value });
            }}
          />
          {/* <Select
            label="Integration"
            placeholder="Pick one"
            value={form.integration}
            data={[{ value: "Google Sheets", label: "Google Sheets" }]}
            style={{
              marginTop: "1rem",
            }}
          /> */}
          <Title
            order={5}
            style={{
              marginTop: "1rem",
            }}
          >
            Integrations
          </Title>
          <Button
            variant="outline"
            color="green"
            leftIcon={<GoogleSheetsLogo />}
            style={{
              marginTop: "0.5rem",
            }}
          >
            Connect to Google Sheets
          </Button>
          {/* If connected to google sheets */}
          <Button
            component="a"
            variant="filled"
            href="/#google-sheets"
            color="green"
            style={{
              marginTop: "0.5rem",
            }}
            rightIcon={<ExternalLinkIcon size={18} />}
          >
            Visit Google Sheet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageForm;
