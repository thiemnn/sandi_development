import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));


const ProvidersInsert = lazy(() => import('./providers/Insert'));
const ProvidersEdit = lazy(() => import('./providers/Edit'));
const ProvidersList = lazy(() => import('./providers/List'));

const CustomersInsert = lazy(() => import('./customers/Insert'));
const CustomersEdit = lazy(() => import('./customers/Edit'));
const CustomersList = lazy(() => import('./customers/List'));

const EmployeesList = lazy(() => import('./employees/List'));

const MaterialsList = lazy(() => import('./categories/MaterialsList'));
const CommercialsList = lazy(() => import('./categories/CommercialsList'));
const ProductsList = lazy(() => import('./categories/ProductsList'));

const StocksList = lazy(() => import('./stocks/List'));
const StocksLayout = lazy(() => import('./stocks/Layout'));
const StocksInsertImport = lazy(() => import('./stocks/InsertImport'));
const StocksListImport = lazy(() => import('./stocks/ListImport'));
const StocksViewImport = lazy(() => import('./stocks/ViewImport'));
const StocksEditImport = lazy(() => import('./stocks/EditImport'));

const StocksInsertImportRequest = lazy(() => import('./stocks/InsertImportRequest'));
const StocksListImportRequest = lazy(() => import('./stocks/ListImportRequest'));
const StocksViewImportRequest = lazy(() => import('./stocks/ViewImportRequest'));
const StocksEditImportRequest = lazy(() => import('./stocks/EditImportRequest'));
const StocksCreateImport = lazy(() => import('./stocks/CreateImport'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./components/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />
          <Route path="/ncc/basic-elements" component={ BasicElements } />




          <Route path="/providers/insert" component={ ProvidersInsert } />
          <Route path="/providers/edit/:id" component={ ProvidersEdit } />
          <Route path="/providers/list" component={ ProvidersList } />
          <Route path="/customers/insert" component={ CustomersInsert } />
          <Route path="/customers/edit/:id" component={ CustomersEdit } />
          <Route path="/customers/list" component={ CustomersList } />
          <Route path="/employees/list" component={ EmployeesList } />
          <Route path="/categories/materials" component={ MaterialsList } />
          <Route path="/categories/commercials" component={ CommercialsList } />
          <Route path="/categories/products" component={ ProductsList } />
          <Route path="/stocks/list" component={ StocksList } />
          <Route path="/stocks/layout/:id" component={ StocksLayout } />

          <Route path="/stocks/insertImport" component={ StocksInsertImport } />
          <Route path="/stocks/listImport" component={ StocksListImport } />
          <Route path="/stocks/viewImport/:id" component={ StocksViewImport } />
          <Route path="/stocks/editImport/:id" component={ StocksEditImport } />

          <Route path="/stocks/insertImportRequest" component={ StocksInsertImportRequest } />
          <Route path="/stocks/listImportRequest" component={ StocksListImportRequest } />
          <Route path="/stocks/viewImportRequest/:id" component={ StocksViewImportRequest } />
          <Route path="/stocks/editImportRequest/:id" component={ StocksEditImportRequest } />
          <Route path="/stocks/createImport/:id" component={ StocksCreateImport } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />


          <Route path="/login" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;