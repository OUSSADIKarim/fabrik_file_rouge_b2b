import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LogProvider } from "./context/LoggedProvider"
import { AccessTokenProvider } from "./context/AccessTokenProvider"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { ThemProvider } from "./context/themeProvider"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"
import MainLayout from "./layouts/mainLayout"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AccessTokenProvider>
          <LogProvider>
            <ThemProvider>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </ThemProvider>
          </LogProvider>
        </AccessTokenProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
