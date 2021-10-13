import './app.css'
import Home from './home'
import ScheduleAppt from './schedule-appt'
import Success from './success'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export default () => (
  <>
    <header>
      <h1>Harmon's Oil Change</h1>
    </header>
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/schedule-appt" component={ScheduleAppt} />
          <Route path="/success/:apptId" component={Success} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </main>
    <footer className="footer">
      <div className="footer-card">
        <h4>Address</h4>
        <div>1236 Next Door St, Springfield IL</div>
      </div>
      <div className="footer-card">
        <h4>Hours</h4>
        <div>8-4 Monday-Saturday</div>
      </div>
      <div className="footer-card">
        <h4>Contact Us</h4>
        <div>555-0101</div>
        <div>oilchange@harmons.shop</div>
      </div>
    </footer>
  </>
)
