import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Task from '../entity/Task';

class TaskController {
  static newTask = async (req: Request, res: Response) => {
    const { text } = req.body;

    const task = new Task();
    task.text = text;

    const errors = await validate(task);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const taskRepository = getRepository(Task);
    await taskRepository.save(task);

    res.status(201).send('Task created');
  };

  static editTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, text } = req.body;

    const taskRepository = getRepository(Task);

    let task;
    try {
      task = await taskRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Task not found');
      return;
    }

    task.status = status;
    task.text = text;

    const errors = await validate(task);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    await taskRepository.save(task);

    res.status(204).send();
  };

  static deleteOneById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const taskRepository = getRepository(Task);

    try {
      await taskRepository.findOneOrFail(id);
    } catch (e) {
      res.status(404).send('Task not found');
      return;
    }

    await taskRepository.delete(id);
    res.status(204).send();
  };

  static getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskRepository = getRepository(Task);

    try {
      const task = await taskRepository.findOneOrFail(id, {
        select: ['id', 'text', 'status'],
      });

      res.send(task);
    } catch (e) {
      res.status(404).send('Task not found');
    }
  };

  static getAll = async (req: Request, res: Response) => {
    const taskRepository = getRepository(Task);

    const tasks = await taskRepository.find({
      select: ['id', 'text', 'status'],
    });

    res.send(tasks);
  };
}

export default TaskController;
