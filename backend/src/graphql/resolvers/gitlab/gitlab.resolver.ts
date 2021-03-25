import { Ctx, Query, Resolver, Mutation, Arg, Int, InputType, Field, Authorized, ID } from "type-graphql";
import {  } from "graphql";
import { request } from "graphql-request";
import fetch from "node-fetch";
import { LabProjet } from "../../typeDefs/gitlab/projects.type";


const query = `
    query {
        project(fullPath: "karthedew/flightstatus") {
            name
        }
    }
`;

const userProjects = `
    query {
      projects(membership: true) {
        nodes {
          name
        }
      }
    }
`

const gitlab_url = "https://gitlab.com/api/graphql";

// const auth = `Bearer ${}`

const opts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query })
};

@Resolver()
class GitLabResolver {

// -----------------------------------------------------------------------
//                        =======================
//                        --- QUERY FUNCTIONS ---
//                        =======================
// -----------------------------------------------------------------------
       @Query(() => LabProjet)
       async gitlabProject(path: string) {

            const data = await request(gitlab_url, query)

            let labProject = new LabProjet({
                projectName: data.project.name
            });
            labProject.projectName = data.project.name;

            return labProject
       }
    

// -----------------------------------------------------------------------
//                      ==========================
//                      --- MUTATION FUNCTIONS ---
//                      ==========================
// -----------------------------------------------------------------------

    
}


export { GitLabResolver }
