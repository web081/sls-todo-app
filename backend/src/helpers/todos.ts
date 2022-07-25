import { TodosAccess } from './todosAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'
import { parseUserId } from '../auth/utils'
import { TodoUpdate } from '../models/TodoUpdate'




const todosAccess = new TodosAccess()

export async function getAlltodos(jwtToken:string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return await todosAccess.getAlltodos(userId)
}

export async function createTodos(
  createTodosRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const userId = parseUserId(jwtToken)
  const itemId = uuid.v4()
  const s3BucketName = process.env.TODOS_S3_BUCKET

  return await todosAccess.createTodos({
    createdAt: new Date().toISOString(),
    todoId: itemId,
    userId: userId,
    attachmentUrl: `https://${s3BucketName}.s3.amozonaws.com/$(todoId)`,
    done: false,
    ...createTodosRequest,
  })
}
export async function updateTodos (updatedTodo: UpdateTodoRequest, jwtToken: string, todoId: string): Promise<TodoUpdate> {
  const userId = parseUserId(jwtToken)
  return todosAccess.updateTodos(userId, todoId, updatedTodo)
}
export async function deleteTodos(jwtToken: string, todoId: String): Promise<string> {
const userId = parseUserId(jwtToken)
return todosAccess.deleteTodos(userId, todoId)
}

export async function generateUploadUrl(todoId: string): Promise<string> {
return todosAccess.generateUploadUrl(todoId);
}

