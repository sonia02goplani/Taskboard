import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DisplayBoard from '../DisplayBoard/DisplayBoard';
import './Example.css'
import fire from '../fire'
import _ from 'lodash';

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.createBoard=this.createBoard.bind(this);
     
        this.state = {
            loadBoard:[],
            show: false,
            showBoard:false,
           board:{
            boardTitle: '',
            favColor:'#838c91',
           
           } ,
            
        };
    }
    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let boardRef = fire.database().ref('boards').orderByKey().limitToLast(100);
        boardRef.on('value', snapshot => {
          /* Update React state when message is added at Firebase Database */
         
          this.setState({loadBoard: _.values(snapshot.val()) }, () => {console.log(this.state.loadBoard)});
        })
      }
    handleChange(event){
        const { name, value } = event.target
        this.setState({
        board:{
            ...this.state.board,
            [name]: value
        }
        })
    }
    handleClick =(color) => {
  
        this.setState({
           board:{
               ...this.state.board,
            favColor: color
           } 
        })
        
    }
    createBoard=()=> {
        this.setState({ 
            show: false ,
            showBoard:true,
            board:{
            ...this.state.board,
           
            }
           });
      console.log(this.state.board.showBoard)
            fire.database().ref('boards').push(this.state.board );                
    }
    handleBoardShow=(board) =>{
        this.setState({
            showBoard:true,
            board:{
                boardTitle: board.boardTitle,
                favColor: board.favColor
            }
        });
        <DisplayBoard title={this.state.board.boardTitle} shows={this.state.showBoard} color={this.state.board.favColor} />

       

    }

    handleClose() {
        this.setState({ show: false ,showBoard:false});
    
    }

    handleShow() {
        this.setState({ show: true, showBoard:false });
    }

    render() {
        var boards=[];
        this.state.loadBoard.forEach( board => {

            boards.push( 
            <Button className="mr-2" variant="success" onClick={() =>this.handleBoardShow(board)}>
            {board.boardTitle}
            </Button>)
        });


        return (
            <div >
                 <header>
                        <Button className="mr-2"  variant="primary" onClick={this.handleShow}>
                        New Board
                        </Button>
                        {boards}
                     
                </header>
                <div>
                    <Modal  show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                       <form className="container">
                           <div className="row"  style={{ flexDirection: 'row'}}>
                              <div className="col-5">
                              <input type='text' placeholder='Add Board title'
                                value={this.state.boardTitle}
                                name='boardTitle'
                                onChange={this.handleChange} />
                                
                              </div>
                           
                        
                              <div className="col-7 row" style={{ flexDirection: 'row'}}>
                                         <ul className="colorList">
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#838c91')}
                                                    name="favColor" style={{backgroundColor: '#838c91'}}>
                                                    >
                                            </Button>
                                            </li> 
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#d29034')}
                                                    name="favColor"  style={{backgroundColor: '#d29034'}}>
                                            </Button>
                                            </li>
                                            <li>
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#b04632')}
                                                    name="favColor" style={{backgroundColor: '#b04632'}}>
                                            </Button>
                                            </li>
                                        </ul>

                                        <ul  className="colorList">
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#ddced2')}
                                                    name="favColor" style={{backgroundColor: '#ddced2'}}>
                                            </Button>
                                            </li> 
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#89609e')}
                                                    name="favColor" style={{backgroundColor: '#89609e'}}>
                                            </Button>
                                            </li>
                                            <li>
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#cd5a91')}
                                                    name="favColor" style={{backgroundColor: '#cd5a91'}}>
                                            </Button>
                                            </li>
                                        </ul>

                                        <ul  className="colorList">
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#4bbf6b')}
                                                    name="favColor" style={{backgroundColor: '#4bbf6b'}}>
                                            </Button>
                                            </li> 
                                            <li>                   
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#00aecc')}
                                                    name="favColor" style={{backgroundColor: '#00aecc'}}>
                                            </Button>
                                            </li>
                                            <li>
                                            <Button className="colorButton"
                                                    value={this.state.favColor}
                                                    onClick={() =>this.handleClick('#0079bf')}
                                                    name="favColor" style={{backgroundColor: '#0079bf'}}>
                                            </Button>
                                            </li>
                                        </ul>

                                        
                       
                      
                      
                    </div>
                    </div>
                     
                        </form>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.createBoard}>
                                Create Board
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <DisplayBoard title={this.state.board.boardTitle} shows={this.state.showBoard} color={this.state.board.favColor} />
               
            </div>
        );
    }
}
export default Example;