export const usePermissions = () => {
    return computed(() => identity.value?.permissions ?? []);
};
