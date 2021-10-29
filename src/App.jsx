import Dashboard from './pages/dashboard/index';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'
import Pay from './pages/dashboard/pay';
import Home from './pages/home';
import Create from './pages/create';
import { createContext, useEffect, useState } from 'react'
import Unlock from './pages/unlock';
import Import from './pages/import/index';

export const Data = createContext({})

function App() {
  const [data, setData] = useState(null)
  const [unlock, setUnlock] = useState(false)
  useEffect(() => {
    const val = localStorage.getItem("user")
    if (val) {
      setData(JSON.parse(val))
    } else setData(undefined)
  }, [])

  return (
    <Data.Provider value={{ data, setData, setUnlock, unlock }}>
      <div className="App min-h-screen w-full">
        <Router>
          <Switch>
            <Route path="/unlock" exact >
              <Unlock setUnlock={setUnlock} unlock={unlock} />
            </Route>
            <CustomRouter unlock={unlock} data={data} />
          </Switch>
        </Router>
      </div>
    </Data.Provider>
  );
}

const CustomRouter = ({ unlock, data }) => {
  const router = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (router && data && !unlock) router.push('/unlock')
    else if (router && data && unlock && location && location.pathname === '/') router.push('/dashboard')


  }, [unlock, router, data, location])


  return <>
    <Route path="/" exact >
      <Home />
    </Route>
    <Route path="/create" exact>
      <Create />
    </Route>
    <Route path="/import" exact>
      <Import />
    </Route>
    <AuthRouter data={data}/>
  </>
}


const AuthRouter = ({data}) => {
  const router = useHistory();

  useEffect(() => {
    if(!data) router.push('/')
  },[data, router])

  return <>
    <Route path={'/dashboard'} exact>
      <Dashboard />
    </Route>
    <Route path={'/dashboard/pay'} exact>
      <Pay />
    </Route>
  </>

}

export default App;
