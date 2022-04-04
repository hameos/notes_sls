import { Request, Response } from 'express'
import dbclientDyn from './serverless/dynamodb'

let dbclient: any = dbclientDyn
dbclient.init()

export const getNotes = function (req: Request, res: Response) {
  console.log('get /notes')

  dbclient.list().then((data: any) => {
    res.send({ data })
  })
  .catch ((err: any) => {
    res.status(400).send({ message: err.message })
  })
}

export const createNote = function (req: Request, res: Response) {
  console.log('post /notes', req.body)

  const data = req.body
  dbclient.insert({ title: data.title, content: data.content }).then((val: any) => {
    console.log('Inserted value', val)
    const resdata = {
      id: val.insertedId,
      title: val.title,
      content: val.content,
    }
    res.send({ data: resdata })
  })
  .catch ((err: any) => {
    res.status(400).send({ message: err.message })
  })
}

export const getNoteById = function (req: Request, res: Response) {
  console.log('get /notes/:noteId', req.body)

  const id = req.params.noteId
  dbclient.list({ id }).then((data: any) => {
    res.send({ data })
  })
  .catch((err: any) => {
    res.status(400).send({ message: err.message })
  })
}

export const updateNote = function (req: Request, res: Response) {
  console.log('put /notes/:noteId', req.body)

  const id = req.params.noteId
  const { title, content } = req.body
  const data = { id, title: '', content: '' }
  if (title) {
    data.title = title
  } else {
    return res.status(400).send({ message: 'field title required' })
  }

  if (content) {
    data.content = content
  } else {
    return res.status(400).send({ message: 'field content required' })
  }

  dbclient.update(data).then((data: any) => {
    res.send({ data })
  })
  .catch ((err: any) => {
    res.status(400).send({ message: err.message })
  })
}

export const patchNote = function (req: Request, res: Response) {
  console.log('patch /notes/:noteId', req.body)

  const id = req.params.noteId
  const { title, content } = req.body
  const data: any = { id }
  if (title) data.title = title
  if (content) data.content = content

  dbclient.updatePartial(data).then((data: any) => {
    res.send({ data })
  })
  .catch((err: any) => {
    res.status(400).send({ message: err.message })
  })
}

export const deleteNote = function (req: Request, res: Response) {
  console.log('delete /notes/:noteId', req.body)

  const id = req.params.noteId

  dbclient.delete({ id }).then((data: any) => {
    res.send({ data })
  })
  .catch ((err: any) => {
    res.status(400).send({ message: err.message })
  })
}
