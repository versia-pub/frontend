export const useSignedIn = () => {
    const tokenData = useTokenData();
    return computed(
        () => tokenData.value !== null && !!tokenData.value.access_token,
    );
};
