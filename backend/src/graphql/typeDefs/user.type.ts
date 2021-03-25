import { Field, ID, ObjectType } from "type-graphql";
import { UserModel }     from "../../db/models/user.model";

@ObjectType({ description: "User for GitCrypto"})
class User extends UserModel {
    @Field(type => ID)
    id: string

    @Field()
    name: string;

    // -------------------------------
    // --- COINBASE AUTHENTICATION ---
    // -------------------------------
    @Field(() => String)
    uidCoinbase: string;

    @Field(() => String)
    accessTokenCoinbase: string;

    @Field(() => String)
    refreshTokenCoinbase: string;

    // ------------------------------
    // --- BASIC USER INFORMATION ---
    // ------------------------------
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    tokenVersion: number;

    // ----------------------------------
    // --- AUTHENTICATION INFORMATION ---
    // ----------------------------------
    @Field(() => [String])
    // @Column({
    //     default: ['user']
    // })
    roles: string[];

    @Field(() => [String])
    // @Column({
    //     default: ['read:own_account']
    // })
    permissions: string[]

}

export { User }