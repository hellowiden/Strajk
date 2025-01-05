import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    async ({ request }) => {
      const body = await request.json();
      const { when, lanes, people, shoes } = body;

      const price = parseInt(lanes) * 100 + parseInt(people) * 120;
      const confirmation = {
        id: 'STR1047MEFI',
        price: price.toString(),
        active: true,
        when,
        lanes,
        people,
        shoes,
      };

      return HttpResponse.json(confirmation);
    }
  ),
];
