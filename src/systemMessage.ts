import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

import { IDBChannel } from './modules/channel/repo';
import { IDBMessage } from './modules/messages/repo';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async function systemMessage(event, context) {
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
        
        const promises = items.map(channel => {
            const createdAt = new Date().toISOString();
            const newMessage: IDBMessage = {
                pk: channel.sk,
                sk: `message_${createdAt}_${uuid()}`,
                type: 'SYSTEM_MESSAGE',
                title: 'System updated',
                message: 'The system has been updated',
                createdAt,
            };

            return dynamoDB
                .put({
                    TableName: process.env.CHANNELS_TABLE_NAME,
                    Item: newMessage,
                })
                .promise();
        });

        await Promise.all(promises);
        return { status: 'ok' };
    } catch (error) {
        console.log(error);
        return { status: 'error' };
    }
}
