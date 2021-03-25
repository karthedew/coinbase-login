import { Document } from "mongoose";

interface LabProjectDocument extends Document {
    name?: string
}

export { LabProjectDocument }