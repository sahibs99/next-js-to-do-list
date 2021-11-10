import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession } from "next-auth/client";

import { useState } from "react";
import Link from "next/link";

import prisma from "../lib/prisma";
import Router from "next/router";

// Checks if it has a valid JWT and renders in our list items
export async function getServerSideProps(context) {
  const todos = await prisma.listItem.findMany();
  const session = await getSession(context);

  return {
    props: {
      data: todos,
      session,
    },
  };
}

export default function Main({ data, session }) {
  const [info, setInfo] = useState({});
  const [items, setItems] = useState(data);

  // Calls API to add to ToDo List
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/todolist/", {
      method: "POST",
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  // Calls API to delete from ToDo List
  async function handleDelete(id) {
    const response = await fetch(`api/todolist/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setItems(items.filter((curr) => curr.id !== id));

    return await response.json();
  }
  if (!session) {
    return (
      <>
        <h1>Restricted Page...</h1>
        <Link href="/">
          <a>Click here to Login</a>
        </Link>
      </>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>MyToDoList!</title>
        </Head>

        <main className={styles.main}>
          <h1 style={{ textAlign: "center" }}>My To Do List!</h1>
          <ol>
            {items.map((result, id) => {
              return (
                <li key={id}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      margin: "20px",
                      padding: "15px",
                    }}
                  >
                    <h3 style={{ color: "red" }}>
                      <Link href={"/items/" + result.id}>{result.task}</Link>{" "}
                    </h3>
                    <br />
                    <span>Priority ? : {result.priority ? "Yes" : "No"}</span>
                    <br />
                    <span>Done ? : {result.finished ? "Yes" : "No"}</span>
                    <br />
                    <span>When Should I Start ? : {result.timeStart}</span>
                    <br />
                    <button
                      onClick={() => {
                        handleDelete(result.id);
                      }}
                    >
                      Remove From List
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
          <form
            onSubmit={async (e) => {
              await handleSubmit(e);
              setItems([...items, info]);
              Router.reload();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "solid",
              width: "100%",
              height: "auto",
              margin: "25px",
              padding: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "17vw",
                justifyContent: "space-between",
              }}
            >
              <label>Task Name</label>
              <input
                type="text"
                required
                placeholder="Task Name"
                name="task"
                onChange={(e) => setInfo({ ...info, task: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label>Priority?</label>
              <input
                type="radio"
                checked
                id="priority-true"
                name="priority"
                value={true}
                onChange={(e) => setInfo({ ...info, priority: true })}
              />
              <label htmlFor="priority-true">Yes</label>
              <input
                type="radio"
                id="priority-false"
                name="priority"
                value={false}
                onChange={(e) => setInfo({ ...info, priority: false })}
              />
              <label htmlFor="priority-false">No</label>
            </div>
            <br />
            <div>
              <label>Task Finished?</label>
              <input
                type="radio"
                checked
                id="finished-true"
                name="finished"
                value={true}
                onChange={(e) => setInfo({ ...info, finished: true })}
              />
              <label htmlFor="finished-true">Yes</label>
              <input
                type="radio"
                id="finished-false"
                name="finished"
                value={false}
                onChange={(e) => setInfo({ ...info, finished: false })}
              />
              <label htmlFor="finished-false">No</label>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                width: "22vw",
                justifyContent: "space-between",
              }}
            >
              <label>When Should I Start?</label>
              <input
                type="text"
                required
                placeholder="now"
                name="timeStart"
                onChange={(e) =>
                  setInfo({ ...info, timeStart: e.target.value })
                }
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}
