import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../../utility/const'
import { GetBalanceResponse, SendCelo, SendCeloResponse, SendCusd, SendCusdResponse, SendMultipleTransaction } from '../../types/sdk'
import { RootState } from '../store';

export const transactionAPI = createApi({
    reducerPath: 'transactionAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).storage!.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBalance: builder.query<GetBalanceResponse, void>({
            query: () => ({
                url: '/transaction/balance',
            })
        }),

        sendCelo: builder.mutation<SendCeloResponse, SendCelo>({
            query: (data) => ({
                url: '/transaction/sendCelo',
                method: 'POST',
                body: data,
            })
        }),

        sendCUSD: builder.mutation<SendCusdResponse, SendCusd>({
            query: (data) => ({
                url: '/transaction/sendCUSD',
                method: 'POST',
                body: data,
            })
        }),

        sendMultipleTransactions: builder.mutation<void, SendMultipleTransaction>({
            query: (data) => ({
                url: '/transaction/multipleTran',
                method: 'POST',
                body: data,
            })
        })
    }),
})


export const { useGetBalanceQuery, useSendCeloMutation, useSendCUSDMutation, useSendMultipleTransactionsMutation } = transactionAPI