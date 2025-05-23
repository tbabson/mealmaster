import customFetch from "../utils/customFetch";

export const adminUsersQuery = (params) => {
    const { page = 1, search = '', role = 'all', sort = 'newest' } = params;
    return {
        queryKey: [
            'adminUsers',
            page,
            search,
            role,
            sort
        ],
        queryFn: async () => {
            try {
                const { data } = await customFetch.get('/users', {
                    params: {
                        page,
                        ...(search && { search }),
                        ...(role !== 'all' && { role }),
                        sort
                    }
                });

                if (!data) {
                    throw new Error('No data received from server');
                }

                return {
                    users: data.users || [],
                    totalUsers: data.totalUsers || 0,
                    numOfPages: data.numOfPages || 1,
                    currentPage: data.currentPage || 1
                };
            } catch (error) {
                throw new Error(error?.response?.data?.message || 'Failed to fetch users');
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

        await queryClient.ensureQueryData(adminUsersQuery(params));
        return { searchValues: { ...params } };
    } catch (error) {
        console.error('Error loading admin users:', error);
        return { users: [], searchValues: {} };
    }
};
