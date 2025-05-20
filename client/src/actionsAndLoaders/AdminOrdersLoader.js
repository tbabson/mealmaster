import customFetch from "../utils/customFetch";

export const adminOrdersQuery = (params) => {
    const { page, search, status, delivery, sort } = params;
    return {
        queryKey: [
            'adminOrders',
            page ?? 1,
            search ?? '',
            status ?? 'all',
            delivery ?? 'all',
            sort ?? 'latest',
        ],
        queryFn: async () => {
            try {
                const { data } = await customFetch.get('/orders', {
                    params: {
                        page: page ?? 1,
                        search: search ?? '',
                        status: status ?? 'all',
                        delivery: delivery ?? 'all',
                        sort: sort ?? 'latest'
                    }
                });

                if (!data) {
                    throw new Error('No data received from server');
                }

                return {
                    orders: data.orders || [],
                    totalOrders: data.totalOrders || 0,
                    numOfPages: data.numOfPages || 1
                };
            } catch (error) {
                throw new Error(error?.response?.data?.message || 'Failed to fetch orders');
            }
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 2
    };
};

export const loader = (queryClient) => async ({ request }) => {
    try {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);

        await queryClient.ensureQueryData(adminOrdersQuery(params));
        return { searchValues: { ...params } };
    } catch (error) {
        console.error('Error loading admin orders:', error);
        return { orders: [], searchValues: {} };
    }
};
