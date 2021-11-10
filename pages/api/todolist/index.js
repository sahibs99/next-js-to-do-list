import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/client";

// API that creates a new ToDo list item. Also checks if authorized to use API
export default async (req, res) => {
  const session = getSession({ req });
  if (!session) {
    res.send({
      error: "Error, you are not allowed to use this API, login please!",
    });
  }
  const data = JSON.parse(req.body);

  const newToDo = await prisma.listItem.create({
    data,
  });

  res.json(newToDo);
};
