import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "./context/store";
import ResetCss from "./styles/ResetCss";
import GlobalStyle from "./styles/GlobalStyles";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import CustomerCreate from "./pages/customers/CustomerCreate";
import CustomersImport from "./pages/customers/CustomersImport";
import Appointments from "./pages/appointments/Appointments";
import AppointmentCreate from "./pages/appointments/AppointmentCreate";
import SignIn from "./pages/signin/Signin";

const App = () => {
  return (
    <>
      <ResetCss />
      <GlobalStyle />
      <Provider store={store}>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/" element={<AuthLayout />}>
                <Route path="signin" element={<SignIn />} />
              </Route>
              <Route path="/" element={<DashboardLayout full={true} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="customers/new" element={<CustomerCreate />} />
                <Route path="customers/import" element={<CustomersImport />} />
                <Route
                  path="appointments/new"
                  element={<AppointmentCreate />}
                />
              </Route>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="customers" element={<Customers />} />
                <Route path="appointments" element={<Appointments />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </Provider>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
