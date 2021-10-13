import { buildSchema } from 'graphql'

interface Appt {
  date?: string
  grade?: string
  notes?: string
  time?: string
}

const arrDb: Appt[] = []

const apptInputSchema = `
  date: String
  grade: String
  notes: String
  time: String
`

const schema = buildSchema(`
  input ApptInput {
    ${apptInputSchema}
  }

  type Appt {
    id: ID!
    ${apptInputSchema}
  }

  type Query {
    getAppt(id: ID!): Appt
  }

  type Mutation {
    createAppt(appt: ApptInput): Appt
  }
`)

const rootValue = {
  getAppt: ({ id }: { id: number }) => Object.assign({ id }, arrDb[id]),
  createAppt: ({ appt }: { appt: Appt }) => {
    const id = arrDb.length

    arrDb[id] = appt

    return Object.assign({ id }, appt)
  }
}

export { rootValue, schema }
