'use strict';

import serverless from 'serverless-http'
import app from '../app'

const handlerApp = serverless(app)
export { handlerApp }
