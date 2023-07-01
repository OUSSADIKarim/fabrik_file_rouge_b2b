import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LogProvider } from "./context/LoggedProvider"
import { AccessTokenProvider } from "./context/AccessTokenProvider"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { ThemProvider } from "./context/themeProvider"
import NotFound from "./pages/NotFound"
import MainLayout from "./layouts/mainLayout"
import { Messaging } from "./pages/Messaging"
import Notifications from "./pages/Notifications"
import Feed from "./pages/Feed"
import UserLayout from "./layouts/UserLayout"
import Post from "./pages/Post"
import { Suspense } from "react"
import Loading from "./components/Loading"
import { ErrorBoundary } from "react-error-boundary"
import Error from "./components/Error"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
        suspense: true,
      },
    },
  })
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
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
                    <Route element={<UserLayout />}>
                      <Route path="/feed" element={<Feed />} />
                      <Route path="/feed/:postId" element={<Post />} />
                      <Route path="/messaging" element={<Messaging />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                    </Route>
                  </Routes>
                </ThemProvider>
              </LogProvider>
            </AccessTokenProvider>
          </Router>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
