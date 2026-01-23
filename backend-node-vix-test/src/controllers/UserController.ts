import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";
import { genToken } from "../utils/jwt";

export class UserController {
  constructor() {}
  private userService = new UserService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.getById(idUser as string);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.listAll();
    return res.status(STATUS_CODE.OK).json(result);
  }

  async login(req: CustomRequest<unknown>, res: Response) {
    const user = await this.userService.login(req.body);

    // Gera o token JWT apenas se o usuário estiver ativo
    const token = user.isActive
      ? genToken({
          idUser: user.idUser,
          email: user.email,
          role: user.role,
        })
      : null;

    return res.status(STATUS_CODE.OK).json({
      token,
      user,
    });
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    const user = await this.userService.register(req.body);

    // Gera o token JWT
    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return res.status(STATUS_CODE.CREATED).json({
      token,
      user,
    });
  }

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.createNewUser(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.updateUser(idUser as string, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.deleteUser(idUser as string);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
