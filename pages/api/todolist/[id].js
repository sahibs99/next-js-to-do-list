import prisma from "../../../lib/prisma";

import { getSession } from "next-auth/client";

// API that handles both DELETE and UPDATE calls while validating usage

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({
      error: "Error, you are not allowed to use this API, login please!",
    });
  }

  const { id } = req.query;
  if (req.method === "PUT") {
    const data = JSON.parse(req.body);

    const updatedTodoItem = await prisma.listItem.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    res.json(updatedTodoItem);
  } else {
    if (req.method === "DELETE") {
      const deletedTodoItem = await prisma.listItem.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json(deletedTodoItem);
    }
  }
};
