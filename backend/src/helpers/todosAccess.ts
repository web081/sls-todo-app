import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from "aws-sdk/clients/dynamodb"
import { Types } from 'aws-sdk/clients/s3';
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

//const XAWS = AWSXRay.captureAWS(AWS)
// TODO: Implement the dataLayer logic
export class TodosAccess {
    constructor(
      private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
      private readonly todossTable = process.env.TODOS_TABLE,
      private readonly s3Client: Types = new AWS.S3({ signatureVersion: 'v4' }),
      private readonly s3BucketName = process.env.TODOS_S3_BUCKET
      ) {
      
      }
     
  async getAlltodos(userId: string): Promise<TodoItem[]> {
      console.log('Getting all todos list')    
  
    const params = {
      TableName: this.todossTable,
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames: {
          "#userId": "userId"
      },
      ExpressionAttributeValues: {
          ":userId": userId
      }
  }
    
  const result = await this.docClient.query(params).promise();
  console.log(result);
  const items = result.Items;

  return items as TodoItem[];
 }

  async createTodos(todos: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todossTable,
      Item: todos
    }).promise()

    return todos
    }

  async updateTodos(userId: string, todoId: string, todos: TodoUpdate): Promise<TodoUpdate> {
      const params = {
        TableName: this.todossTable,
        Key: {
            "userId": userId,
            "todoId": todoId
        },
        UpdateExpression: "set #a = :a, #b = :b, #c = :c",
        ExpressionAttributeNames: {
            "#a": "name",
            "#b": "dueDate",
            "#c": "done"
        },
        ExpressionAttributeValues: {
            ":a": todos['name'],
            ":b": todos['dueDate'],
            ":c": todos['done']
        },
        ReturnValues: "ALL_NEW"
    }

    const result = await this.docClient.update(params).promise();
    console.log(result);
    const attributes = result.Attributes;

    return attributes as TodoUpdate;
    }

  async generateUploadUrl(todoId: string): Promise<string> {
      console.log("Generating URL");

      const url = this.s3Client.getSignedUrl('putObject', {
          Bucket: this.s3BucketName,
          Key: todoId,
          Expires: 1000,
      })
      console.log(url);

      return url as string;
  }
  async deleteTodos(userId: String, todoId: String): Promise<string> {
      console.log("deleting todo");

        const params = {
            TableName: this.todossTable,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
        };

        const result = await this.docClient.delete(params).promise();
        console.log(result);

        return "" as string;
    }
}
  