import { LabProjectSchema } from "../../schema/gitlab/project.schema";
import { model } from "mongoose";
import { LabProjectDocument } from "../../interface/gitlab/project.interface";


const LabProjectModel = model<LabProjectDocument>('LabProject', LabProjectSchema)

export { LabProjectModel }