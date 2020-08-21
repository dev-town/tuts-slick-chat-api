import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { UserInputError } from 'apollo-server';

import { AuthUser } from '../../auth-type';
import * as GQL from '../../types/graphql';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export interface IDBChannel {
    pk: string;
    sk: string;
    name: string;
    createdAt: string;
}

export interface IDBFavorites {
    pk: string;
    sk: string;
    favorites: string[];
}

export class Channel {

    transformDBChannel(channel: IDBChannel, favorites: string[]): GQL.IChannel {
        return {
            id: channel.sk,
            name: channel.name,
            isFavorite: (favorites.includes(channel.sk)),
        }
    }

    async getUserFavorites(user: AuthUser): Promise<string[]> {
        try {
            const results = await dynamoDB.get({
                TableName: process.env.CHANNELS_TABLE_NAME,
                Key: { pk: user.id, sk: 'favorites' },
            }).promise();
            const item = results.Item as IDBFavorites;
            console.log('get favs -> results', results);
            return item.favorites || [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getChannels(user: AuthUser): Promise<GQL.IChannel[]> {
        const favorites = await this.getUserFavorites(user);

        try {
            const params = {
                TableName: process.env.CHANNELS_TABLE_NAME,
                KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
                ExpressionAttributeValues: {
                    ":pk": "channel",
                    ":sk": "channel_"
                },
            };
    
            const results = await dynamoDB.query(params).promise();
            const items = results.Items as IDBChannel[];
            return items.map((item) => this.transformDBChannel(item, favorites));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getChannelById(user: AuthUser, id: String): Promise<GQL.IChannel | null> {
        const favorites = await this.getUserFavorites(user);

        try {
            const results = await dynamoDB.get({
                TableName: process.env.CHANNELS_TABLE_NAME,
                Key: { pk: 'channel', sk: id },
            }).promise();
            const item = results.Item as IDBChannel;
            return this.transformDBChannel(item, favorites);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createChannel(user: AuthUser, params: GQL.ICreateChannelInput): Promise<GQL.IChannel> {
        const createdAt = new Date();
        // Strip odd characters the name as we can use this for sorting
        const strippedName = params.name.replace(/[^A-Za-z0-9?]/g,'');

        const channels = await this.getChannels(user);
        const isDuplicate = channels.some(item => item.name === params.name);
        if (isDuplicate) {
            throw new UserInputError('Duplicate record', {
                invalidArgs: ['name'],
            });
        }

        const newChannel: IDBChannel = {
            pk: 'channel',
            sk: `channel_${strippedName}_${uuid()}`,
            name: params.name,
            createdAt: createdAt.toISOString(),
        }

        try {
            await dynamoDB
                .put({
                    TableName: process.env.CHANNELS_TABLE_NAME,
                    Item: newChannel,
                })
                .promise();
            return this.transformDBChannel(newChannel, []);

          } catch (error) {
            console.log(error);
            return null;
          }
    }

    async addToFavorite(user: AuthUser, params: GQL.IFavoriteChannelInput): Promise<GQL.IChannel> {
        const favorites = new Set(await this.getUserFavorites(user));
        const channel = await this.getChannelById(user, params.id);

        if (params.isFavorite) {
            favorites.add(params.id);
        } else {
            favorites.delete(params.id);
        }

        const updateParams = {
            TableName: process.env.CHANNELS_TABLE_NAME,
            Key: { pk: user.id, sk: 'favorites' },
            UpdateExpression: 'set favorites = :favorites',
            ExpressionAttributeValues: {
                ':favorites': [...favorites],
            },
            ReturnValues: 'ALL_NEW',
        }
        try {
            await dynamoDB.update(updateParams).promise();

            return { ...channel, isFavorite: params.isFavorite };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export const channel = new Channel();
