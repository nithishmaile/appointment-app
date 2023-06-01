// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentListDetails, starred} = props
  const {id, title, date, isStarred} = appointmentListDetails

  const starredStar = () => {
    starred(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="inside-list-container">
        <p className="title-heading">{title}</p>
        <button type="button" className="star-button" onClick={starredStar}>
          <img src={imgUrl} alt="star" data-testid="star" />
        </button>
      </div>
      <p className="date-heading">Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
