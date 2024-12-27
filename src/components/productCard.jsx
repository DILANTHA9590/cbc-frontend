export default function ProductCard(props) {


    console.log(props)

    return (

// me thamai ape commponent eka
        <div>
            <img src={props.image} />
            <h1> {props.name}</h1>
            <h2>{props.price}</h2>
            <button>Add to card </button>
        </div>



    )
}