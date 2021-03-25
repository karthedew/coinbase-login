import { Request, Response } from "express";

interface AppContext {
    req: Request;
    res: Response;
    payload?: { userId: string };
}

interface AuthRequest extends Request {
    user?: any
}

export { AppContext, AuthRequest }