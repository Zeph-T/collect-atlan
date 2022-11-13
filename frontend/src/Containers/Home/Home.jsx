import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, Code, Title, Text } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import * as api from "../../Utils/constants";
import axios from "axios";

const Home = () => {
  const exampleState = useSelector((state) => state.example.exampleState);
  const [forms, setForms] = React.useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data }  = await axios.get(api.GET_ALL_FORMS);
      const form_data = data.map(form=>{
        return {
          ...form,
          questions : [],
          responses : []
        }
      })
      console.log("response data",data);
      const tempData = new Array(10).fill({}).map((_, i) => ({
        _id: i,
        name: `Form ${i}`,
        status: ["draft", "live"][Math.floor(Math.random() * 2)],
        published: new Date().toISOString(),
        modified: new Date().toISOString(),
        questions: new Array(Math.floor(Math.random() * 10))
          .fill({})
          .map((_, i) => ({
            id: i,
            question: `Question ${i}`,
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
      setForms(form_data);
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
        <Link to="/create-form">
          <Button variant="outline">Create New Form</Button>
        </Link>
      </div>
      <div className={styles.formsList}>
        {forms.map((form) => (
          <Link to={"/manage-form/" + form._id} state = {{form : form}} className={styles.formCard}>
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
      {/* <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
            Messages
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs> */}
    </div>
  );
};

export default Home;
