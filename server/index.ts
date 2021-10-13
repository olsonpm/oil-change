import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { rootValue, schema } from './graphql'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
  .use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  }))

app.listen(3001, () => {
  console.log('graphql server listening on port 3001')
})
