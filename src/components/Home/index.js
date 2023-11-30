import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'
import CourseItemDetails from '../CourseItemDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courses: [],
    apiStatus: apiStatusConstants.initial,
    itemClicked: false,
    activeId: null,
  }

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const coursesData = data.courses
    const updatedData = coursesData.map(each => ({
      id: each.id,
      name: each.name,
      logoUrl: each.logo_url,
    }))
    if (response.ok) {
      this.setState({
        courses: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getList()
  }

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  toggleItemClicked = id => {
    this.setState({itemClicked: true, activeId: id})
  }

  renderOnSuccess = () => {
    const {courses} = this.state
    return (
      <>
        <h1>Courses</h1>
        <ul className="ul">
          {courses.map(each => (
            <CourseItem
              key={each.id}
              item={each}
              toggleItemClicked={this.toggleItemClicked}
            />
          ))}
        </ul>
      </>
    )
  }

  renderOtpt = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderOnFailure()
      case apiStatusConstants.success:
        return this.renderOnSuccess()
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }

  render() {
    const {itemClicked, activeId} = this.state
    return (
      <div className="div1">
        <Header />
        <div className="div2">
          {itemClicked ? (
            <CourseItemDetails id={activeId} />
          ) : (
            this.renderOtpt()
          )}
        </div>
      </div>
    )
  }
}

export default Home
