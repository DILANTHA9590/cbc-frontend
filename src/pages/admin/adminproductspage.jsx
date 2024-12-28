
 import axios from "axios"
  //api me library eka insatall akaragathha meken tahamai backend ekata call
 //karala dta genna ganna ekata apata meka oni meken venne bakend ekata api call gahanava


 
 export default function AdminProductsPage(){

    //dan api methana component eka loard vena velavadi api call ekk ganava 

    axios.get("http://localhost:3000/api/products").then((res)=>{//methana .then damme me deka vena venama thiyena 
        //project dekka nisa koi veve euda dnne nane ekai
        console.log(res);
        
        //habai mehema damma eorr ekk enava metahan apata broweser eke erorr ekk enava
        //cores policy kiyala error ekk apiata ehema venne ape bkackend eka hamathanima  ena api codes piliganne na
        // eka  piliganna apita npm install cores install karaganna oni eka backend ekata thama install karanne
    })

    // methandi api dan ape bacxkend eken data gannav metahana axios eken get dala thiyenne api 
    //dan backeend eke dhadala 

    return(

        <>

        <h1>Admin Productpage</h1>


        </>

    )
}