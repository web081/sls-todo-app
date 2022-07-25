import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodos } from '../../helpers/todos'
//import { TodoItem } from '../../models/TodoItem'

//const logger = createLogger('TodosAccess')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    
    // TODO: Implement creating a new TODO item

   //const userId: string = getUserId(event)
   const todoItem = await createTodos(newTodo, jwtToken);

   return {
       statusCode: 201,
       headers: {
           "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify({
           "item": todoItem
       }),
   }

  })

handler.use(
  cors({
    credentials: true
  })
)

