import { User } from "../../graphql/typeDefs/user.type";


async function LoginUser(username:string, token:string) {
    const user =  await User.findOne({where: { username }})

    return user
}

export { LoginUser }