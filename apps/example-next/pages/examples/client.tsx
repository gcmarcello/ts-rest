import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../_app';
import { clientExpress } from '../../api';

export const Index = () => {
  const { data, isLoading } = useQuery([`posts`], () =>
    clientExpress.posts.getPosts({ query: {} })
  );

  const handleUpdatePost = async (id: string) => {
    await clientExpress.posts.updatePost({
      params: {
        id,
      },
      body: {
        title: 'New Title',
        content: 'New Content',
        description: 'Updated description',
      },
    });

    queryClient.refetchQueries([`posts`]);
  };

  const handleDeletePost = async (id: string) => {
    await clientExpress.posts.deletePost({
      params: {
        id,
      },
      body: {},
    });

    queryClient.refetchQueries([`posts`]);
  };

  const handleCreatePost = async () => {
    await clientExpress.posts.createPost({
      body: {
        title: 'New Title',
        content: 'New Content',
        description: 'New post description',
        authorId: 'cl61gznu7000109la4ngq97zk',
      },
    });

    queryClient.refetchQueries([`posts`]);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.data.map((post) => (
            <div key={post.id} className="bg-gray-100">
              <h3 className="text-lg">{post.title}</h3>
              <p>{post.description}</p>
              <button onClick={() => handleUpdatePost(post.id)}>Update</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCreatePost}>Create</button>
    </div>
  );
};

export default Index;