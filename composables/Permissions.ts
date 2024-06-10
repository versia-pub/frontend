export const usePermissions = () => {
    const identity = useCurrentIdentity();

    return computed(() => identity.value?.permissions ?? []);
};
