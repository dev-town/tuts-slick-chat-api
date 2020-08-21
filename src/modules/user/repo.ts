import { AuthUser } from '../../auth-type';
import * as GQL from '../../types/graphql';

export class User {
    async getCurrentUser(user: AuthUser): Promise<GQL.IUser> {
        return {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        };
    }
}

export const user = new User();
