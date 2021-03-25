import { Ctx, Query, Resolver, Mutation, Arg, Int, InputType, Field, Authorized, ID } from "type-graphql";
// import { User } from "../entity/user.entity";
// import { User } from "../graphql/typeDefs/user.type";
import { UserModel } from "../../db/models/user.model";
// import { User as gqlUser } from "../entity/user.entity";
import { User } from "../typeDefs/user.type";
import { Context } from "vm";
import { AppContext, AuthRequest } from "../../db/interface/context.interface";

@Resolver()
class UserResolver {

// -----------------------------------------------------------------------
//                        =======================
//                        --- QUERY FUNCTIONS ---
//                        =======================
// -----------------------------------------------------------------------
       
    @Query(() => String)
    async userHello(
        @Ctx() res: AuthRequest
    ) {
        console.log('This is the userHello req.user: ', res.user)
        // Code to get data from db/other source
        return "hi!";
    }

// -----------------------------------------------------------------------
//                      ==========================
//                      --- MUTATION FUNCTIONS ---
//                      ==========================
// -----------------------------------------------------------------------

    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string
    ) {
        let user = new User({
            name
        })
        user.save()
        return user
    }
}


export { UserResolver }
