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
import { useEffect } from 'react'
import Unlock from './pages/unlock';
import Import from './pages/import/index';
import Teams from './pages/teams/index'
import Main from './pages/dashboard/main'
import Transactions from './pages/transactions/transactions'
import { IStorage, selectStorage } from './redux/reducers/storage';
import { selectUnlock } from './redux/reducers/unlock';
import { useAppSelector } from './redux/hooks';


function App(): JSX.Element {
  const storage = useAppSelector(selectStorage)
  const unlock = useAppSelector(selectUnlock)

  return (
    <div className="App min-h-screen w-full">
      <Router>
        <Switch>
          <Route path="/unlock" exact >
            <Unlock />
          </Route>
          <CustomRouter unlock={unlock} data={storage} />
        </Switch>
      </Router>
    </div>
  );
}

const CustomRouter = ({ unlock, data }: { unlock: boolean, data: IStorage | null}) => {
  const router = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (router && data && unlock && location && location.pathname === '/') router.push('/dashboard')
  }, [unlock, router, data, location])

  const unlockChecking = (element: JSX.Element | Array<JSX.Element>) => {
    if (unlock) return element
    if((location.pathname === '/create' || location.pathname === '/import' || location.pathname === '/') && !data?.accountAddress) return element

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
    <Route path={'/dashboard/transactions'} exact render={() => unlockChecking(<Dashboard><Transactions /></Dashboard>)} />
  </>
}

export default App;
