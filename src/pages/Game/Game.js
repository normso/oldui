import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Game.css"
import user from "./user.png"

function Cell(prop){
    function handleDraw(){
        prop.ws.send(JSON.stringify({m:"gu",p:prop.cid}))
    }

    const Circle =()=>{
        return(
            <div className="circle">

            </div>
        );
    }


    const Cross =()=>{
        return(
            <div className="cross">

            </div>
        );
    }


    return(
        <div onClick={handleDraw} className={"cellContainer " + (prop.type ? prop.type :"") 
            + (prop.value === 0 ? " cellfree" :"") 
            }>
                { prop.value === 0?
                    "":
                    prop.value === 1? <Circle/> : <Cross/>
                    
                }
        </div>
    );
}

function Row(prop){
    return(
        <div className={"rowContainer " + (prop.type ? prop.type :"")  }>
            {prop.children}
        </div>
    );
}

const Game =(prop)=>{
    const { name } = useParams()
    console.log(name)

    function handleNewGame(){
        prop.ws.send(JSON.stringify({m:"n"}))
    }

    if (prop.aband === 0){
        return(
            <div className="gameContainer">
                <div className="tictacContainer">
                    <Row >
                        <Cell ws={prop.ws} cid="00" value={prop.pattern[0][0]} />
                        <Cell ws={prop.ws} cid="01" type="middle"value={prop.pattern[0][1]} />
                        <Cell ws={prop.ws} cid="02" value={prop.pattern[0][2]} />
                    </Row>
                    <Row >
                        <Cell ws={prop.ws} cid="10" value={prop.pattern[1][0]} />
                        <Cell ws={prop.ws} cid="11" type="middle" value={prop.pattern[1][1]} />
                        <Cell ws={prop.ws} cid="12" value={prop.pattern[1][2]} />
                    </Row>
                    <Row type="last">
                        <Cell ws={prop.ws} cid="20" value={prop.pattern[2][0]} />
                        <Cell ws={prop.ws} cid="21" type="middle" value={prop.pattern[2][1]} />
                        <Cell ws={prop.ws} cid="22" value={prop.pattern[2][2]} />
                    </Row>
                </div>
                <div className="gameScoreCard">
                    <div className="gameScore ">
                        <div className={"gameScoreImgContainer "+ (prop.chance === true ? "gameScoreActive":"" )} >
                            <img style={{width:"100%",height:"100%"}} src={user}/>
                            <h2 className="gameScoreText">You</h2>
                        </div>
                        <h2 className="gameScoreText">{prop.score[0]}</h2>
                    </div>
                    <h2 className="gameScoreText">:</h2>
                    <div className="gameScore">
                    <h2 className="gameScoreText">{prop.score[1]}</h2>
                        <div className={"gameScoreImgContainer " + (prop.chance === false ? "gameScoreActive":"" )}>
                            <img style={{width:"100%",height:"100%"}} src={user}/>
                            <h2 className="gameScoreText">Other</h2>
                        </div>
                        
                    </div>
                    
                </div>
                <button onClick={handleNewGame} className="homeRoomButton">Start New Game</button>
                
            </div>
        );
    }else if(prop.aband === 1){
        return (
            <div className="gameContainer">
                <h2>Lobby Terminated Player Left the Game</h2>
            </div>
        );
    }
    
}

export default Game;