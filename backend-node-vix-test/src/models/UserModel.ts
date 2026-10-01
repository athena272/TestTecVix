import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";
import { user } from "@prisma/client";

export class UserModel {
  async getById(idUser: string) {
    return await prisma.user.findUnique({
      where: { idUser },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });
  }

  async findByUsername(username: string) {
    return await prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });
  }

  async findByEmailOrUsername(email?: string, username?: string) {
    if (email) {
      return await this.findByEmail(email);
    }
    if (username) {
      return await this.findByUsername(username);
    }
    return null;
  }

  async listAll() {
    return await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createNewUser(data: TUserCreated) {
    return await prisma.user.create({
      data: { ...data },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }

  async updateLastLoginDate(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { lastLoginDate: new Date() },
    });
  }
}
