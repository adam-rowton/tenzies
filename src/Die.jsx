export default function Die(props){

const styles = {
    backgroundColor: props.isHeld ?  "#59E391" : "#fff "
    
}



    return (
        <div className="dice" style={styles} onClick={props.holdDice}>
           {props.value}
        </div>
    )
}