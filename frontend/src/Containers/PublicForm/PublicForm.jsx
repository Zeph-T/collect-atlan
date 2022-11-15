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
  Center,
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
import styles from "./PublicForm.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as api from "../../Utils/constants";

const parseQuestionKey = (key) => {
  return key?.replace(/\s+/g, "_").toLowerCase();
};

const PublicForm = ({ }) => {
  const [form, setForm] = React.useState({});
  const [answers, setAnswers] = React.useState({});
  const { formId } = useParams();
  const [accepting, setAccepting] = React.useState(true);
  const [submitted , setSubmitted] = React.useState(false);
  useEffect(() => {
    fetchFormData();
  }, []);

  const submitResponse = async () => {
    try{
      console.log(answers);
      const {data} = await axios.post(api.SUBMIT_FORM_URL + formId, answers);
      if(data.status && data.status === "Submitted!"){
        setSubmitted(true);
      }
    }catch(err){
      console.log(err);
      alert(err);
    }

  }

  const displayMiddle = (message) => {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Title align="center">
          {message}
        </Title>
      </div>
    )
  }

  const fetchFormData = async () => {
    try {
      const fetcehedForm = async () => {
        try {
          const { data } = await axios.get(api.PUBLIC_FORM_DATA + formId , answers);
          if (data && data.status !== "Live") {
            setAccepting(false);
          } else {
            setForm(data);
          }
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

  if (!accepting) {
    return displayMiddle("This Form is not accepting responses at the moment");
  }

  if(submitted){
    return displayMiddle("Submission Recorded!")
  }



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

          <Button variant="outline" onClick={submitResponse} className={styles.addQuestion} color="gray">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicForm;
