import './index.css'
import {Link} from 'react-router-dom'

const CourseItem = props => {
  const {item, toggleItemClicked} = props
  const {id, logoUrl, name} = item

  const onClickView = () => {
    toggleItemClicked(id)
  }
  return (
    <Link to={`/courses/${id}`} onClick={onClickView}>
      <li className="li">
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
