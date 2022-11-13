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
  Radio,
  Tooltip,
  CopyButton,
  Checkbox,
  NumberInput,
} from "@mantine/core";
import { Tabs } from "@mantine/core";
import {
  IconArrowLeft,
  IconListDetails,
  IconListCheck,
  IconTrash,
  IconShare,
  IconCheck,
  IconCopy,
} from "@tabler/icons";
import styles from "./PreviewForm.module.css";
import { Link } from "react-router-dom";

const parseQuestionKey = (key) => {
  return key?.replace(/\s+/g, "_").toLowerCase();
};

const PreviewForm = ({}) => {
  const [form, setForm] = React.useState({});
  const [answers, setAnswers] = React.useState({});

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const tempData = new Array(10).fill({}).map((_, i) => ({
        _id: i,
        name: `Form ${i + 1}`,
        status: ["draft", "live"][Math.floor(Math.random() * 2) + 1],
        published: new Date().toISOString(),
        modified: new Date().toISOString(),
        questions: new Array(10).fill({}).map((_, i) => ({
          id: i,
          question: `Question ${i + 1}`,
          type: ["single", "multiple", "text", "number"][
            Math.floor(Math.random() * 4)
          ],
          mendatory: Math.random() > 0.5,
          meta: {
            options: new Array(4).fill({}).map((_, i) => ({
              value: `Option ${i}`,
            })),
          },
        })),
        responses: new Array(Math.floor(Math.random() * 50))
          .fill({})
          .map((_, i) => ({
            id: i,
            answers: new Array(10).fill({}).map((_, i) => ({
              id: i,
              answer: `Answer ${i}`,
            })),
          })),
      }));
      setForm(tempData[0]);
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
            {form.name}
          </Title>
        </div>
        <div className={styles.headerButtons}>
          <CopyButton value={window.location.href} timeout={1000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <Button
                  variant="outline"
                  color={copied ? "teal" : "gray"}
                  leftIcon={
                    copied ? <IconCheck size={16} /> : <IconCopy size={16} />
                  }
                  onClick={copy}
                >
                  Share
                </Button>
              </Tooltip>
            )}
          </CopyButton>
        </div>
      </div>
      <div className={styles.bodyData}>
        <div className={styles.questions}>
          {form?.questions?.map((question, questionIndex) => (
            <div className={styles.question} key={questionIndex}>
              <div className={styles.questionHeader}>
                <div className={styles.questionHeaderLeft}>
                  <Badge variant="filled" color="gray.7" size="xl">
                    {questionIndex + 1}
                  </Badge>
                  <div className={styles.questionHeaderLeftText}>
                    <Title order={4}>{question.question}</Title>
                    <Title
                      order={6}
                      color="gray"
                      className={styles.headerSubtitle}
                    >
                      {question.type}
                    </Title>
                  </div>
                </div>
              </div>
              {question.type === "single" && (
                <Radio.Group
                  orientation="vertical"
                  spacing="sm"
                  value={answers[parseQuestionKey(question.question)] || ""}
                  onChange={(value) => {
                    setAnswers({
                      ...answers,
                      [parseQuestionKey(question.question)]: value,
                    });
                  }}
                >
                  {question.meta.options.map((option, optionIndex) => (
                    <>
                      <Radio
                        key={optionIndex}
                        value={option.value}
                        label={option.value}
                        color="teal"
                      />
                    </>
                  ))}
                </Radio.Group>
              )}
              {question.type === "multiple" && (
                <Checkbox.Group
                  orientation="vertical"
                  spacing="sm"
                  value={answers[parseQuestionKey(question.question)] || []}
                  onChange={(value) => {
                    setAnswers({
                      ...answers,
                      [parseQuestionKey(question.question)]: value,
                    });
                  }}
                >
                  {question.meta.options.map((option, optionIndex) => (
                    <Checkbox
                      key={optionIndex}
                      value={option.value}
                      label={option.value}
                      color="teal"
                    />
                  ))}
                </Checkbox.Group>
              )}
              {question.type === "text" && (
                <TextInput
                  width="fit"
                  value={answers[parseQuestionKey(question.question)] || ""}
                  onChange={(event) => {
                    setAnswers({
                      ...answers,
                      [parseQuestionKey(question.question)]:
                        event.currentTarget.value,
                    });
                  }}
                />
              )}
              {question.type === "number" && (
                <NumberInput
                  value={answers[parseQuestionKey(question.question)] || ""}
                  onChange={(value) => {
                    setAnswers({
                      ...answers,
                      [parseQuestionKey(question.question)]: value,
                    });
                  }}
                />
              )}
            </div>
          ))}

          <Button variant="outline" className={styles.addQuestion} color="gray">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
