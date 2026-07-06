import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './styles.css'

// Import the route tree
import { routeTree } from './routeTree.gen'

// Create a client
const queryClient = new QueryClient()

// Create a router instance
const router = createRouter({ 
  routeTree,
  context: { queryClient }
})

// Register the router for TypeScript type inference
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
