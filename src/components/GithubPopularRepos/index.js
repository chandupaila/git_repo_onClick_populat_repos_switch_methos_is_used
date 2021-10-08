import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gitList: [],
    languageSelection: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getGitList()
  }

  getGitList = async () => {
    const {languageSelection} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${languageSelection}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        gitList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUnOrderList = () => {
    const {gitList} = this.state
    return (
      <div className="gitUnOrderList">
        <ul className="repoListUnOrder">
          {gitList.map(eachItem => (
            <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLanguageFilter = () => (
    <ul className="language">
      {languageFiltersData.map(eachItem => (
        <LanguageFilterItem
          key={eachItem.id}
          languageSelect={eachItem}
          onClickLanguage={this.onClickLanguage}
        />
      ))}
    </ul>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  onClickLanguage = id => {
    this.setState({languageSelection: id}, this.getGitList)
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUnOrderList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageFilter()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
