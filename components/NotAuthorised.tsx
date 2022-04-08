import { signIn } from "next-auth/react";

export default function NotAuthorised(props) {
  return (
    <main className="bg-gray-200 shadow">
      <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="layout">
          <div className="flex justify-center mt-8 text-center">
            <div className="flex-auto">
              <div className="text-lg mb-2">You are not logged in!</div>
              <button className="btn-green" onClick={() => signIn()}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
