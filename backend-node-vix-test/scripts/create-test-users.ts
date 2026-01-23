import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    const hashedPassword = await bcrypt.hash("Test@123", 10);

    // Função auxiliar para criar ou atualizar usuário
    const createOrUpdateUser = async (userData: {
      username: string;
      email: string;
      password: string;
      role: "admin" | "manager" | "member";
      isActive: boolean;
    }) => {
      const existingUser = await prisma.user.findFirst({
        where: { email: userData.email },
      });

      if (existingUser) {
        return await prisma.user.update({
          where: { idUser: existingUser.idUser },
          data: {
            password: userData.password,
            role: userData.role,
            isActive: userData.isActive,
            username: userData.username,
          },
        });
      } else {
        return await prisma.user.create({
          data: userData,
        });
      }
    };

    // Criar ou atualizar usuário Admin
    const admin = await createOrUpdateUser({
      username: "admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    // Criar ou atualizar usuário Manager
    const manager = await createOrUpdateUser({
      username: "manager",
      email: "manager@test.com",
      password: hashedPassword,
      role: "manager",
      isActive: true,
    });

    // Criar ou atualizar usuário Member
    const member = await createOrUpdateUser({
      username: "member",
      email: "member@test.com",
      password: hashedPassword,
      role: "member",
      isActive: true,
    });

    console.log("✅ Usuários de teste criados com sucesso!");
    console.log("\n📋 Credenciais de teste:");
    console.log("\n👤 Admin:");
    console.log("   Email: admin@test.com");
    console.log("   Senha: Test@123");
    console.log("\n👤 Manager:");
    console.log("   Email: manager@test.com");
    console.log("   Senha: Test@123");
    console.log("\n👤 Member:");
    console.log("   Email: member@test.com");
    console.log("   Senha: Test@123");
  } catch (error) {
    console.error("❌ Erro ao criar usuários de teste:", error);
    throw error;
  }
}

createTestUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
