import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function NotAuthorised(props) {
  return (
    <main className="relative bg-gray-200 min-h-screen">

      <div className=" max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="layout">
          <div className="flex flex-col justify-center mt-4 text-center z-10">
            <div>
              <Image src={'/bus.png'} width={300} height={187} />
            </div>
            <div className="text-xl mb-6">Witaj w naszej aplikacji!</div>
            <button className="btn btn-green self-center" onClick={() => signIn()}>
              Zaloguj się
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-4 z-1">
          <div className="p-5 bg-blue-300 w-80 h-24 rounded"></div>
        </div>
      </div>
    </main>
  )
}
