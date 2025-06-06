import express, { Request, Response } from "express";
import { authenticate, requireRole } from "../middlewares/auth.middleware";
import { PrismaClient, Role, User } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

// GET /api/users/me
router.get(
  "/me",
  authenticate,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/users/:id/promote
router.post(
  "/:id/promote",
  authenticate,
  requireRole(["SUPER_ADMIN"]),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const targetUser = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!targetUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (targetUser.role === "ADMIN") {
        res.status(400).json({ message: "Already ADMIN" });
        return;
      }

      const updated = await prisma.user.update({
        where: { id: req.params.id },
        data: { role: "ADMIN" },
      });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/users/:id/demote
router.post(
  "/:id/demote",
  authenticate,
  requireRole(["SUPER_ADMIN"]),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const targetUser = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!targetUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (targetUser.role === "SUPER_ADMIN") {
        res.status(400).json({ message: "Cannot demote SUPER_ADMIN" });
        return;
      }

      const updated = await prisma.user.update({
        where: { id: req.params.id },
        data: { role: "USER" },
      });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET /api/users/:id
router.get(
  "/:id",
  authenticate,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const requester = req.user;
      const targetId = req.params.id;
      const targetUser = await prisma.user.findUnique({
        where: { id: targetId },
      });

      if (!targetUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (requester.role === "USER" && requester.id !== targetId) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      if (requester.role === "ADMIN" && targetUser.role !== "USER") {
        res.status(403).json({ message: "Admins can only view USERs" });
        return;
      }

      res.json(targetUser);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
