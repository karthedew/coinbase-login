import { Schema } from "mongoose";

const LabProjectSchema = new Schema({
    name: {
        type: String,
        index: true
    }
})

export { LabProjectSchema }