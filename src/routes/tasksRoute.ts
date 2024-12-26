import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get Request
router.get("/tasks", async (_req: Request, _res: Response) => {
  try {
    const allTask = await prisma.task.findMany();
    _res.send(allTask);
    await prisma.$disconnect();
  } catch (error: any) {
    _res.status(500).json({
      message: "Failed to find Task",
      error: error.message,
    });
    await prisma.$disconnect();
  }
});

router.get("/tasks/:id", async (_req: Request, _res: Response) => {
  const id = _req.params.id;
  try {
    const taskById = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    _res.send(taskById);
  } catch (error: any) {
    _res.status(500).json({
      message: "Failed to find Task",
      error: error.message,
    });
    await prisma.$disconnect();
  }
});

// Post Request
router.post("/tasks", async (_req: Request, _res: Response) => {
  const body = _req.body;
  try {
    const createdTask = await prisma.task.create({
      data: body,
    });
    _res.send(createdTask);
    await prisma.$disconnect();
  } catch (error: any) {
    _res.status(500).json({
      message: "Failed to Create Task",
      error: error.message,
    });
    await prisma.$disconnect();
  }
});

// Put Request
router.put("/tasks/:id", async (_req: Request, _res: Response) => {
  const id = parseInt(_req.params.id);
  const data = _req.body;
  console.log(data);
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data,
    });
    _res.send(updatedTask);
    await prisma.$disconnect();
  } catch (error: any) {
    _res.status(500).json({
      message: "Failed to Update Task",
      error: error.message,
    });
    await prisma.$disconnect();
  }
});

// Delete Request
router.delete("/tasks/:id", async (_req: Request, _res: Response) => {
  const id = parseInt(_req.params.id);
  console.log(id);
  try {
    const deletedTask = await prisma.task.delete({ where: { id: id } });
    _res.send(deletedTask);
    await prisma.$disconnect();
  } catch (error: any) {
    _res.status(500).json({
      message: "Failed to delete Task",
      error: error.message,
    });
    await prisma.$disconnect();
  }
});

export default router;
