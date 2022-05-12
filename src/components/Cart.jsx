import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeFromCart } from '../slices/cart/cartSlice'

// READ ACCESS
const mapStateToProps = (state) => ({
  cartContent: state.cart.content,
  // every property of this object will become a prop for Cart.jsx
})

// "WRITE" ACCESS (defining the dispatching abilities)
const mapDispatchToProps = (dispatch) => ({
  removeFromCartProp: (index) => {
    dispatch(removeFromCart(index))
    // the argument you're dispatching the action with is going to be found in your slice file under action.payload
    // index --> is action.payload in the slice file!
  },
})

const Cart = ({ cartContent, removeFromCartProp }) => (
  <Row>
    <Col sm={12}>
      <ul style={{ listStyle: 'none' }}>
        {cartContent.map((book, i) => (
          <li key={i} className="my-4">
            <Button variant="danger" onClick={() => removeFromCartProp(i)}>
              <FaTrash />
            </Button>
            <img
              className="book-cover-small"
              src={book.imageUrl}
              alt="book selected"
            />
            {book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold">
        TOTAL:{' '}
        {cartContent.reduce(
          (acc, currentValue) => acc + parseFloat(currentValue.price),
          0
        )}
      </Col>
    </Row>
  </Row>
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// let's connect Cart to the redux store! do we need to READ from it (mapStateToProps) or do we need to DISPATCH ACTIONS (mapDispatchToProps)?
