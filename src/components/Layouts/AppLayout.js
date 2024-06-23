/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/Layout/AppLayout.js
 * PROGRAM NAME   : AppLayout.js
 *                : コンポーネント：アプリケーションレイアウト
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import Navigation from '@/components/Layouts/Navigation';
import { useAuth } from '@/hooks/auth';

const AppLayout = ({ header, children }) => {

  const { user } = useAuth({ middleware: 'auth' })


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <div className="min-h-screen bg-gray-100">

      <Navigation user={user} />

      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

    </div>
  )
}

export default AppLayout;
