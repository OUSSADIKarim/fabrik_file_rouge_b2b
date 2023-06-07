import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LogProvider } from "./context/LoggedProvider"
import { AcessTokenProvider } from "./context/AccessTokenProvider"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

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
        <LogProvider>
          <AcessTokenProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AcessTokenProvider>
        </LogProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
