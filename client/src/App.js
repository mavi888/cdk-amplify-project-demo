import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote, deleteNote } from './graphql/mutations';

import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import awsconfig from './aws-config';

Amplify.configure(awsconfig);
console.log(awsconfig)

class Header extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Notes App</h1>
        </header> 
        <AmplifySignOut />
      </div>
     
    )
  }
}

class AddNote extends Component {
  
  constructor(props) {
    super(props);
    this.state = { note: '' }
  }
  
  handleChange = (event) => {
    this.setState( { note: event.target.value } );
  }
  
  handleClick = (event) => {
    event.preventDefault();    

    // let the app manage the persistence & state 
    this.props.addNote( this.state ); 
    
    // reset the input text box value
    this.setState( { note: '' } );
  }
  
  render() {
    return (
      <div className="container p-3">
            <div className="input-group mb-3 p-3">
              <input type="text" className="form-control form-control-lg" placeholder="New Note" aria-label="Note" aria-describedby="basic-addon2" value={ this.state.note } onChange={this.handleChange}/>
              <div className="input-group-append">
                <button onClick={ this.handleClick } className="btn btn-primary" type="submit">{ "Add Note" }</button>
              </div>
            </div>
        </div>  
    )
  }
}

class NotesList extends Component {
  
  render() {

    return (
      <React.Fragment>
        <div className="container">
        { this.props.notes.map( (note) => 
          <div key={note.id} className="border border-primary rounded p-3 m-3">
            <span>{note.note}</span>
            <button type="button" className="close" onClick={ (event) => { this.props.deleteNote(note) } }>
              <i className="fas fa-trash-alt"></i>
            </button>        
          </div>
        )}
        </div>
      </React.Fragment>
    )
  }   
}



class App extends Component {

  constructor(props) {
    super(props);
    this.state = { notes:[] }
  }

  async componentDidMount(){
    var result = await API.graphql(graphqlOperation(listNotes));
    this.setState( { notes: result.data.listNotes.items } )
  }  

  deleteNote = async (note) => {
    const id = {
      id: note.id
    }
    await API.graphql(graphqlOperation(deleteNote, {input:id}));
    this.setState( { notes: this.state.notes.filter( (value, index, arr) => { return value.id !== note.id; }) } );
  }
  
  addNote = async (note) => {
    var result = await API.graphql(graphqlOperation(createNote, {input:note}));
    this.state.notes.push(result.data.createNote)
    this.setState( { notes: this.state.notes } )
  }

  render() {
    return (
      <AmplifyAuthenticator>
       <div className="row">
        <div className="col m-3">
          <Header/>
          <AddNote addNote={ this.addNote }/>
          <NotesList notes={ this.state.notes } deleteNote={ this.deleteNote }/>
        </div> 
      </div> 
      </AmplifyAuthenticator>
    );
  }
}

export default App;