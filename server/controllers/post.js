const databaseStub = [
  { title: 'Post 1' },
  { title: 'Post 2' },
  { title: 'Post 3' },
  { title: 'Post 4' },
  { title: 'Post 5' },
];

export const postController = async (request) => {
  if (request.method === 'GET') {
    return databaseStub;
  }

  const data = await readData(request);
  const newPost = { ...data };

  databaseStub.push(newPost);

  return newPost;
};

// utils

const readData = async (request) => {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  return JSON.parse(data);
};
