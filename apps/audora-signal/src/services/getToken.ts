export const getToken = (url: string) => {
  const queryParams = new URLSearchParams(url?.split("?")[1]);
  const token = queryParams.get("token") || "";

  return token;
};
