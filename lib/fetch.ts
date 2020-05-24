const fetchAndRetry = (url: string): Promise<Response> =>
  fetch(url).then((response) => {
    if (response.status > 400) {
      console.log(`Response was ${response.status} for ${url}, retrying...`);
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        fetchAndRetry(url)
      );
    }
    return response;
  });

export default fetchAndRetry;
