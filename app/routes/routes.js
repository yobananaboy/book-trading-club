import App from '../component/App';
import { AllBooks } from '../component/Books/AllBooks';
import { UserBooks } from '../component/Books/UserBooks';
import { AvailableBooks } from '../component/Books/AvailableBooks';
import SettingsPage from '../component/Users/SettingsPage';
import LoginPage from '../component/Users/LoginPage';
import SignupPage from '../component/Users/SignupPage';
import { Error404 } from '../component/Error404';

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: AllBooks
      },
      { path: '/books/all',
        exact: true,
        component: AllBooks
      },
      { path: '/books/available',
        exact: true,
        component: AvailableBooks
      },
      {
        path: '/user/books',
        exact: true,
        component: UserBooks
      },
      {
         path: '/user/settings',
         exact: true,
         component: SettingsPage
      },
      {
        path: '/login',
        exact: true,
        component: LoginPage
      },
      {
        path: '/signup',
        exact: true,
        component: SignupPage
      },
      {
        path: '*',
        component: Error404
      }
    ]
  }
];

export default routes;