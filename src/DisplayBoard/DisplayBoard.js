import React from 'react';
import  './DisplayBoard.css';
import DisplayCards from '../DisplayCards/DisplayCards';

const displayBoard = (props) => (

<div className="container" style={{
        opacity: props.shows ? '1' : '0',
        backgroundColor:props.color 
        }}>
    <div  className="row boardMainContent">

        <div className="col boardCanvas" style={{
        opacity: props.shows ? '1' : '0',
        backgroundColor:props.color 
        }}>
        </div>
        <div className="col boardheader" >   
        <h1> {props.title} </h1>
        </div>   
    </div>

    <DisplayCards title={props.title}/>
</div>    
);

export default displayBoard;
