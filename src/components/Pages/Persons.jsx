import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { createPerson, deletePerson, listPersons } from '../../redux/actions/personsAction';
  


const mapStateToProps = (state)=>{
    return{
        personsList: state.personsList,
        personCreate: state.personCreate,
        personDelete: state.personDelete
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listPersons: ()=> dispatch(listPersons()),
        createPerson: (person) => dispatch(createPerson(person)),
        deletePerson: (id) => dispatch(deletePerson(id))
     
    }
  }

class Persons extends Component {

    state={
        name: '',
        short_description: ''
    }

    

    componentDidMount(){
        this.props.listPersons();
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    handleSubmit=(event)=>{
      event.preventDefault();

      const person={
        name: this.state.name,
        short_description: this.state.short_description
      }
      
      this.props.createPerson(person);
      this.props.listPersons();
      

      this.setState({
        name: '',
        short_description: ''
      })


    }
    
    handleDelete=(id)=>{
      this.props.deletePerson(id);
      

    }

  

  render() {
    const { loading, persons } = this.props.personsList;

    console.log(this.props.personCreate);
    console.log(this.props.personDelete);
    
    
    const personsRow = persons.map((person, index)=>{
        return(
        <tr key={person.id}>
        <th scope="row">{index+1}</th>
        <td>{person.name}</td>
        <td>{person.short_description}</td>
        <td>
          <Button color="warning" onClick={()=>this.handleEdit(person.id)} className="mr-2">Edit</Button>
          <Button color="danger" onClick={()=>this.handleDelete(person.id)}>Delete</Button>
        </td>
      </tr>
      )})

      if(loading){
        return <div>Loading............</div>

      }else{

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
                        <th>Name</th>
                        <th>Short Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                
                      {personsRow}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
  
            <div className="col-md-6">
              <Form onSubmit={(event) => this.handleSubmit(event)}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter the  Name"
                    type="text"
                    value={this.state.name}
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    id="short_description"
                    name="short_description"
                    placeholder="Enter the Description"
                    type="text"
                    value={this.state.short_description}
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </FormGroup>
               
  
                <Button>Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      )
    }
      }

    
}

export default connect(mapStateToProps, mapDispatchToProps) (Persons);
