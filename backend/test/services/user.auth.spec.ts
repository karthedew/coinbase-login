import { createUser } from "../../src/services/user.auth";
import { expect } from "chai";

describe('create a user', () => {
    

    it('should create a new user if no user exists', () => {
        let uid = 'coinbase:12352545'
        let username = 'johnsnow'

        const user = createUser(uid, username);

        console.log(user)
        

    })
})