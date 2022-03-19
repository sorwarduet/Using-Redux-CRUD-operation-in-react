import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Table
} from "reactstrap";

export default class Books extends Component {
  state = {
    books: [],
    id: "",
    bookName: "",
    author: "",
    rating: "",
    edit: false
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleBooks=()=>{
    axios.get("http://localhost:3001/books").then((response) => {
      this.setState({
        books: response.data,
      });
     
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
   

    if(this.state.edit){
      const bookUpdate={
        bookName: this.state.bookName,
        author: this.state.author,
        rating: this.state.rating
      }
  
      axios.put(`http://localhost:3001/books/${this.state.id}`, bookUpdate)
      .then(response => this.handleBooks())
    } else{
      let data = {
        bookName: this.state.bookName,
        author: this.state.author,
        rating: this.state.rating
  
      }

      axios.post("http://localhost:3001/books", data )
    .then(res=>  this.handleBooks())

    }

    this.setState({
      id: "",
      bookName: "",
      author: "",
      rating: "",
      edit: false
    })

  
    
  };
  handleEdit=(book)=>{
    this.setState({
      id: book.id,
      bookName: book.bookName,
      author: book.author,
      rating: book.rating,
      edit: true
    })

  }

    

  handleDelete=(book)=>{
   
    axios.delete(`http://localhost:3001/books/${book.id}`)
    .then(response =>  this.handleBooks());

  }



  componentDidMount() {
   
    this.handleBooks()
  }


  render() {
    const books = this.state.books.map((book, index)=>{
      return(
      <tr key={book.id}>
      <th scope="row">{index+1}</th>
      <td>{book.bookName}</td>
      <td>{book.author}</td>
      <td>
        <Button color="warning" onClick={()=>this.handleEdit(book)} className="mr-2">Edit</Button>
        <Button color="danger" onClick={()=>this.handleDelete(book)}>Delete</Button>
      </td>
    </tr>
    )})


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Card>
              <CardBody>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Book Name</th>
                      <th>Author Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>

          <div className="col-md-6">
            <Form onSubmit={(event) => this.handleSubmit(event)}>
              <FormGroup>
                <Label for="bookName">Book Name</Label>
                <Input
                  id="bookName"
                  name="bookName"
                  placeholder="Enter the Book Name"
                  type="text"
                  value={this.state.bookName}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter the author"
                  type="text"
                  value={this.state.author}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="select"
                  value={this.state.rating}
                  onChange={(event) => this.handleInputChange(event)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Input>
              </FormGroup>
              {this.state.edit? <Input type="hidden" value={this.state.id} />: ""}

              <Button>{this.state.edit? "Update": "Submit"}</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
