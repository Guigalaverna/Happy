import { getRepository } from "typeorm";

import * as Yup from "yup";
import User from "../models/User";

import { Request, Response } from "express";

import UserView from "../views/users_view";

import bcrypt from "bcryptjs";

export default {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return res.status(200).json(UserView.renderMany(users));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    return res.status(200).json(UserView.render(user));
  },

  async create(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User);

      const { name, email, number, password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const data = {
        name,
        email,
        number,
        password: hashedPassword,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        number: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const newUser = userRepository.create(data);

      await userRepository.save(newUser);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(501).json({ error });
    }
  },
};
