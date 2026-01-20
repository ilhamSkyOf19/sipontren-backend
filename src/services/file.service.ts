import fs from "fs/promises";
import { ResponseMessage } from "../types/types";
import path from "path";
import fsSync from "fs";
import archiver from "archiver";

export class FileService {
  // delete
  static async deleteFile(path: string): Promise<void> {
    try {
      // cek file
      await fs.access(path);

      // cek file
      await fs.unlink(path);

      console.log("File deleted successfully");
    } catch (error) {
      // cek error
      console.log(error);
      console.warn("file not found");
    }
  }

  // delete form path
  static async deleteFormPath(
    fileName: string,
    filePath: string,
  ): Promise<ResponseMessage> {
    // cek file path
    if (!filePath || !fileName)
      return {
        success: false,
        message: "File not exist",
      };

    // path file
    const filePathFull = path.join(
      process.cwd(),
      `public/uploads/${filePath}/${fileName}`,
    );

    // delete file
    try {
      // cek file
      await fs.access(filePathFull);
      // delete file
      await fs.unlink(filePathFull);

      return {
        success: true,
        message: "File deleted successfully",
      };
    } catch (error) {
      // cek error
      console.log(error);
      return {
        success: false,
        message: "File not found or failed to delete",
      };
    }
  }

  //   get file path
  static getFilePath(folder: string, filename: string): string {
    const uploadsPath = path.resolve(__dirname, "../uploads", folder);
    return path.join(uploadsPath, filename);
  }

  //   file exists
  static fileExists(filePath: string): boolean {
    return fsSync.existsSync(filePath);
  }

  static async createZip(fileNames: string[], folder: string) {
    const archive = archiver("zip", { zlib: { level: 9 } });

    for (const fileName of fileNames) {
      const filePath = path.join(
        __dirname,
        `../../public/uploads/${folder}`,
        fileName,
      );

      // cek file exist
      if (!fsSync.existsSync(filePath)) continue; // skip file yang tidak ada

      // tambahkan file ke zip
      archive.file(filePath, { name: fileName });
    }

    archive.finalize(); // finalize zip
    return archive;
  }
}
