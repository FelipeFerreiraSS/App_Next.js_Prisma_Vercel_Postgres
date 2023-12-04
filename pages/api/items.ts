import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newItem);
  } else if (req.method === 'PUT') {
    const { id, name, description } = req.body;
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id as string) },
      data: {
        name: name as string,
        description: description as string,
      },
    });
    res.status(200).json(updatedItem);

  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const deletedItem = await prisma.item.delete({
      where: { id: parseInt(id as string) },
    });
    res.status(200).json(deletedItem);
  }
}
