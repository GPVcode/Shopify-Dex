import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from "./Pages/Dashboard.jsx";

// Initialize a Query Client instance:
// The Query Client is a powerful data fetching and caching tool provided by React Query.
// It manages the fetching, caching, synchronizing, and updating of your server state.
// This single instance is used throughout the app to enable these features.
const queryClient = new QueryClient();

function App() {
  return (
    // Wrap the entire application with QueryClientProvider and pass the Query Client instance.
    // This makes the Query Client available throughout the app, allowing any component
    // to use React Query's hooks for data fetching and state management.
    <QueryClientProvider client={queryClient}>
      < Dashboard />
    </QueryClientProvider>
    );
}

export default App;
