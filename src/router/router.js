import Header from '../components/Header'
import Widget from '../components/Widget'
import Feed from '../components/Feed'
import Login from '../pages/login'
import Signup from '../pages/signup'
import VideoConference from '../pages/video'
import Chat from '../components/Chat'
import Bar from '../components/Bar'
import Consent from '../components/Consent'
import Accordion from '../components/accordion'
import * as ROUTES from '../constants/routes'
import { BrowserRouter, Routes, Route} from 'react-router-dom'



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
         <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.FAQ} element={<Accordion />} />
         <Route path={ROUTES.CONSENT} element={<Consent />} />
         <Route path={ROUTES.VIDEO} element={<VideoConference />} />
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
