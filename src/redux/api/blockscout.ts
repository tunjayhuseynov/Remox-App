import { createApi } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'
import { BlockScoutNode } from '../../types/sdk'

const graphqlBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
        async ({ body }: { body: string }) => {
            try {
                const result = await request(baseUrl, body)
                return { data: result }
            } catch (error) {
                if (error instanceof ClientError) {
                    return { error: { status: error.response.status, data: error } }
                }
                return { error: { status: 500, data: error } }
            }
        }

export const BlockScoutApi = createApi({
    baseQuery: graphqlBaseQuery({
        baseUrl: 'https://explorer.celo.org/graphiql',
    }),
    endpoints: (builder) => ({
        getTransactions: builder.query<BlockScoutNode[], {address: string, take: number}>({
            query: (data) => ({
                body: gql`
        query RootQueryType {
            transferTxs(addressHash: "${data.address}", first: ${data.take}) {
              edges {
                node {
                  transactionHash
                  gatewayFeeRecipient
                  gatewayFee
                  gasUsed
                  gasPrice
                  feeToken
                  celoTransfer(first: 10) {
                    edges {
                      node {
                        blockNumber
                        gasUsed
                        gasPrice
                        toAddressHash
                        transactionHash
                        value
                        fromAddressHash
                      }
                    }
                  }
                  timestamp
                  blockNumber
                }
              }
            }
          }
        `,
            }),
            transformResponse: (response) => response.transferTxs.edges,
        }),
    }),
})

export const { useLazyGetTransactionsQuery, useGetTransactionsQuery } = BlockScoutApi;
