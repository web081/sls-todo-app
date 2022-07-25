import { JwtPayload } from './JwtPayload'
import { JwtHeader } from 'jsonwebtoken'

/**
 * Interface repreimport fetch from "node-fetch";senting a JWT token
 */
export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}
