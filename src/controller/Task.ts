import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Task from '../entity/Task';
import User from '../entity/User';

class TaskController {
  static getCurrentUser = async (res: Response) => {
    const { id } = res.locals.jwtPayload;
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(id);
    return user;
  };

  static newTask = async (req: Request, res: Response) => {
    const { text } = req.body;
    const user = await TaskController.getCurrentUser(res);

    const task = new Task();
    task.text = text;
    task.user = user;

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
    const dataForUpdate = req.body;

    const taskRepository = getRepository(Task);

    let task;
    try {
      task = await taskRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Task not found');
      return;
    }

    Object.assign(task, dataForUpdate);

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
    const user = await TaskController.getCurrentUser(res);

    const taskRepository = getRepository(Task);

    try {
      await taskRepository.findOneOrFail(id, {
        where: {
          user,
        },
      });
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
    const user = TaskController.getCurrentUser(res);

    try {
      const task = await taskRepository.findOneOrFail(id, {
        select: ['id', 'text', 'status'],
        where: {
          user,
        },
      });

      res.send(task);
    } catch (e) {
      res.status(404).send('Task not found');
    }
  };

  static getAll = async (req: Request, res: Response) => {
    const taskRepository = getRepository(Task);
    const user = TaskController.getCurrentUser(res);

    const tasks = await taskRepository.find({
      select: ['id', 'text', 'status'],
      where: {
        user,
      },
    });

    res.send(tasks);
  };
}

export default TaskController;
