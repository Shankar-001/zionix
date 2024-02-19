export const fetchMouserData = async (partNumber) => {
  return new Promise((res, rej) => {
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
      `https://api.mouser.com/api/v1/search/partnumber?apiKey=${process.env.REACT_APP_MOUSER_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => res(result))
      .catch((error) => rej(error));
  });
};

export const fetchRutronikData = async (partNumber) => {
  return new Promise((res, rej) => {
    const raw = '';

    const requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `/api/article/?apikey=${process.env.REACT_APP_RUTRONIK_KEY}&mpn=${partNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => res(result))
      .catch((error) => rej(error));
  });
};
