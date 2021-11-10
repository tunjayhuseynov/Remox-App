import { configureStore } from '@reduxjs/toolkit'
import Notification from './reducers/notificationSlice'
import Storage from './reducers/storage'
import { accountAPI } from './api/account'
import { customerAPI } from './api/customer'
import { teamAPI } from './api/team'
import { transactionAPI } from './api/transaction'
import { teamMemberAPI } from './api/teamMember'

const store = configureStore({
    reducer: {
        notification: Notification,
        storage: Storage,
        [accountAPI.reducerPath]: accountAPI.reducer,
        [customerAPI.reducerPath]: customerAPI.reducer,
        [teamAPI.reducerPath]: teamAPI.reducer,
        [teamMemberAPI.reducerPath]: teamMemberAPI.reducer,
        [transactionAPI.reducerPath]: transactionAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountAPI.middleware, customerAPI.middleware, transactionAPI.middleware, teamAPI.middleware, teamMemberAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;