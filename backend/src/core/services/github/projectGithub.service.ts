import { GitHubRepoLanguage } from "../../../graphql/typeDefs/github/projects/language.type";

class ProjectGitHub {

    // --- Class Variables ---
    projectName: string;
    languages: GitHubRepoLanguage[] = [];

    // --- PUBLIC METHODS ---
    /*
    *
    * This method parses languages and adds them to the class.
    *
    * PARAMETERS
    * ----------
    * languages: json object
    *       - this parameter is an object where the languages are keys and the
    *         usage are the values.
    * 
    */
    addLanguages(languages: { [x: string]: number; }): GitHubRepoLanguage[] {
        for (var key in languages) {

            let d = new GitHubRepoLanguage;
            d.language = key;
            d.amount = languages[key];

            this.languages.push(d);

        }

        return this.languages
    }


    /*
    *
    * checkLanguage() method verifies whether a language already exists or not.
    *
    * PARAMETERS
    * ----------
    * language: string
    *       - the language to check
    * 
    */
    checkLanguage(language: any): boolean {

        var isLanguage = false;

        this.languages.forEach((item) => {
            if(language.toLowerCase() == item.language.toLowerCase()) {
                isLanguage = true;
                return true
            }
        })
        
        if (isLanguage) {
            return true
        } else {
            return false
        }
    }

    // fetchLanguages() {

    // }

    // --- PRIVATE METHODS ---

}

export { ProjectGitHub }