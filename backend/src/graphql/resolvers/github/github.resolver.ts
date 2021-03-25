import { Arg, Query, Resolver } from "type-graphql";
import fetch from "node-fetch";
import { GitHubProjects } from "../../typeDefs/github/githubprojects.type";
import { GitHubRepoLanguage } from "../../typeDefs/github/projects/language.type";
import { ProjectGitHub } from "../../../core/services/github/projectGithub.service";
// import GitHub from "github-api";
// import { LabProjet } from "../../typeDefs/github/projects.type";


/*
    class - github Searh 

    This class does the querying for global search across the github network.

    Queries:

        1] Programming Languages
        2] Number of commits in the last XX Days.
        3] 

*/
@Resolver()
class GitHubResolver {

    //  =======================
    //  --- QUERY FUNCTIONS ---
    //  =======================
    @Query(() => GitHubProjects)
    async githubUserReposSearch(
        @Arg("username") username: string
    ) {

        // --- LOCAL VARIABLES ---
        var uri = `https://api.github.com/users/${username}/repos`;  // The location of the fetch
        var projectGithub = new ProjectGitHub;                       // The GitHub Project Class/Object
        

        // --- RETURN DATA ---
        var projects   = new GitHubProjects;                      // The full GraphQL Repo Data Structure

        // Initialize Data
        projects.languages = [];

        // Fetch Data
        const data = await (await fetch(uri)).json();

        var counter = 1;

        let one = data[0];

        const languages = await (await fetch(data[0]['languages_url'])).json();

        projectGithub.addLanguages(languages);

        for (var key in languages) {
            console.log('The next key is: ', key);
            console.log('The next value: ', languages[key]);

            let d = new GitHubRepoLanguage;
            d.amount = languages[key];
            d.language = key

            projects.languages.push(d);

        }
        // data.forEach((element: any) => {
        //     counter = counter + 1;
        //     console.log(`Element #${counter}`)
        //     console.log(element)
        // });

        console.log('The final result: ', projects);

        return projects
    }


    @Query(() => String)
    async githubProjectSearch(users:string) {
        return "true"
    }

    @Query(() => Boolean)
    async githubMergeRequests(mergeRequests:number) {
        return true
    }

    @Query(() => Boolean)
    async githubCommits(commits:number) {
        return true
    }

    @Query(() => Boolean)
    async githubGroup(group:string) {
        return true
    }

}

export { GitHubResolver }