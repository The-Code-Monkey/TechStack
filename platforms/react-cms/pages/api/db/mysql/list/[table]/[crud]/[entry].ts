import { NextApiRequest, NextApiResponse } from 'next';

const CRUD = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.query.crud) {
    case 'create':
      res.status(200).send({
        type: 'CREATE',
        data: JSON.parse(req.body),
      });
      break;
    case 'delete':
      res.status(200).send({
        type: 'DELETE',
      });
      break;
    case 'update':
      res.status(200).send({
        type: 'UPDATE',
      });
      break;
    default:
      res.status(404).send({ error: `Unknown request type ${req.query.crud}` });
  }
};

export default CRUD;
