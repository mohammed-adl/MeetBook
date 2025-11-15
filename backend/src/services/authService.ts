import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/index.js";
import { prisma, userSelect } from "../lib/index.js";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_MAX_AGE,
} from "../config/constants.js";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  username: string;
  role: any;
  hourlyRate: number | null;
}

interface JWTPayload {
  id: string;
  [key: string]: any;
}

const authService = {
  // ==============================================
  // User CREATION
  // ==============================================
  async createUser(data: CreateUserData) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      select: {
        email: true,
        username: true,
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new AppError("Email already registered", 400);
      }
      if (existingUser.username === data.username) {
        throw new AppError("Username already taken", 400);
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.$transaction(async (prismaTx) => {
      const newUser = await prismaTx.user.create({
        data: {
          email: data.email,
          name: data.name,
          username: data.username,
          password: hashedPassword,
          role: data.role,
          hourlyRate: data.role === "PROVIDER" ? Number(data.hourlyRate) : null,
        },
        select: userSelect,
      });

      return newUser;
    });

    return user;
  },

  // ==============================================
  // AUTHENTICATION
  // ==============================================
  async logIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { ...userSelect, password: true },
    });

    if (!user) {
      throw new AppError("Incorrect username or password", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError("Incorrect username or password", 400);
    }
    delete (user as any).password;
    return user;
  },

  async logOut(userId: string, refreshToken: string): Promise<void> {
    const tokens = await prisma.refreshToken.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (tokens.length === 0) {
      throw new AppError("No refresh token found", 400);
    }

    let validToken: (typeof tokens)[0] | null = null;
    for (const token of tokens) {
      const isValid = await bcrypt.compare(refreshToken, token.token);
      if (isValid) {
        validToken = token;
        break;
      }
    }

    if (!validToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    await prisma.refreshToken.delete({
      where: { id: validToken.id },
    });
  },

  // ==============================================
  // TOKEN HELPERS
  // ==============================================
  async saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<string> {
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    const token = await prisma.refreshToken.create({
      data: {
        userId,
        token: hashedToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE),
      },
      select: { id: true },
    });

    return token.id;
  },

  async verifyRefreshToken(token: string): Promise<JWTPayload> {
    try {
      const payload = jwt.verify(token, REFRESH_SECRET) as JWTPayload;

      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          userId: payload.id,
          expiresAt: { gt: new Date() },
        },
      });

      if (!storedToken) {
        throw new AppError("Refresh token not found", 401);
      }

      const isValidToken = await bcrypt.compare(token, storedToken.token);
      if (!isValidToken) {
        throw new AppError("Invalid refresh token", 401);
      }

      return payload;
    } catch (err) {
      throw new AppError("Invalid refresh token", 401);
    }
  },

  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: `${ACCESS_TOKEN_EXPIRY}`,
    });
  },

  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: `${REFRESH_TOKEN_EXPIRY}`,
    });
  },
};

export default authService;
