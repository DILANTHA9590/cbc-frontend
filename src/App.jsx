import { useState } from 'react'
import Loginpage from './pages/loginpage'
import Homepage from './pages/homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/signup'
import Signup from './pages/signup'
import AdminPage from './pages/adminpage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* me browser routes valin thama apata avshay page val;ata ayanna hasuruvanna meyage athule thava thiye routes , route, path
    component me br ta penava apelocal host path eka penava eya e anuva thama apata avsha page eka denna 

    e vagema ita akalin api meka use karabnnam "react-router-dom"  me library eka install karganna oniita passe 
    ud thiyena browseroter, router and routrs import karaggana oni



    */}

      <BrowserRouter>


        {/* <ProductCard name="Mechanical keybord" price="LKR 100000" image="https://www.bing.com/ck/a?!&&p=9eef03445c1eddc40b45a2a5fb51e6aaa92361cc6f881f5ff55358b894fb181fJmltdHM9MTczNDgyNTYwMA&ptn=3&ver=2&hsh=4&fclid=3a0d9fda-7305-69d7-377b-8c737204686d&u=a1L2ltYWdlcy9zZWFyY2g_cT1tZWNoYW5pY2FsK2tleWJvYXJkJmlkPURBOUE4RkY4QTY0QkI3OTY2Nzk2MTgwODU1MjcyMzIyODg5MURDMkEmRk9STT1JUUZSQkE&ntb=1" />
      <ProductCard name="Rtx 260" price="LKR 150000" image="https://www.bing.com/ck/a?!&&p=397996c5d958f47127f6f4894c908cb8d88be4708d15f2ce35ec9f108f8f886bJmltdHM9MTczNDgyNTYwMA&ptn=3&ver=2&hsh=4&fclid=3a0d9fda-7305-69d7-377b-8c737204686d&u=a1L2ltYWdlcy9zZWFyY2g_cT1ydHgrMjYwK3ZnYSZpZD0zMUNCMzM4RDM5MTY1REZBRjk5QjQ3NTJGQTRBNThGRkI5NTU1MUE4JkZPUk09SVFGUkJB&ntb=1 " />
      <ProductCard name="i5 13th Gen Proccesor" price="LKR 75000" image=" https://th.bing.com/th/id/OIP.Imgl42hGepiGlmmZKI6mggHaHk?rs=1&pid=ImgDetMain" /> */}

        {/* <TestOne />   routes path eke /* lakunen kiyanne name eka nathuvva enna puluvan
       puluvan home page eka */}


        <Routes path="/*">
          {/* me router vala route athu athule thama api path eka saha pennvana commponnetnt eka denne()page eka
       */}
          <Route path="/*" element={<Homepage />} />
          {/* uda home page eka hadala thiyenne monava gahan avath home page ekata yana vidihata ekai /* dana eken 
          
          venne  habai <Route path="/admin/jhnkgbkj" element={<AdminPage />} /> mehema gahuvoth enne eth admioin ekata 
           apata admin kiyana vachane gahala vena onima deyak gahuvath apata admin panel ekata yanaa vidihata hadanne me pahala thiyena vidihata */}

           
          <Route path="/admin/*" element={<AdminPage />} />


          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={< Signup/>} />

         
  

          {/* <Route path="/*" element={<h1>404 error</h1>} /> */}
          {/* me 404 eke api kiyala thiyenne  uda ena onima page element ekkata yana path ekakata ave naththam 404 pennnva 
          /* mark eken kiyanne ekai*  api mona vidihata gahuvath metahana dan home page ekata enna dagannava mekata enne athivenna/}
  

        {/* <Homepage /> kalin dunne me vidihata  routes valata noda */}

         </Routes>

      </BrowserRouter>
    </>

  )
}

export default App
