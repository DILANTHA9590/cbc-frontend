
import { Link } from 'react-router-dom';
import { BsGraphUp } from "react-icons/bs";

export default function AdminPage(){

    return(

        <>

{/* //methana width eka full gannava evege h -screen eken divice eke height ekata venas venava */}
        <div className="bg-slate-700  w-full h-screen flex">

        
                <div className=" w-[20%] h-screen bg-blue-800 flex flex-col items-center  ">



                <Link to="/admin/dashboard"><BsGraphUp />Dashbord</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/customer">Customer</Link>

                    

                </div>

                <div className="w-[80%] h-screen bg-blue-400">

                </div>
                
            </div>
      


        
        </>



    )

}