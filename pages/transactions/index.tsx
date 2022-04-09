import Layout from '../../components/Layout'
import {useLazyQuery} from '@apollo/client'
import {useSession} from 'next-auth/react'
import {User} from '../../services/models/User'
import NotAuthorised from '../../components/NotAuthorised'
import React, {useEffect} from 'react'
import {TransactionsListQuery} from '../../services/graphql/queries'
import moment from "moment";

const type_to_str = (type) => {
    switch (type) {
        case 'TOP_UP':
            return 'Doładowanie portmonetki';
        case 'SINGLE_RIDE':
            return 'Kupno biletu'
        case 'PAY_AS_YOU_GO':
            return 'Nieznany'
        case 'REFUND':
            return 'Cashback'
        default:
            return 'Nieznany'
    }
}


const TransactionListItem = ({transaction}) => {
    const {
        type,
        amount,
        createdAt
    } = transaction

    let date = moment(createdAt).format('DD.MM.YYYY HH:mm')

    return (
        <div className="bg-gray-100 rounded-lg flex justify-between items-center p-4">
            <div className="flex flex-grow align-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">
                        <span className="font-normal">Wartość:</span> {amount.toFixed(2)}{' '}zł
                    </h1>
                    <h4 className="text-gray-600 font-light">
                        {type_to_str(type)}
                    </h4>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <span className="font-medium">{date}</span>
                </div>
            </div>
        </div>
    )
}


const Index = () => {
    const {data: session, status} = useSession()
    const loading = status === 'loading'

    const [fetchTransactions, transactions] = useLazyQuery(TransactionsListQuery)

    useEffect(() => {
        // @ts-ignore
        if (session && session.user.id) {
            // @ts-ignore
            fetchTransactions({variables: {userId: session.user.id}})
        }
    }, [fetchTransactions, session])

    if (loading || transactions.loading) {
        return <></>
    }

    if (!session) {
        return <NotAuthorised/>
    }

    return (
        <Layout user={session.user as User}>
            <main className="pt-4 px-4">
                <h1 className="font-bold text-3xl">Historia transakcji</h1>
                <div className="space-y-2 flex-col mt-4">
                    {transactions.data && transactions.data.transactions.map((transaction) => {
                        return <TransactionListItem transaction={transaction} key={transaction.id}/>
                    })}
                </div>
            </main>
        </Layout>
    )
}

export default Index
