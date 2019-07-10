import React, { Component } from 'react';
import './DisplayCards.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import { faAlignJustify ,faUser} from "@fortawesome/free-solid-svg-icons";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fire from '../fire'
import _ from 'lodash';

class DisplayCards extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loadCards: [],
            cards: [],
            card:{
                cardId: 0,
                cardTitle: '',
                cardDes: '',
                assignedTo:'',
                addedBy:'',
                boardName: '',
                category: 'userStory'
            },
            selectedCard:{
                cardId: 0,
                cardTitle: '',
                cardDes: '',
                assignedTo:'',
                addedBy:'',
                boardName: '',
                category: ''
            },
            modalShow: false,          
        }
            this.addCard = this.addCard.bind(this);
    }
    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let cardRef = fire.database().ref('cards');
        cardRef.on('value', snapshot => {
          /* Update React state when message is added at Firebase Database */
         
          this.setState({loadCards: _.values(snapshot.val()) }, () => {console.log(this.state.loadCards)});
        })
      }
    
    handleModalShow=(cardId)=> {
    this.setState({ modalShow:true});
    fire.database().ref('cards').child(cardId).on("value" , snapshot=>{
       let data= snapshot.val()
       console.log(data.cardTitle)
       this.setState({
           selectedCard: {
            cardId: cardId,
            cardTitle: data.cardTitle,
            cardDes: data.cardDesc,
            assignedTo: data.assignedTo,
            addedBy: data.addedBy,
            boardName: data.boardName,
            category: data.category
           }
       })
                
    })
}   
    handleModalClose=() => {
        this.setState({ modalShow:false});

    }
    updateCards(){
        console.log("In update" + this.state.card.cardId)
        if(this.state.card.cardId>= 0){
            fire.database().ref('cards').child(this.state.card.cardId).set(this.state.card);             
            this.inputEl.value = '';  
        }
        this.setState({
            cards: [...this.state.cards , this.state.card]
        });
        console.log("cards" + this.state.card.cardId)

    }
        addCard(boardTitle) {
                var count =this.state.loadCards.length ;
                var input=this.inputEl.value;
                  this.setState({       
                      card: {
                          ...this.state.card,
                          cardId: count,
                          cardTitle: input,
                          boardName: boardTitle
                      }}, () => {this.updateCards()});
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
         let card = this.state.loadCards.filter((title) => {
             if(title!=undefined){
                if (title.cardId == id) {
                    title.category = cat;   
                    fire.database().ref('cards').child(id).update({category: cat})
                   
                }  
             }
                       
              return title;       
          });
          this.setState({
            card:{
                cardTitle: '',
                cardDes: '',
                assignedTo:'',
                addedBy:'',
                category: 'userStory'
            }
          })       
        
       }
       updateCardDetails=()=>{
           console.log("updated" + this.state.selectedCard.cardDes)
        if(this.state.card.cardId>= 0){
            fire.database().ref('cards').child(this.state.selectedCard.cardId).set(this.state.selectedCard);             
            this.inputEl.value = '';  
            this.inputE2.value = '';  
            this.inputE3.value = ''; 
            this.inputE4.value = '';  

        }
        this.state.cards.forEach((card)=>{
            if(card.cardId===this.state.selectedCard.cardId){
                card= this.state.selectedCard
            }
        })
       }
       saveCardDetails=() =>{
           
        this.setState({ modalShow:false});
        this.setState({
            selectedCard:{
                ...this.state.selectedCard,
                cardTitle: this.inputEl.value,
                cardDes: this.inputE2.value,
                assignedTo: this.inputE3.value,
                addedBy:this.inputE4.value,
            }
        }, () => {this.updateCardDetails()})
       }
   
    render()
     {
         console.log("in render")

        var tasks = {userStory: [], 
                     inProgress: [],
                     completed:[],          
                    } 
               if(this.state.loadCards.length> 0){

                this.state.loadCards.forEach((title) => {
                    console.log("rendering" + this.state.loadCards[1])
                if(title!= undefined){
                    if(this.props.title === title.boardName ){
                        tasks[title.category].push( 
                            <div id="display-data" key={title.cardId} className="draggable"
                            onDragStart={(e)=>this.onDragStart(e, title.cardId)}                    
                             draggable >
                            <Card    onClick={(e) => this.handleModalShow(title.cardId)} >
                                <Card.Body className="card">
                                    <Card.Title key={ title.cardTitle }>{title.cardTitle} 
                                    <FontAwesomeIcon className="mt-md-2 float-right" icon={faEdit} /></Card.Title>
                                </Card.Body>
                            </Card>
                            </div>); 
                    }
                }    
             
                         
                  });
               }    
          
           
                      
        return (
            <div className="DisplayCard container " >
                 <div className="row ">
                    <div className='col-3'  >
                    <form>
                        <input type="text" placeholder="Add User Story" required={true}  ref={ el => this.inputEl = el }/>
                        <Button variant="success" type="submit" className="button" 
                        onClick={(event)=> this.addCard(this.props.title)} value="Append" 
                       >Add Card </Button>
                       
                        </form>
                    </div>
                </div>
                   <Form >
                                <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                    <Form.Group controlId="cardTitle">
                                        <Form.Control   className="TitleTile" type="text" 
                                        defaultValue={this.state.selectedCard.cardTitle}
                                        ref={ el => this.inputEl = el }
                                    />   
                                    </Form.Group>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group controlId="cardDesc ">
                                <FontAwesomeIcon className="mr-md-3" icon={faAlignJustify} />
                                <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="5" 
                                    defaultValue={this.state.selectedCard.cardDes}
                                    ref={ el => this.inputE2 = el }
                                  /> 
                                </Form.Group>
                                <Form.Group controlId="assignedTo">
                                <FontAwesomeIcon className="mr-md-3" icon={faUser} />
                                <Form.Label>Assigned To</Form.Label>
                                <Form.Control  type="text" placeholder="Whom you want to assign this task?" 
                                defaultValue={this.state.selectedCard.assignedTo}
                                ref={ el => this.inputE3 = el }
                                />
                                </Form.Group>
                                <Form.Group controlId="assignedBy">
                                <FontAwesomeIcon className="mr-md-3" icon={faUser} />
                                <Form.Label>Assigned By</Form.Label>
                                <Form.Control  type="text" placeholder="Who is assigning this task?" 
                                defaultValue={this.state.selectedCard.addedBy}
                                ref={ el => this.inputE4 = el }
                                />
                                </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button  onClick={this.saveCardDetails}>Save</Button>
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


