import './App.css';
import MyStripe from './components/stripe.js';
// import SocketIo from './components/socketIo.js';
// import SignUp from './components/signUp.js';
// import LogIn from './components/login.js';
// import UsersList from './components/userslist.js';
// import { useEffect, useState } from 'react';
function App() {

  // const [value,setValue]=useState(false);
  // useEffect(()=>{
  //   var localname = localStorage.getItem('name');
  //   if(localname){
  //     setValue(true);
  //   }
  // },[])

  // const callMe=()=>{
  //   setValue(true)
  // }


  return (
    <div className="App">

    <MyStripe/>
{/* {
!value &&
  <div>
    <LogIn callMe={callMe}/>
    <SignUp/>

  </div>
}



{
value &&
  <div>
<UsersList/>

  </div>
} */}

    </div>
  );
}  

export default App;