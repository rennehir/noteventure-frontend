import axios from "axios"

const BASE_URL = "https://sheltered-waters-19420.herokuapp.com"

const messages = [{
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    from: "sipsimonsteri",
    text: "Hello World",
    location: {
      type: "Point",
      coordinates: [25.7629885710776, 62.2385861931416],
    },
    created: "2020-03-21T18:36:38.663Z",
  },
  {
    id: "e534670f1ee-6c54-4b01-90e6-d701748f0853",
    from: "lauriskauris",
    text: "Hello World",
    location: {
      type: "Point",
      coordinates: [25.7643105987017, 62.2407502069861],
    },
    created: "2020-03-21T18:36:38.663Z",
  },
]

export const getMessages = async () => {
  const path = `${BASE_URL}/messages`
  const {
    data
  } = await axios.get(path)
  return data.messages

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(messages)
  //   }, 1000)
  // })
}

export const createMessage = async ({
  from,
  text,
  coordinates
}) => {
  const message = {
    from,
    text,
    location: {
      type: "Point",
      coordinates,
    },
  }

  const path = `${BASE_URL}/messages`
  const {
    data
  } = await axios.post(path, {
    from,
    text,
    location: {
      type: "Point",
      coordinates,
    }
  })
  return data

  // messages.push(message)
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(message)
  //   }, 1000)
  // })
}