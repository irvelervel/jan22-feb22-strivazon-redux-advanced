import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooks } from '../slices/book/bookSlice'

const mapStateToProps = (state) => ({
  booksArray: state.book.stock,
})

const mapDispatchToProps = (dispatch) => ({
  getBooksProp: (url) => {
    dispatch(getBooks(url))
  },
})

class BookStore extends Component {
  state = {
    // books: [], // we're not storing the array of books here, we moved them to the redux store!
    bookSelected: null,
  }

  componentDidMount = async () => {
    this.props.getBooksProp('https://striveschool-api.herokuapp.com/food-books')
    // try {
    //   let resp = await fetch(
    //     "https://striveschool-api.herokuapp.com/food-books"
    //   );
    //   if (resp.ok) {
    //     let books = await resp.json();
    //     this.setState({ books });
    //   } else {
    //     console.log("error");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  changeBook = (book) => this.setState({ bookSelected: book })

  render() {
    return (
      <Row>
        <Col md={4}>
          <BookList
            bookSelected={this.state.bookSelected}
            changeBook={this.changeBook}
            // books={this.state.books} // we have to change this, this.state.book does not exist anymore, everything is in the Redux Store now!
            books={this.props.booksArray}
          />
        </Col>
        <Col md={8}>
          <BookDetail bookSelected={this.state.bookSelected} />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
