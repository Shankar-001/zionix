export const fetchMouserData = async (partNumber) => {
  return new Promise((res, rej) => {
    const mouserKey = '82675baf-9a58-4d5a-af3f-e3bbcf486560';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: 'ASP.NET_SessionId=puflpgr5kvy33c3h2s1opsxh; preferences=',
      },
      body: JSON.stringify({
        SearchByPartRequest: {
          mouserPartNumber: partNumber,
        },
      }),
    };

    fetch(
      `https://api.mouser.com/api/v1/search/partnumber?apiKey=${mouserKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => res(result))
      .catch((error) => rej(error));
  });
};

export const fetchRutronikData = async (partNumber) => {
  return new Promise((res, rej) => {
    const rutronikKey = 'cc6qyfg2yfis';
    const raw = '';

    const requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `https://www.rutronik24.com/api/article/?apikey=${rutronikKey}&mpn=${partNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => res(result))
      .catch((error) => rej(error));
  });
};
