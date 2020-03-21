const messages = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    from: "sipsimonsteri",
    text: "Hello World",
    type: "Point",
    coordinates: [25.7629885710776, 62.2385861931416],
    created: "2020-03-21T18:36:38.663Z",
  },
  {
    id: "e534670f1ee-6c54-4b01-90e6-d701748f0853",
    from: "lauriskauris",
    text: "Hello World",
    type: "Point",
    coordinates: [25.7643105987017, 62.2407502069861],
    created: "2020-03-21T18:36:38.663Z",
  },
]

export const getMessages = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(messages)
    }, 1000)
  })
}

export const createMessage = async newMessage => {
  const message = {
    id: Date.now(),
    created: new Date().toISOString(),
    ...newMessage,
  }
  messages.push(message)

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message)
    }, 1000)
  })
}
