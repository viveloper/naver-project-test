const API_ENDPOINT =
  'https://c87465p3he.execute-api.ap-northeast-2.amazonaws.com/dev/api';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

export const fetchRecommendedMovies = async () => {
  try {
    const result = await request(`${API_ENDPOINT}/recommended-movies`);
    return {
      isError: false,
      data: result,
    };
  } catch (e) {
    return {
      isError: true,
      data: e,
    };
  }
};

export const fetchMovies = async (ids) => {
  const strIds = ids.join(',');
  try {
    const result = await request(`${API_ENDPOINT}/movies-by-ids?ids=${strIds}`);
    return {
      isError: false,
      data: result,
    };
  } catch (e) {
    return {
      isError: true,
      data: e,
    };
  }
};

export const fetchMovie = async (id) => {
  try {
    const result = await request(`${API_ENDPOINT}/movies/${id}`);
    return {
      isError: false,
      data: result,
    };
  } catch (e) {
    return {
      isError: true,
      data: e,
    };
  }
};
