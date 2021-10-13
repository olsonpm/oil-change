import axios from 'axios'
import BtnAction from './btn-action'
import moment from 'moment'
import styles from './schedule-appt.module.css'
import TimePicker from 'react-gradient-timepicker'
import { useHistory } from 'react-router'
import { SingleDatePicker } from 'react-dates'
import { useState } from 'react'

interface ICreateAppt {
  data: {
    createAppt: {
      id: string
    }
  }
}

export default () => {
  const history = useHistory()
  const [date, setDate] = useState<moment.Moment | null>(moment())
  const [time, setTime] = useState({ format12: '08:00 AM', format24: '08:00' })
  const [grade, setGrade] = useState('')
  const [notes, setNotes] = useState('')
  const [dateFocused, setDateFocused] = useState(false)

  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()

    const variables = {
      appt: {
        date: date?.format('MM/DD/YYYY'),
        grade,
        notes,
        time: time.format12,
      },
    }

    const query = `
      mutation createAppt($appt:ApptInput) {
        createAppt(appt: $appt){
          id,
        }
      }
    `

    const payload = {
      query,
      variables,
    }

    const { data } = await axios.post<ICreateAppt>(
      'http://localhost:3001/graphql',
      payload
    )

    history.push(`/success/${data.data.createAppt.id}`)
  }

  const onGradeChanged: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setGrade(evt.currentTarget.value)
  }

  const onTextAreaBlur: React.FocusEventHandler<HTMLTextAreaElement> = (
    evt
  ) => {
    setNotes(evt.target.value)
  }

  const closedSundays = (day: moment.Moment) => moment(day).day() === 0

  return (
    <>
      <BtnAction linkTo="/">← Back Home</BtnAction>
      <h2>Let's schedule your appointment</h2>
      <form onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="date">
          What day are you coming in?
        </label>
        <SingleDatePicker
          date={date}
          focused={dateFocused}
          id="date"
          isDayBlocked={closedSundays}
          onDateChange={setDate}
          onFocusChange={({ focused }) => setDateFocused(focused)}
        />

        <label className={styles.label}>
          When can we expect you?
          <TimePicker
            className={styles.timePicker}
            onSet={(time: any) => setTime(time)}
            time={time.format24}
          />
        </label>

        <label htmlFor="grade" className={styles.label}>
          Which grade of oil will you be getting?
        </label>
        <select id="grade" className={styles.grade} onChange={onGradeChanged}>
          <option value="">Select a grade</option>
          <option>Conventional</option>
          <option>Synthetic Blend</option>
          <option>Full Synthetic</option>
        </select>

        <label htmlFor="notes" className={styles.label}>
          Anything else we should be aware of?
        </label>
        <textarea
          className={styles.notes}
          id="notes"
          onBlur={onTextAreaBlur}
          placeholder="e.g. please take a look at my tires"
          rows={5}
        ></textarea>

        <BtnAction containerClassName={styles.submit}>Submit →</BtnAction>
      </form>
    </>
  )
}
