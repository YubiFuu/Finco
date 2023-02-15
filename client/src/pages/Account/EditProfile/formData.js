export function makeFormData(obj) {
  const formData = new FormData();
  // fill in data, Note File can be image, video, pdf, ... (any file)
  Object.entries(obj).forEach(([key, value]) => {
    if (!value) return;
    else if (value instanceof File) formData.append(key, value, value.name);
    else formData.append(key, value);
  });
  return formData;
}
