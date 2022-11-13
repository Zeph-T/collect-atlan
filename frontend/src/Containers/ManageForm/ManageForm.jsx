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
  Center
} from "@mantine/core";
import { Tabs } from "@mantine/core";
import {
  IconArrowLeft,
  IconListDetails,
  IconListCheck,
  IconTrash,
  IconEdit
} from "@tabler/icons";
import styles from "./ManageForm.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { GET_FORM_DATA_BY_ID } from "../../Utils/constants";



const ManageForm = ({ isNew }) => {
  const exampleState = useSelector((state) => state.example.exampleState);
  const [form, setForm] = React.useState([]);
  const [opened, setOpened] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState({
    question: "",
    type: "text",
    mendatory: false,
    meta: {
      options: []
    }
  });
  const [questions, setQuestions] = React.useState([]);
  const { formId } = useParams();
  const { state } = useLocation();
  const form_data = state.form;

  useEffect(() => {
    !isNew && fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data } = await axios.get(GET_FORM_DATA_BY_ID + formId);
      const formData = {
        ...form_data,
        questions: data,
        responses: []
      };
      // const tempData = new Array(10).fill({}).map((_, i) => ({
      //   _id: i,
      //   name: `Form ${i + 1}`,
      //   status: ["draft", "live"][Math.floor(Math.random() * 2) + 1],
      //   published: new Date().toISOString(),
      //   modified: new Date().toISOString(),
      //   questions: new Array(Math.floor(Math.random() * 10))
      //     .fill({})
      //     .map((_, i) => ({
      //       id: i,
      //       question: `Question ${i + 1}`,
      //       type: ["single", "multiple", "text", "number"][
      //         Math.floor(Math.random() * 4)
      //       ],
      //       mendatory: Math.random() > 0.5,
      //       meta: {
      //         options: new Array(4).fill({}).map((_, i) => ({
      //           value: `Option ${i}`,
      //         })),
      //       },
      //     })),
      //   responses: new Array(Math.floor(Math.random() * 50))
      //     .fill({})
      //     .map((_, i) => ({
      //       id: i,
      //       answers: new Array(10).fill({}).map((_, i) => ({
      //         id: i,
      //         answer: `Answer ${i}`,
      //       })),
      //     })),
      // }));
      setForm(formData);
      setQuestions(data);
      console.log(data)
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
            order={2}
            style={{
              marginBottom: "0.5rem",
            }}
          >
            {isNew ? "Create Form" : "Manage Form"}
          </Title>
        </div>
        <div className={styles.headerButtons}>
          {isNew ? (
            <Button variant="subtle" color="gray">
              Save as Draft
            </Button>
          ) : null}
          <Button variant="outline">Publish Form</Button>
        </div>
      </div>
      <div className={styles.bodyData}>
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
              {questions && questions.map((question, questionIndex) => (
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
                        //onClick={}
                        color="red.5"
                        variant="light"
                      >
                        <IconEdit size={20} />
                      </ActionIcon>
                      <ActionIcon
                        className={styles.questionDelete}
                        onClick={() => {
                          const tempQuestions = JSON.parse(
                            JSON.stringify(questions)
                          );
                          tempQuestions.splice(questionIndex, 1);
                          setQuestions(tempQuestions);
                        }}
                        color="red.5"
                        variant="light"
                      >
                        <IconTrash size={20} />
                      </ActionIcon>
                    </div>
                  </div>
                  <Divider my="sm"></Divider>
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
                >
                  <TextInput
                    className={styles.questionTitle}
                    placeholder="Question"
                    label="Question"
                    value=""
                  />
                  <Select
                    label="Question Type"
                    placeholder="Pick one"
                    value={newQuestion.type}
                    // onChange={(value) => {
                    //   const tempQuestions = [...questions];
                    //   tempQuestions[questionIndex].type = value;
                    //   console.log(value);
                    //   setQuestions(tempQuestions);
                    // }}
                    data={[
                      { value: "single", label: "Single Choice" },
                      { value: "multiple", label: "Multiple Choice" },
                      { value: "text", label: "Text" },
                      { value: "number", label: "Number" },
                    ]}
                    className={styles.questionType}
                  />
                  {(newQuestion.type === "single" ||
                    newQuestion.type === "multiple") && (
                      <div className={styles.questionOptions}>
                        <Title order={5} className={styles.questionOptionsTitle}>
                          Options
                        </Title>
                        {newQuestion.meta.options.map((item, index) => (
                          <div className={styles.questionOption} key={index}>
                            <TextInput
                              placeholder="Option Name"
                              value={item.name || ""}
                              className={styles.questionOptionInput}
                              onChange={(e) => {
                                const tempQuestions = [...questions];
                                tempQuestions[index].meta.options[index].name =
                                  e.currentTarget.value;
                                setQuestions(tempQuestions);
                              }}
                            />
                            <CloseButton
                              className={styles.questionOptionIcon}
                              variant="light"
                              onClick={() => {
                                const tempQuestions = JSON.parse(
                                  JSON.stringify(questions)
                                );
                                console.log(
                                  JSON.parse(JSON.stringify(tempQuestions))
                                );
                                console.log(questionIndex);
                                tempQuestions[questionIndex].meta.options.splice(
                                  index,
                                  1
                                );
                                console.log(
                                  JSON.parse(JSON.stringify(tempQuestions))
                                );
                                setQuestions(tempQuestions);
                              }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => {
                            const tempQuestions = [...questions];
                            tempQuestions[questionIndex].meta.options.push({
                              name: "",
                            });
                            setQuestions(tempQuestions);
                          }}
                          className={styles.questionOptionAdd}
                          color="gray"
                        >
                          Add Option
                        </Button>
                      </div>
                    )}
                </Modal>
              </Center>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="rules" pt="xs">
            Rules tab content
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageForm;


/*

                  <div className={styles.questionHeader}>
                    <div className={styles.questionHeaderLeft}>
                      <Badge variant="filled" color="gray.7" size="xl">
                        {questionIndex + 1}
                      </Badge>
                      <TextInput
                        className={styles.questionTitle}
                        placeholder="Question"
                        label="Question"
                        value={question.question || ""}
                        onChange={(e) => {
                          const tempQuestions = [...questions];
                          tempQuestions[questionIndex].question =
                            e.currentTarget.value;
                          setQuestions(tempQuestions);
                        }}
                      />
                    </div>
                    <div className={styles.questionHeaderRight}>
                      <ActionIcon
                        className={styles.questionDelete}
                        onClick={() => {
                          const tempQuestions = JSON.parse(
                            JSON.stringify(questions)
                          );
                          tempQuestions.splice(questionIndex, 1);
                          setQuestions(tempQuestions);
                        }}
                        color="red.5"
                        variant="light"
                      >
                        <IconTrash size={20} />
                      </ActionIcon>
                    </div>
                  </div>
*/