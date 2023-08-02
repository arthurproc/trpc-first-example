import { useState } from 'react'
import './App.css'
import HelloSemTRPC from './components/hello-sem-trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';
import HelloComTRPC from './components/hello-com-trpc';
import TodoList from './components/todo-list';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        })
      ],
    })
  );

  return (
    <div>
      <HelloSemTRPC />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <HelloComTRPC />
          <TodoList />
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}

export default App
