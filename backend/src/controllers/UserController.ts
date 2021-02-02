import { getRepository } from "typeorm";

import * as Yup from "yup";
import User from "../models/User";

import { Request, Response } from "express";

import UserView from "../views/users_view";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import authConfig from "../config/auth.json";

interface UserProps {
  id: number;
  name: string;
  password: string;
}

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

      const token = jwt.sign({ id: newUser.id }, authConfig.secret, {
        expiresIn: 86400,
      });

      return res.status(201).json(UserView.renderWithToken(newUser, token));
    } catch (error) {
      return res.status(501).json({ error });
    }
  },

  async delete(req: Request, res: Response) {
    const userRepository = getRepository(User);

    try {
      const { id } = req.params;

      userRepository.delete(id);
    } catch {}
  },

  async login(req: Request, res: Response) {
    const userRepository = getRepository(User);

    try {
      /*
        Pegar dados da request
        Verficar se os dados não estão vazios
        Verificar de a senha está correta
        Gerar JWT e retornar
      */

      const { password, email } = req.body;

      const data = {
        email,
        password,
      };

      const user = await userRepository
        .createQueryBuilder("user")
        .where("email=:email", { email })
        .getOne();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Validar dados

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      schema.validate(data, {
        abortEarly: false,
      });

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 86400,
        });

        return res.status(200).json(UserView.renderWithToken(user, token));
      }

      return res.status(401).json({ error: "Unauthorized" });
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
};
