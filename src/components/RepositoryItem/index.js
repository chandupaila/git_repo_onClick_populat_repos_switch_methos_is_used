import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {imageUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="eachItem">
      <div className="center">
        <img src={imageUrl} alt={name} className="image" />
      </div>
      <h1 className="name">{name}</h1>
      <div className="stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p>{starsCount} stars</p>
      </div>

      <div className="stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p>{forksCount} forks</p>
      </div>

      <div className="stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p>{issuesCount} issues count</p>
      </div>
    </li>
  )
}

export default RepositoryItem
