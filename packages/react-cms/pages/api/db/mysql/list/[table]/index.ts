import { NextApiRequest, NextApiResponse } from "next";

const List = async (req: NextApiRequest, res: NextApiResponse) => {
  // @TODO: Add Real DB Connection HERE
  res.send([
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.co",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    {
      id: 1,
      username: "test user",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
  ]);
};

export default List;
