import { Request, Response } from "express";

interface AppContext {
    req: AuthRequest;
    res: Response;
}

interface AuthRequest extends Request {
    user: any;
}

export { AppContext, AuthRequest }