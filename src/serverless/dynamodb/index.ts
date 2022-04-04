import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'
import { COLLECTION, AWS_DEFAULT_REGION, DB_DYNAMO, DB_DYNAMO_OFFLINE } from '../../config'
import { IdxObj, InputNote } from '../../declarations'
import { UpdateItemInput } from 'aws-sdk/clients/dynamodb'

const dynamoCli = (function () {
  const TABLE_NAME = COLLECTION
  const REGION = AWS_DEFAULT_REGION
  
  let dynamoClient: any = null
  
  function init() {
    const dbOpts: ServiceConfigurationOptions = {
      region: REGION,
      endpoint: (DB_DYNAMO_OFFLINE === "true") ? DB_DYNAMO : undefined,
      //httpOptions: {
      //  connectTimeout: 1000,
      //  timeout: 1000,
      //},
      //maxRetries: 6,
    }

    dynamoClient = new aws.DynamoDB.DocumentClient(dbOpts) // dbOpts REQUIRED
  }
  
  function insert(entry: InputNote = {}) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        title: entry.title,
        content: entry.content,
      },
    }

    console.log('inserting in db with params', params)
    return dynamoClient
      .put(params)
      .promise()
      .then(() => ({ ...params.Item, insertedId: params.Item.id }))
  }

  function list(input: InputNote = {}) {
    console.log('document list')
    let params: any = null

    if (input.id) {
      params = {
        TableName: TABLE_NAME,
        Key: {
          id: input.id,
        },
      }

      console.log('listing db with params', params)
      return dynamoClient
        .get(params)
        .promise()
        .then((res) => res.Item)
    } else {
      params = {
        TableName: TABLE_NAME,
      }

      console.log('listing db with params', params)
      return dynamoClient
        .scan(params)
        .promise()
        .then((res) => res.Items)
    }
  }

  function update(input: InputNote = {}) {
    console.log('document update', input)

    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: input.id,
      },
      UpdateExpression: 'set title = :r, content = :p',
      ExpressionAttributeValues: {
        ':r': input.title,
        ':p': input.content,
      },
      ReturnValues: 'UPDATED_NEW',
    }

    console.log('put updating db with params', params)
    return dynamoClient.update(params).promise()
  }

  function updatePartial(input: IdxObj = {}) {
    console.log('document patch', input)

    let elems = ''
    const exprAttrVals: IdxObj = {}
    const keys = ['title', 'content']
    for (const key in input) {
      if (keys.includes(key)) {
        elems += `${key} = :${key}, `
        exprAttrVals[`:${key}`] = input[key]
      }
    }

    const params: UpdateItemInput = {
      TableName: TABLE_NAME,
      Key: {
        id: input.id,
      },
    }

    if (elems) {
      elems = elems.trim()
      elems = elems.slice(0, elems.length - 1)
      params.UpdateExpression = 'set ' + elems
      params.ExpressionAttributeValues = exprAttrVals
    }

    console.log('patch updating db with params', params)
    return dynamoClient.update(params).promise()
  }

  function del(input: InputNote = {}) {
    console.log('document to be removed', input)
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: input.id,
      },
    }

    console.log('delete db with params', params)
    return dynamoClient.delete(params).promise()
  }

  return {
    init,
    insert,
    delete: del,
    list,
    update,
    updatePartial,
  }
})()

export default dynamoCli

