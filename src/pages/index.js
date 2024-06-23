/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/index.js
 * PROGRAM NAME   : index.js
 *                : 画面：Top画面
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <>
      <Head>
        <title>movie-app</title>
      </Head>

      <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
          {user ? (
            <Link
              href="/home"
              className="ml-4 text-sm text-gray-700 underline">
              Home
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-700 underline">
                ログイン
              </Link>

              <Link
                href="/register"
                className="ml-4 text-sm text-gray-700 underline">
                登録
              </Link>
            </>
          )}
        </div>

        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
            <img src="/image/lifetop.png" alt="Life Image" />
          </div>
        </div>
      </div>
    </>
  )
}

