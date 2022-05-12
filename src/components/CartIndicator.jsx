import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Alert, Form, FormControl, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { changeUsername } from '../slices/user/userSlice'

// mapStateToProps is a function that returns an object

const mapStateToProps = (state) => {
  return {
    // always return an OBJECT from mapStateToProps
    // every PROPERTY of this OBJECT will be a new PROP for CartIndicator
    cartLength: state.cart.content.length,
    userName: state.user.name,
    areBooksLoading: state.book.loading,
    areBooksCrashed: state.book.error,
  }
}

// mapDispatchToProps allows you to define props that, once invoked, will dispatch actions!

const mapDispatchToProps = (dispatch) => {
  return {
    changeUsernameProp: (name) => {
      dispatch(changeUsername(name))
    },
  }
}

const CartIndicator = ({
  cartLength,
  userName,
  changeUsernameProp,
  areBooksLoading,
  areBooksCrashed,
}) => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      "let's send the inputValue to the redux store to make the user log in!"
    )
    // now how can we send the inputValue, my name, to the redux store? DISPATCHING AN ACTION
    // I want to dispatch changeUsername from here! I'll dispatch the action with inputValue
    changeUsernameProp(inputValue)
  }

  return (
    <div className="ml-auto mt-2 d-flex">
      {areBooksLoading && <Spinner variant="success" animation="border" />}
      {areBooksCrashed ? (
        <Alert variant="danger">FETCH ERROR :(</Alert>
      ) : userName ? (
        <Button color="primary" onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          <span className="ml-2">{cartLength}</span>
        </Button>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormControl
            placeholder="Log in here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndicator)
// we're ENRICHING the export of CartIndicator through connect

// connect()() -> is creating a HOC <- Higher Order Component --> ?? it's a component with MORE PROPS than the ones he started with

// the connect function connects a component to the Redux Store in order to read its value or in order to dispatch an
// action that will trigger a change

// we need to tell CartIndicator:
// a) which properties to READ from the redux store <-- mapStateToProps
// b) and which ACTIONS to dispatch <-- mapDispatchToProps

// mapStateToProps MAPS some Redux store value to our PROPS
// mapDispatchToProps MAPS some dispatching abilities to our PROPS

// in CartIndicator we're just interested in READING properties from the redux store! we just need a)
