import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { updateTodos } from '../../helpers/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const todoId = event.pathParameters.todoId
    const updatedTodos: UpdateTodoRequest = JSON.parse(event.body)
    
    const update = await updateTodos(updatedTodos, todoId, jwtToken)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
        "item": update
    }),
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
