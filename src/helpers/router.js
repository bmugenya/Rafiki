import Header from '../components/Header'
import Widget from '../components/Widget'
import Feed from '../components/Feed'
import Login from '../pages/login'
import Chat from '../components/Chat'
import Bar from '../components/Bar'
import Consent from '../components/Consent'
import Accordion from '../components/accordion'
import Zoom from '../components/zoom'
import * as ROUTES from '../constants/routes'
import useAuthListener from '../hooks/use-auth-listener'
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'



export default function Router() {

  return (

   <BrowserRouter>
     <Header />
      <Routes>
      <Route path={ROUTES.HOME} element={
        <>
          <div className='app_body'>
            <Feed />
            <Widget />
          </div>
        </>
          } />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FAQ} element={<Accordion />} />
         <Route path={ROUTES.CONSENT} element={<Consent />} />
          <Route path='/chat/:groupName' element={
            <> 
            <div className='chatt'>
              <div className='chatt_body'>
                <Bar />
                <Chat />
              </div>
            </div>
             </>
           }/>
           </Routes>


    </BrowserRouter>

  )
}
