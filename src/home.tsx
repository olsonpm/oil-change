import './home.css'
import BtnAction from './btn-action'
import { ReactComponent as DoubleLeftQuote } from './double-left-quote.svg'

export default () => (
  <>
    <p>Need your oil changed? Harmon's got you covered.</p>
    <p>We're quick, knowledgeable and treat everyone with respect.</p>
    <BtnAction linkTo="/schedule-appt" className="schedule-an-appt">
      Schedule An Appointment
    </BtnAction>
    <h2>Why Choose Harmon's?</h2>
    <p>See what customers love most</p>
    <div className="quote">
      <DoubleLeftQuote />
      <div>
        <h4 className="quote-name">Mike Truk</h4>
        <p>I was in and out of Harmon's in 15 minutes!</p>
      </div>
    </div>

    <div className="quote">
      <DoubleLeftQuote />
      <div>
        <h4 className="quote-name">Cheri McSriff</h4>
        <p>
          I couldn't remember what type of oil I got last time, but they had it
          on record and quickly got me back on the road.
        </p>
      </div>
    </div>

    <div className="quote">
      <DoubleLeftQuote />
      <div>
        <h4 className="quote-name">Todd Bonzolez</h4>
        <p>
          Other oil shops in the area just don't feel the same. When I step into
          Harmon's I feel like family.
        </p>
      </div>
    </div>
  </>
)
