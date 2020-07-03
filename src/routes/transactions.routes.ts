import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
  const repository = getCustomRepository(TransactionsRepository);

  const transactions = await repository.find({
    relations: ['category'],
    select: ['id', 'title', 'value', 'type', 'createdAt', 'updatedAt'],
  });

  const balance = await repository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  // TODO
  const { title, value, type, category } = request.body;

  const service = new CreateTransactionService();

  const transaction = await service.execute({
    title,
    value,
    type,
    categoryName: category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
  const { id } = request.params;

  const service = new DeleteTransactionService();

  await service.execute({ transactionId: id });

  return response.status(200).send();
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
