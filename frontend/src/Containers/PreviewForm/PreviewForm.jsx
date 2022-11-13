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
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as api from "../../Utils/constants";

const parseQuestionKey = (key) => {
  return key?.replace(/\s+/g, "_").toLowerCase();
};

const PreviewForm = ({}) => {
  const [form, setForm] = React.useState({});
  const [answers, setAnswers] = React.useState({});
  const { formId } = useParams();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const fetcehedForm = async () => {
        try {
          const { data } = await axios.get(api.GET_FORM_DATA_BY_ID + formId);
          console.log(data);
          setForm(data);
        } catch (err) {
          alert(err);
          console.log(err);
        }
      };
      setForm(fetcehedForm);
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
          align="center"
        >
          {form.name}
        </Title>
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
                  {question.metadata.options.map((option, optionIndex) => (
                    <>
                      <Radio
                        key={optionIndex}
                        value={option.name}
                        label={option.name}
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
                  {question.metadata.options.map((option, optionIndex) => (
                    <Checkbox
                      key={optionIndex}
                      value={option.name}
                      label={option.name}
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
