export const fetchData = async (endpoint, params) => {
  const baseUrl = 'https://lemmy.ml/api/v3';
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';

  const res = await fetch(`${baseUrl}${endpoint}${queryParams}`);
  return await res.json();
};
