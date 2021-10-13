import axios from 'axios'
import BtnAction from './btn-action'
import styles from './success.module.css'
import { RouteComponentProps } from 'react-router'
import { useEffect, useState } from 'react'

interface IGetAppt {
  data: {
    getAppt: {
      date: string
      grade: string
      notes: string
      time: string
    }
  }
}

interface MatchParams {
  apptId: string
}

export default ({ match }: RouteComponentProps<MatchParams>) => {
  //
  // yes it makes more sense to store the data inside context and useContext,
  //   however one of the purposes of this app is to utilize graphql and this is
  //   one way to fetch the data from graphql
  //
  const [state, setState] = useState({
    date: '',
    time: '',
    grade: '',
    notes: '',
  })

  const { apptId } = match.params

  useEffect(() => {
    const query = `
      query getAppt($apptId: ID!) {
        getAppt(id: $apptId){
          date
          grade
          notes
          time
        }
      }
    `

    const payload = {
      query,
      variables: { apptId },
    }

    axios
      .post<IGetAppt>('http://localhost:3001/graphql', payload)
      .then(({ data }) => {
        setState(data.data.getAppt)
      })
  }, [apptId])

  return (
    <>
      <h2>Success!</h2>
      <p>
        Below are are the details of your appointment. Please print this page so
        you don't forget.
      </p>

      <dl className={styles.details}>
        <dt>Date</dt>
        <dd>{state.date}</dd>

        <dt>Time</dt>
        <dd>{state.time}</dd>

        <dt>Oil Grade</dt>
        <dd>{state.grade}</dd>

        <dt>Additional Notes</dt>
        <dd>{state.notes}</dd>
      </dl>

      <p className={styles.thanks}>Thanks for choosing Harmon's!</p>

      <BtnAction className={styles.backHome} linkTo="/">
        ← Back Home
      </BtnAction>
    </>
  )
}
