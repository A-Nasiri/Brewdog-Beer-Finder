export default {
  get: jest.fn(() => {
    return new Promise(resolve => {
      process.nextTick(() => {
        resolve({
          data: [
            {
              name: 'AB:06',
              description:
                'This is the most amazing craft beer in the universe.',
              image_url: 'https://images.punkapi.com/v2/17.png',
              brewers_tips: 'Boil down to desired OG (about 17 litres).',
              ingredients: {
                hops: [
                  { name: 'Saaz' },
                  { name: 'Amarillo' },
                  { name: 'Saaz' }
                ],
                malt: [
                  { name: 'Munich' },
                  { name: 'Wheat' },
                  { name: 'Caramalt' },
                  { name: 'Amber' },
                  { name: 'Munich' }
                ],
                yeast: 'Saflager S189'
              }
            }
          ]
        })
      })
    })
  })
}
