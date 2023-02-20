export function makeFormData(obj) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        if (!value) return;
        else if (value instanceof File) formData.append(key, value, value.name);
        else formData.append(key, value);
    });
    return formData;
}
