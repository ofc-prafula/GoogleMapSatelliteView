export const GoogleApi = (opts: any) => {
  opts = opts || {};
  const apiKey: any = opts.apiKey;
  const libraries: any = opts.libraries || [];
  const client: any = opts.client;
  const URL: string = "https://maps.googleapis.com/maps/api/js";
  const googleVersion: string = "quarterly";
  const channel: any = null;
  const language: any = null;
  const region: any = null;
  const url = () => {
    const baseurl = URL;
    const params = {
      key: apiKey,
      libraries: libraries.join(","),
      client,
      v: googleVersion,
      channel,
      language,
      region
    };
    const paramStr = Object.keys(params)
      .filter(k => !!(params as any)[k])
      .map(k => `${k}=${(params as any)[k]}`)
      .join("&");
    return `${baseurl}?${paramStr}`;
  };
  return url();
};

export default GoogleApi;
