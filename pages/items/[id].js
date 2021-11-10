import Head from "next/head";

import { useState } from "react";
import prisma from "../../lib/prisma";
import Router from "next/router";
import { getSession } from "next-auth/client";
import Link from "next/link";

// Checks the session and retrieve singular todo list item
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const id = context.query.id;
  const todo = await prisma.listItem.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      data: todo,
      session,
    },
  };
}

export default function Item({ data, session }) {
  const [info, setInfo] = useState({});
  const [item, setItem] = useState(data);

  // Calls API to update singular to do item
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`/api/todolist/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  if (!session) {
    return (
      <>
        <h1>Restricted Page...</h1>
        <Link href="/">
          <a>Click here to login</a>
        </Link>
      </>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Test</title>
        </Head>
        <main>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "20px",
            }}
            key={item.id}
          >
            <h3>{item.task}</h3>
            <span>Priority ? : {item.priority ? "Yes" : "No"}</span>
            <br />
            <span>Done ? : {item.finished ? "Yes" : "No"}</span>
            <br />
            <span>When Should I Start ? : {item.timeStart}</span>
            <br />
          </div>
          <form
            onSubmit={async (e) => {
              await handleSubmit(e);
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
