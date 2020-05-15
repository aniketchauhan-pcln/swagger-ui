import React, { Component } from "react"
import PropTypes from "prop-types"

export default class AlternativeSchemaSelect extends Component {
  
  static propTypes = {
    alternativeSchemaSelections: PropTypes.object.isRequired,
    onSelectionChanged: PropTypes.func.isRequired,
    alternativeSchemas: PropTypes.object.isRequired    
  }

  constructor(props) {
    super(props)
    this.oneOfChange = this.oneOfChange.bind(this)
    this.selectOneOfComponent = this.selectOneOfComponent.bind(this)
    this.state = {
      alternativeSchemaSelections: {}
    }
  }

  oneOfChange(e, id) {
    var { onSelectionChanged } = this.props
    var { alternativeSchemaSelections } = this.state

    alternativeSchemaSelections[id] = parseInt(e.target.value)

    onSelectionChanged( alternativeSchemaSelections )
  }

  selectOneOfComponent(attributePath, options, defaultOption, type) {
    if (options) {
      return (
        <div key={"OneOf" + attributePath} style={{ padding: "0 0 10px 0" }} className={"content-type-wrapper "}>
          <div>
            <br/>
            <h3 htmlFor={attributePath} className={"response-control-alternative-examples__title"}>Choose a type from the list below to see an example value:</h3>
          </div>
          <select
            className="content-type"
            name={attributePath}
            value={defaultOption}
            onChange={(e) => this.oneOfChange(e, attributePath)}
          >
            {Object.keys(options).map((key, index) => {
              return <option key={index + key} value={index}>{options[key]}</option>
            })}
          </select>
        </div>
      )
    }
    return null
  }

  render() {

    const { alternativeSchemas } = this.props

    var oneOfComponents = []
    if (alternativeSchemas) {
      alternativeSchemas.map((attribute) => {
        oneOfComponents.push(this.selectOneOfComponent(attribute.key, attribute.options, attribute.selectedIndex, attribute.type))
        return true
      })
    }
    return (
      <div>
        {oneOfComponents}
        <br/>
      </div>
    )
  }
}