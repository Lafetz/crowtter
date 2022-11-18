import SignUP from "./SignUp/SignUp.js";
import Login from "./Login/Login.js";
import { HomePage } from "./HomePage/HomePage.js";
import { UsersProfile } from "./UsersProfile/UsersProfile.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext.js";
import { ProtectRoutes } from "./routesPr/ProtectRoute.js";
import { ChakraProvider } from "@chakra-ui/react";
import { Settings } from "./Settings/Settings.js";
import { ProfileOwner } from "./ProfileOwner/ProfileOwner.js";
import theme from "./theme.js";
function App() {
  return (
    <>
      <HashRouter basename="/">
        <ChakraProvider theme={theme}>
          <UserContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signUP" element={<SignUP />} />
              <Route path="/profile/:id" element={<UsersProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/userProfile" element={<ProfileOwner />} />
              <Route
                path="/HomePage"
                element={
                  <ProtectRoutes>
                    <HomePage />
                  </ProtectRoutes>
                }
              />
            </Routes>
          </UserContextProvider>
        </ChakraProvider>
      </HashRouter>
    </>
  );
}

export default App;
