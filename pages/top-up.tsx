import Layout from '../components/Layout'
import Modal from 'react-modal'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import React, { useEffect } from 'react'
import {
  TransactionCreateMutation,
  UpdateBalanceMutation,
} from '../services/graphql/mutations'
import { UserQuery } from '../services/graphql/queries'
import { useRouter } from 'next/router'

const TopUp = () => {
  const [value, setValue] = React.useState(null)
  const [showModal, setShowModal] = React.useState(false)

  const { data: session, status } = useSession()

  const [fetchUserData, userData] = useLazyQuery(UserQuery)

  const router = useRouter()

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchUserData({ variables: { userId: session.user.id } })
    }
  }, [fetchUserData, session])

  const [topUp, { data, loading, error }] = useMutation(UpdateBalanceMutation)
  const [createTransaction, { data: tData, loading: tLoading, error: tError }] =
    useMutation(TransactionCreateMutation)
  if (loading || tLoading) {
    return <></>
  }

  if (!session) {
    return <NotAuthorised />
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  if (tError) {
    return <div>Error! {tError.message}</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleModalShow(e)
    topUp({
      variables: {
        amount: Number(value),
        id: userData.data.user.id,
      },
    }).then(() => {
      createTransaction({
        variables: {
          amount: Number(value),
          userId: userData.data.user.id,
          type: 'TOP_UP',
        },
      })
    })
  }

  const handleModalShow = (e) => {
    e.preventDefault()
    setShowModal(true)
    setTimeout(() => {
      // router.push('/');
    }, 5000)
  }

  const handleModalClose = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Doładuj swoją portmonetkę
          </h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="flex flex-row max-w-lg space-x-4 mx-4">
            <input
              type="number"
              placeholder="Wpisz kwotę doładowania"
              className="input input-bordered w-full max-w-xs"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <button onClick={handleSubmit} className="btn btn-primary">
              Doładuj
            </button>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalClose}
            >
              <div>
                <h2>Doładowano konto za kwotę {value}zł</h2>
              </div>
            </Modal>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default TopUp
