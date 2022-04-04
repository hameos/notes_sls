import 'dotenv/config'

export const IP = process.env.IP as string
export const PORT = process.env.PORT as string

export const DB_DYNAMO = process.env.DB_DYNAMO as string
export const DB_DYNAMO_OFFLINE = process.env.DB_DYNAMO_OFFLINE as string

export const COLLECTION = process.env.TABLE as string
export const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION as string
