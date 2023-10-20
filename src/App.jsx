import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { RouteProvider } from "./components/providers/router-provider";
import { UserProvider } from "./components/providers/user-provider";
import { ToastProvider } from "./components/providers/toast-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastProvider />
        <RouteProvider />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
