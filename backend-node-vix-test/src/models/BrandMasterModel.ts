import { prisma } from "../database/client";
import { TBrandMaster } from "../types/validations/BrandMaster/createBrandMaster";
import { TQuery } from "../types/validations/Queries/queryListAll";
import moment from "moment";

export class BrandMasterModel {
  async getSelf(domain: string) {
    return prisma.brandMaster.findFirst({
      where: {
        domain: {
          contains: domain,
        },
        deletedAt: null,
      },
      select: {
        idBrandMaster: true,
        brandName: true,
        brandLogo: true,
        domain: true,
        setorName: true,
        fieldName: true,
        location: true,
        city: true,
        emailContact: true,
        smsContact: true,
        timezone: true,
        manual: true,
        termsOfUse: true,
        privacyPolicy: true,
        allowLogoChange: true,
        allowEditContactInfo: true,
        allowEditPassword: true,
        allowEditProfileImage: true,
      },
    });
  }

  async getById(idBrandMaster: number) {
    return prisma.brandMaster.findUnique({
      where: { idBrandMaster },
    });
  }

  async totalCount(query: TQuery, isIncludeDeleted?: boolean) {
    const where: {
      deletedAt?: null;
      isPoc?: boolean | undefined;
      brandName?: { contains: string };
    } = {};
    
    if (!isIncludeDeleted) {
      where.deletedAt = null;
    }
    
    if (query.isPoc !== undefined) {
      where.isPoc = query.isPoc;
    }
    
    if (query.search) {
      where.brandName = { contains: query.search };
    }
    
    return prisma.brandMaster.count({ where });
  }

  async listAll(query: TQuery, isIncludeDeleted?: boolean) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const where: {
      deletedAt?: null;
      isPoc?: boolean | undefined;
      brandName?: { contains: string };
    } = {};
    
    if (!isIncludeDeleted) {
      where.deletedAt = null;
    }
    
    if (query.isPoc !== undefined) {
      where.isPoc = query.isPoc;
    }
    
    if (query.search) {
      where.brandName = { contains: query.search };
    }

    const brands = await prisma.brandMaster.findMany({
      where,
      take: limit || undefined,
      skip,
      ...(orderBy.length ? { orderBy } : { orderBy: [{ updatedAt: "desc" }] }),
    });

    const totalCount = await this.totalCount(query, isIncludeDeleted);
    return { totalCount, result: brands };
  }

  async createNewBrandMaster(data: TBrandMaster) {
    return prisma.brandMaster.create({ data });
  }

  async updateBrandMaster(idBrandMaster: number, data: TBrandMaster) {
    return prisma.brandMaster.update({
      where: { idBrandMaster },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteBrandMaster(idBrandMaster: number) {
    return prisma.brandMaster.update({
      where: { idBrandMaster },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
