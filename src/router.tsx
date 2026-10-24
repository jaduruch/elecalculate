import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
export function getRouter() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: 30000, retry: false } },
	});
	return createRouter({
		routeTree,
		trailingSlash: "always",
		scrollRestoration: true,
		defaultPreload: "intent",
		Wrap: ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		),
	});
}
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
