import { ObjectId } from 'mongodb'
import { Request, Response, RequestHandler as Middleware } from 'express'

type Handler = (req: Request, res: Response) => any

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Route = {
  method: Method
  path: string
  middleware: Middleware[]
  handler: Handler
}

export interface NotesConfig {
  IP: string
  PORT: string
  S3: string
  DB: string
  TABLE: string
}

export interface InputNote {
  id?: string
  title?: string
  content?: string
}

export interface Note {
  _id: ObjectId
  title: string
  content: string
}

export type IdxObj = { [x: string]: any }
