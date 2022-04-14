import { NextApiRequest, NextApiResponse } from 'next';

const Entry = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    id: 1,
    username: 'test user',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  });
};

export default Entry;
