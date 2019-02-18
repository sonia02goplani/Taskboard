import React, { Component } from 'react';
import './DisplayCards.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import { faAlignJustify ,faUser} from "@fortawesome/free-solid-svg-icons";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class DisplayCards extends Component {
    constructor() {
        super();
        this.state = {
            displayData: [],
            card: {
                cardTitle: '',
                cardDes: '',  
                addedBy:'',
                assignedTo:'',
                category: "userStory"
            },
            modalShow: false,
            selectedCard: {
                cardTitle: '',
                cardDes: '',  
                addedBy:'',
                assignedTo:'',
                category: "userStory"
            }
            
        }
        // this.showCard = this.showCard.bind(this);
        this.appendData = this.appendData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
    }
    handleClose() {
        this.setState({ show: false ,showBoard:true});
    
    }
    handleModalShow=(cardTitle)=> {
        

        this.setState({ modalShow:true});
       
              this.setState({
                selectedCard: {
                    ...this.state.selectedCard,
                    cardTitle: cardTitle
                }
              })
                   
       
    }
    handleModalClose=() => {
        this.setState({ modalShow:false});

    }
    handleChange(e) {
        let getTextAreaValue = e.target.value;
        this.setState({
            card: {
            ...this.state.card,
            cardTitle:  getTextAreaValue
            }
        });
    }

    appendData() {
        this.setState({ displayData: [...this.state.displayData, this.state.card] ,card:{...this.state.card, cardTitle:""}})
    }

    onDragOver =(ev)=>{
     ev.preventDefault();
    }

    onDragStart=(ev,id) =>{
        console.log('dragStart', id);
        ev.dataTransfer.setData("id" , id);
    }
    onDrop = (ev, cat) => {       
        let id = ev.dataTransfer.getData("id");
        let card = this.state.displayData.filter((title) => {
            if (title.cardTitle === id) {
                title.category = cat;           
            }              
             return title;       
         });        
         this.setState({                    
                ...this.state,
                card: {
                    cardTitle: '',
                    cardDes: '',  
                    addedBy:'',
                    assignedTo:'',
                    category: "userStory"
                }
         });    
      }
      desChange(e){
        let cardDesc=e.target.value;
    
              this.setState({
                  selectedCard: {
                 ...this.state.selectedCard,
                    cardDes: cardDesc                 
                  }
              })              
      }
      assignedChange(e){
        let cardAssignedTo=e.target.value;
    
        this.setState({
            selectedCard: {
           ...this.state.selectedCard,
              assignedTo: cardAssignedTo                 
            }
        })  
      }
     
    render()
     {
        var tasks = {userStory: [], 
                     inProgress: [],
                     completed:[],
                    
                    } 
                    this.state.displayData.forEach((title) => {
                    tasks[title.category].push( 

                    <div id="display-data" key={title.cardId} className="draggable"
                    onDragStart={(e)=>this.onDragStart(e, title.cardTitle)}                    
                     draggable >
                    <Card    onClick={(e) => this.handleModalShow(title.cardTitle)} >
                        <Card.Body className="card">
                            <Card.Title key={ title.cardTitle }>{title.cardTitle} 
                            <FontAwesomeIcon className="mt-md-2 float-right" icon={faEdit} /></Card.Title>
                        </Card.Body>
                    </Card>
                    </div>);        
                    });
                      
        return (
            <div className="DisplayCard container " >
                 <div className="row ">
                    <div className='col-3'  >
                    <form>
                        <input type="text" placeholder="Add User Story" required={true} value={this.state.card.cardTitle} onChange={this.handleChange} />
                        <Button variant="success" type="submit" className="button" 
                        onClick={this.appendData} value="Append" 
                        disabled={!this.state.card.cardTitle}>Add Card </Button>
                       
                        </form>
                    </div>
                </div>
                  <Form>
                                <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                    <Form.Group controlId="cardTitle">
                                        <Form.Control   className="TitleTile" type="text" 
                                        placeholder={this.state.selectedCard.cardTitle} 
                                        onChange={this.titleChange}
                                        value={this.state.selectedCard.cardTitle} />
                                    </Form.Group>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group controlId="cardDesc ">
                                <FontAwesomeIcon className="mr-md-3" icon={faAlignJustify} />
                                <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="5" 
                                    onChange={this.desChange}
                                    value={this.state.selectedCard.cardDes}/>
                                </Form.Group>
                                <Form.Group controlId="assignedTo">
                                <FontAwesomeIcon className="mr-md-3" icon={faUser} />
                                <Form.Label>Assigned To</Form.Label>
                                <Form.Control  type="text" placeholder="" 
                                onChange={this.assignedChange}/>
                                </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button type="submit" onClick={this.saveCardDetails}>Save</Button>
                                <Button onClick={this.handleModalClose}>Close</Button>
                                </Modal.Footer>
                                </Modal>
                </Form>                
                <div className="row ">
                    <div className='col-3 cardWrapper'  
                    onDragOver={(e)=>this.onDragOver(e)}                    
                    onDrop={(e)=>{this.onDrop(e, "userStory")}}>
                     
                    <label> User Stories </label>
                        {tasks.userStory}
                    </div>
                

                   
                    <div className='col-3 cardWrapper droppable'  
                    onDragOver={(e)=>this.onDragOver(e)}                    
                    onDrop={(e)=>this.onDrop(e, "inProgress")}>
                        <label> In Progress </label>
                        {tasks.inProgress}
                    </div>

                    <div className='col-3 cardWrapper droppable'  
                    onDragOver={(e)=>this.onDragOver(e)}                    
                    onDrop={(e)=>this.onDrop(e, "completed")} >
                        <label> Completed </label>
                        {tasks.completed}
                    </div>

                    <div className='col-3 cardWrapper'  >
                        <label> Problem Faced </label>
                    </div>
                </div>
               
            </div>
        );
    }
}
      
    
export default DisplayCards;


