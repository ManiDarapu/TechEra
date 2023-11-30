import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {data: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    if (id === undefined) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      const url = `https://apis.ccbp.in/te/courses/${id}`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      const coursesData = data.course_details
      const updateData = {
        id: coursesData.id,
        name: coursesData.name,
        imageUrl: coursesData.image_url,
        description: coursesData.description,
      }
      if (response.ok) {
        this.setState({data: updateData, apiStatus: apiStatusConstants.success})
      }
      if (response.status === 404) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
  }

  onClickRetry = () => {
    this.getItemDetails()
  }

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderOnSuccess = () => {
    const {data} = this.state
    if (!data) {
      return null // Handle the case when data is not available
    }
    const {name, imageUrl, description} = data
    return (
      <>
        <img src={imageUrl} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </>
    )
  }

  renderOtpt = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccess()
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      case apiStatusConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderOtpt()}
      </div>
    )
  }
}

export default CourseItemDetails
