import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function NotAuthorised(props) {
  return (
    <main className="bg-gray-200 min-h-screen">

      <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="layout">
          <div className="flex justify-center mt-8 text-center">
            <div>
              <Image src={'/bus.png'} width={300} height={187} />
            </div>

          </div>
          <div className="flex-auto">

            <div className="text-lg mb-2">You are not logged in!</div>
            <button className="btn-green" onClick={() => signIn()}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
