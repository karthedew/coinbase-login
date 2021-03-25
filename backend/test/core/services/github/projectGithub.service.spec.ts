import "reflect-metadata";
import { expect } from "chai";
import { ProjectGitHub } from "../../../../src/core/services/github/projectGithub.service";
import { GitHubRepoLanguage } from "../../../../src/graphql/typeDefs/github/projects/language.type";

describe("Languages", function() {
    it('checkLanguage', function() {

        // --- SETUP ---
        let projectClass = new ProjectGitHub;
        let languages = {
            Typescript: 280,
            Python: 500
        }

        projectClass.addLanguages(languages);

        // --- TEST CASES ---
        expect(true).equal(projectClass.checkLanguage('Typescript'))
        expect(true).equal(projectClass.checkLanguage('typescript'))
        expect(false).equal(projectClass.checkLanguage('Java'))
        expect(false).equal(projectClass.checkLanguage('java'))
    })

    it('addLanguage', function() {
        
        // --- SETUP ---
        let projectClass = new ProjectGitHub;
        let languages = {
            Typescript: 280,
            Python: 500
        }

        projectClass.addLanguages(languages);

        var one = new GitHubRepoLanguage();
        one.language = 'Typescript';
        one.amount = 280;

        var two = new GitHubRepoLanguage();
        two.language = 'Python';
        two.amount = 500;

        // --- ANSWER ---
        let addLang1 = [new GitHubRepoLanguage, new GitHubRepoLanguage]
        let addLang2 = [new GitHubRepoLanguage]

        addLang1[0] = one;
        addLang1[1] = two;
        addLang2[0] = one;

        expect(addLang1).to.deep.equal(projectClass.languages)
        expect(addLang2).to.not.equal(projectClass.languages)

    })
})