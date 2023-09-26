const VerifyPage = () => {
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <div className="text-center bg-white py-6 px-6 sm:py-32 lg:px-8">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Please verify your email!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Check your email, and verify your email address.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default VerifyPage;