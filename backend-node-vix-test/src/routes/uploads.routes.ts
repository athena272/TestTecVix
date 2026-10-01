import { Router } from "express";
import multer from "multer";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { BucketController } from "../controllers/BucketController";
import { BucketLocalService } from "../services/BucketLocalService";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.UPLOADS; // /api/v1/uploads

const uploadsRoutes = Router();

// Configurar multer com memoryStorage para manter o arquivo em buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const makeBucketController = () => {
  const service = new BucketLocalService();
  return new BucketController(service);
};

const uploadsController = makeBucketController();

// Rota GET para buscar arquivo pelo objectName
uploadsRoutes.get(`${BASE_PATH}/:objectName`, async (req, res) => {
  await uploadsController.getFileInBucketByObjectName(req, res);
});

// Rota POST para upload de arquivo
uploadsRoutes.post(
  `${BASE_PATH}/file`,
  upload.single("file"),
  async (req, res) => {
    await uploadsController.uploadFile(req, res);
  }
);

export { uploadsRoutes };
