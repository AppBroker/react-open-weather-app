import React from 'react'
import TextField from 'material-ui/TextField'
import FormValidator from '../forms/FormValidator'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { loadResultData, searchFieldChanged } from '../actions/actions'
import { connect } from 'react-redux'

class TextFieldSubmit extends React.Component {
  constructor(props) {
    super(props)
    this.validator = new FormValidator([
      {
        field: 'location',
        method: 'isEmpty',
        validWhen: false,
        message: 'Location is required.'
      }
    ])

    this.submitted = false
    this.state = {
      location: '',
      validation: this.validator.valid()
    }
  }

  handleNext = (event) => {
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    if (validation.isValid) {
      this.handleFormSubmit(event)
    }
  };

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.dispatch(searchFieldChanged({ searchTerm: event.target.value, preference: 'weather' }))
  }

  handleFormSubmit = async (event) => {
    event.preventDefault()

    const validation = this.validator.validate(this.state)
    const { location } = this.state
    this.setState({ validation })
    this.submitted = true
    this.props.dispatch(loadResultData({ searchTerm: location, preference: 'weather',
      hasSearched: this.submitted }))
  }

  render() {
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    const hintText = this.props.searchTerm === '' ? 'Add your weather location' : ''
    return (
      <MuiThemeProvider>
        <div>
        	<TextField
        	  id='capture_searchterm'
        	  name='location'
        	  className='material_textfield'
        	  onChange={this.handleInputChange}
            value={this.props.searchTerm}
        	  hintText={hintText}
        	  errorText={validation.location.message}
        	/>
        	<RaisedButton
              id='capture_submit'
        	    className='material_flatbutton'
        	    label='Search'
        	    primary={true}
        	    keyboardFocused={false}
        	    onClick={this.handleNext}
        	  />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(state => state)(TextFieldSubmit)
