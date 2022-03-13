const databaseStub = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
];

export const postController = async (request) => {
  if (request.method === 'GET') {
    const postId = request.url.split('/').pop();

    const postIdNumber = postId ? Number(postId) : -1;

    return postIdNumber > -1 ? findPostById(Number(postIdNumber)) : databaseStub;
  }

  const data = await readData(request);

  if (data.title === 'Bad Post') {
    throw new Error('Do not use words "Bad Post" in post title');
  }

  const post = upsertPost(data);

  return post;
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

function generateId() {
  return (
    databaseStub.reduce((acc, { id }) => {
      return acc > id ? acc : id;
    }, 0) + 1
  );
}

function upsertPost({ title, id }) {
  const existedPostIndex = databaseStub.findIndex((post) => post.id === id) ?? -1;

  if (existedPostIndex > -1) {
    databaseStub[existedPostIndex].title = title;
    return databaseStub[existedPostIndex];
  }

  const post = { title, id: generateId() };

  databaseStub.push(post);

  return post;
}

function findPostById(id) {
  return databaseStub.find((post) => post.id === id);
}
