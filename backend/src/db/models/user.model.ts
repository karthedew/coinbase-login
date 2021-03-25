import { UserSchema } from "../schema/user.schema";
import { model, Document, Model } from "mongoose";
import { UserDocument } from "../interface/user.interface";

const UserModel = model<UserDocument>('User', UserSchema)

export { UserModel }