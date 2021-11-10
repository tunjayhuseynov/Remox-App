import Dashboard from './pages/dashboard/index';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect
} from 'react-router-dom'
import Pay from './pages/dashboard/pay';
import Home from './pages/home';
import Create from './pages/create';
import { createContext, ReactNode, useEffect, useState } from 'react'
import Unlock from './pages/unlock';
import Import from './pages/import/index';
import { CustomContext } from './types/context'
import Teams from './pages/teams/index'
import Main from './pages/dashboard/main'
import { useSelector } from 'react-redux';
import { selectStorage } from './redux/reducers/storage';


export const Data = createContext<CustomContext>({
  unlock: false,
  data: undefined,
  setData: undefined,
  setUnlock: undefined,
})

function App(): JSX.Element {
  const storage = useSelector(selectStorage)

  const [data, setData] = useState<typeof storage>(storage)
  const [unlock, setUnlock] = useState<boolean>(false)

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

const CustomRouter = ({ unlock, data }: { unlock: boolean, data: any }) => {
  const router = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (router && data && unlock && location && location.pathname === '/') router.push('/dashboard')


  }, [unlock, router, data, location])

  const unlockChecking = (element: JSX.Element | Array<JSX.Element>) => {
    if (unlock) return element

    return <Redirect
      to={{
        pathname: "/unlock",
        state: { from: location }
      }}
    />
  }


  return <>
    <Route path="/" exact render={() => unlockChecking(<Home />)} />
    <Route path="/create" exact render={() => unlockChecking(<Create />)} />
    <Route path="/import" exact render={() => unlockChecking(<Import />)} />
    <AuthRouter data={data} unlockChecking={unlockChecking} />
  </>
}


const AuthRouter = ({ data, unlockChecking }: { data: any, unlockChecking: Function }) => {
  const router = useHistory();

  useEffect(() => {
    if (!data) router.push('/')
  }, [data, router])

  return <>
    <Route path={'/dashboard'} exact render={() => unlockChecking(<Dashboard ><Main /></Dashboard>)} />
    <Route path={'/dashboard/pay'} exact render={() => unlockChecking(<Pay />)} />
    <Route path={'/dashboard/teams'} exact render={() => unlockChecking(<Dashboard><Teams /></Dashboard>)} />
  </>

}

export default App;
