// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', onClickStarred: false}

  getStarred = id => {
    this.setState(preVState => ({
      appointmentList: preVState.appointmentList.map(eachAppoint => {
        if (eachAppoint.id === id) {
          return {...eachAppoint, isStarred: !eachAppoint.isStarred}
        }
        return eachAppoint
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const DateInput = date ? format(new Date(date), 'dd MMMM yyyy,EEEE') : ''

    const newAppoint = {
      id: uuidv4(),
      title,
      date: DateInput,
      isStarred: false,
    }
    this.setState(preVState => ({
      appointmentList: [...preVState.appointmentList, newAppoint],
      date: '',
      title: '',
    }))
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getStarredItems = () => {
    this.setState(preVState => ({onClickStarred: !preVState.onClickStarred}))
  }

  results = () => {
    const {appointmentList, onClickStarred} = this.state

    if (onClickStarred) {
      return appointmentList.filter(
        eachAppoint => eachAppoint.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, onClickStarred} = this.state

    const buttonColor = onClickStarred ? 'unStarred-button' : 'starred-button'

    const filteredResults = this.results()

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="top-section">
            <form className="form-container">
              <label htmlFor="inputText" className="label-heading">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="inputText"
                className="input"
                placeholder="Title"
                value={title}
                onChange={this.getTitle}
              />
              <br />
              <label htmlFor="inputDate" className="label-heading">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="inputDate"
                className="input"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={this.getDate}
              />
              <br />
              <button
                type="submit"
                className="button"
                onClick={this.onAddAppointment}
                data-testid="star"
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr />
          <div className="bottom-section">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={buttonColor}
              onClick={this.getStarredItems}
              data-testid="star"
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {filteredResults.map(eachObj => (
              <AppointmentItem
                key={eachObj.id}
                appointmentListDetails={eachObj}
                starred={this.getStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
