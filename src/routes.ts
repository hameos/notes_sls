import { createNote, deleteNote, getNoteById, getNotes, patchNote, updateNote } from './handlers'
import { Route } from './declarations'

export const routes: Route[] = [
  {
    method: 'get',
    path: '/notes',
    middleware: [],
    handler: getNotes,
  },
  {
    method: 'post',
    path: '/notes',
    middleware: [],
    handler: createNote,
  },
  {
    method: 'get',
    path: '/notes/:noteId',
    middleware: [],
    handler: getNoteById,
  },
  {
    method: 'put',
    path: '/notes/:noteId',
    middleware: [],
    handler: updateNote,
  },
  {
    method: 'patch',
    path: '/notes/:noteId',
    middleware: [],
    handler: patchNote,
  },
  {
    method: 'delete',
    path: '/notes/:noteId',
    middleware: [],
    handler: deleteNote,
  },
]
