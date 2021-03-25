import { Arg, Mutation, Resolver } from "type-graphql";
import { getUser } from "../../core/services/user.auth";
import { User } from "../typeDefs/user.type";


@Resolver()
class LoginResolver {

    @Mutation(() => Boolean)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string
    ) {
        // const user = User.findOne({})

        const user = getUser(username);
    }
}