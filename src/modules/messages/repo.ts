import AWS from 'aws-sdk';

import { AuthUser } from '../../auth-type';
import * as GQL from '../../types/graphql';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export interface IMessage {
    id: string;
    user: {
        id: string;
        screenName: string;
        avatar: string;
    }
    message: string;
    createdAt: string;
};


export interface IDBMessage {
    pk: string;
    sk: string;
    type: 'SYSTEM_MESSAGE' | 'TEXT_MESSAGE',
    title?: string;
    message: string;
    createdAt: string;
    user?: {
        id: string;
        nickname: string;
        avatar: string;
    }
}

export class Message {
    transformDBMessage(message: IDBMessage): GQL.IResolversTypes['Message'] {
        return {
            id: message.sk,
            type: message.type,
            title: message.title,
            message: message.message,
            createdAt: message.createdAt,
            user: message.user,
        };
    }

    async getMessages(user: AuthUser, channelId: string): Promise<GQL.IResolversTypes['Message'][]> {
        try {
            const params = {
                TableName: process.env.CHANNELS_TABLE_NAME,
                KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
                ExpressionAttributeValues: {
                    ":pk": channelId,
                    ":sk": "message_"
                },
                Limit: 100,
                ScanIndexForward: false,
            };

            const results = await dynamoDB.query(params).promise();
            const items = results.Items as IDBMessage[];

            return items.map(this.transformDBMessage);

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addMessage(user: AuthUser, channelId: string, message: string): Promise<GQL.IResolversTypes['Message']> {
        const createdAt = new Date().toISOString();
        const newMessage: IDBMessage = {
            pk: channelId,
            sk: `message_${createdAt}`,
            type: 'TEXT_MESSAGE',
            user: {
                id: user.id,
                nickname: user.nickname || '',
                avatar: user.avatar || '',
            },
            message,
            createdAt,
        };

        try {
            const checkChannel = await dynamoDB.get({
                TableName: process.env.CHANNELS_TABLE_NAME,
                Key: { pk: 'channel', sk: channelId },
            }).promise();

            if (checkChannel.Item) {
                await dynamoDB
                    .put({
                        TableName: process.env.CHANNELS_TABLE_NAME,
                        Item: newMessage,
                    })
                    .promise();
                return this.transformDBMessage(newMessage);
            }
            return null;

          } catch (error) {
            console.log(error);
            return null;
          }
    }
}

export const message = new Message();
