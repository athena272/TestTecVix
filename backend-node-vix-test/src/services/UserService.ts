import { user } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { TUserCreated, userCreatedSchema } from "../types/validations/User/createUser";
import { TUserUpdated, userUpdatedSchema } from "../types/validations/User/updateUser";
import { TUserLogin, userLoginSchema } from "../types/validations/User/loginUser";
import { TUserRegister, userRegisterSchema } from "../types/validations/User/registerUser";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getById(idUser: string) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return user;
  }

  async listAll() {
    const users = await this.userModel.listAll();
    return users.map(({ password, ...u }) => u);
  }

  async login(data: unknown) {
    const validateData = userLoginSchema.parse(data);
    const user = await this.userModel.findByEmailOrUsername(
      validateData.email,
      validateData.username,
    );

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      validateData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    // Atualiza a data do último login
    await this.userModel.updateLastLoginDate(user.idUser);

    // Remove a senha do objeto antes de retornar
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async register(data: unknown) {
    const validateData = userRegisterSchema.parse(data);

    // Verifica se o email já existe
    const existingUserByEmail = await this.userModel.findByEmail(
      validateData.email,
    );
    if (existingUserByEmail) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    // Verifica se o username já existe
    const existingUserByUsername = await this.userModel.findByUsername(
      validateData.username,
    );
    if (existingUserByUsername) {
      throw new AppError(
        ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    // Cria o usuário
    const createdUser = await this.userModel.createNewUser({
      ...validateData,
      password: hashedPassword,
    });

    // Remove a senha do objeto antes de retornar
    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async createNewUser(data: unknown) {
    const validateData = userCreatedSchema.parse(data);

    // Verifica se o email já existe
    const existingUserByEmail = await this.userModel.findByEmail(
      validateData.email,
    );
    if (existingUserByEmail) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    // Verifica se o username já existe
    const existingUserByUsername = await this.userModel.findByUsername(
      validateData.username,
    );
    if (existingUserByUsername) {
      throw new AppError(
        ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    const createdUser = await this.userModel.createNewUser({
      ...validateData,
      password: hashedPassword,
    });

    // Remove a senha do objeto antes de retornar
    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async updateUser(idUser: string, data: unknown) {
    const validateDataSchema = userUpdatedSchema.parse(data);
    const oldUser = await this.getById(idUser);

    // Se está atualizando o email, verifica se já existe
    if (validateDataSchema.email && validateDataSchema.email !== oldUser.email) {
      const existingUserByEmail = await this.userModel.findByEmail(
        validateDataSchema.email,
      );
      if (existingUserByEmail) {
        throw new AppError(
          ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
          STATUS_CODE.CONFLICT,
        );
      }
    }

    // Se está atualizando o username, verifica se já existe
    if (
      validateDataSchema.username &&
      validateDataSchema.username !== oldUser.username
    ) {
      const existingUserByUsername = await this.userModel.findByUsername(
        validateDataSchema.username,
      );
      if (existingUserByUsername) {
        throw new AppError(
          ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
          STATUS_CODE.CONFLICT,
        );
      }
    }

    // Se está atualizando a senha, faz o hash
    if (validateDataSchema.password) {
      validateDataSchema.password = await bcrypt.hash(
        validateDataSchema.password,
        10,
      );
    }

    const updatedUser = await this.userModel.updateUser(idUser, validateDataSchema);

    // Remove a senha do objeto antes de retornar
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.getById(idUser);
    const deletedUser = await this.userModel.deleteUser(idUser);
    return deletedUser;
  }
}
