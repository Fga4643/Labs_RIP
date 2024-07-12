import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import SparePage from "./Pages/SparePage/SparePage";
import SparesList from "./Pages/SparesListPage/SparesList";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import {useAuth} from "./hooks/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import {QueryClient, QueryClientProvider } from "react-query";

const TopPanelWrapper = () => {
    const {is_authenticated} = useAuth()
    const location = useLocation()

    return (
        <div className="top-panels-wrapper">
            <Breadcrumbs />
            {is_authenticated && location.pathname.includes("spares") && <OrderConstructor /> }
        </div>
    )
}



function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

            <BrowserRouter basename="/aviashop">

                <div className="App">

                    <div className="wrapper">

                        <Header />

                        <div className={"content-wrapper"}>

                            <TopPanelWrapper />

                            <Routes>

                                <Route path="/" element={<Navigate to="/spares" replace />} />

                                <Route path="/spares" element={<SparesList />} />

                                <Route path="/spares/:id" element={<SparePage  />} />

                                <Route path="/orders" element={<OrdersPage />} />

                                <Route path="/orders/draft" element={<OrderPage />} />

                                <Route path="/profile" element={<ProfilePage />} />

                                <Route path="/login" element={<LoginPage />} />

                                <Route path="/register" element={<RegisterPage />} />

                            </Routes>

                        </div>

                    </div>

                </div>

            </BrowserRouter>

        </Provider>

        </QueryClientProvider>
    )
}

export default App
