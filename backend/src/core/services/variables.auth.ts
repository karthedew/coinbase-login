import { MiddlewareFn } from "type-graphql";
import { AppContext, AuthRequest } from "../../db/interface/context.interface";
import { verify } from "jsonwebtoken";

const isAuthorized: MiddlewareFn<AppContext> = ({context}, next) => {

    const authorization = context.req.headers["authorization"];

    const usr = context.user;

    if (!authorization) {
      throw new Error("not authenticated");
    }

    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    //   context.payload = payload as any;
    } catch (err) {
      console.log(err);
      throw new Error("not authenticated");
    }

    return next();
}