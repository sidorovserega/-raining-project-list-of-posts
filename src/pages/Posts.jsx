import React, {useEffect, useState} from 'react'; 
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/UI/postFilter/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal'
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../components/hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../components/hooks/useFetching';
import { getPagesCount } from '../components/utils/pages';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

//загружает посты с сервера черезсозданный  хук и созданый сервис  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalPages = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalPages, limit));
  });
  
//хук отрабатывает при загрузке страницы, используя созданный хук
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);
//создание поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);    
  }
//удаление поста
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }
//обновление номера страницы и вывод нужной страницы
  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading 
      ?
        <div className="mainLoader">
          <Loader/>
        </div>
      : 
       <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Посты про JS'}/> 
      }
      <Pagination 
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;