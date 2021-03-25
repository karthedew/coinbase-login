import { Field, ObjectType, ID } from "type-graphql";
import { LabProjectModel } from "../../../db/models/gitlab/project.model";


@ObjectType({ description: "GitLab project information."})
class LabProjet extends LabProjectModel {

    @Field(type => ID)
    id: string;

    @Field(() => String)
    projectName: string;
}

export { LabProjet }