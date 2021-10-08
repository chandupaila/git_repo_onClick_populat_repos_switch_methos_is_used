import './index.css'

const LanguageFilterItem = props => {
  const {languageSelect, onClickLanguage} = props
  const {id, language} = languageSelect

  const languageClick = () => {
    onClickLanguage(id)
  }

  return (
    <li className="language-list">
      <button type="button" className="button" onClick={languageClick}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
