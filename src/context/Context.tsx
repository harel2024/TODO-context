import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState
  } from "react";
  import { Todo } from "../components/TodoList/TodoList";
  import axios from "axios";


  const BASE_URL = `${import.meta.env.VITE_API_URL}/Todos`;
  
  interface UserProviderProps {
    children: ReactNode;
  }
  
  interface ContextProps {

    isLoading : boolean,
    todos : Todo[],
    getTodo : ()=>void,
    addTodo : (title: string)=>void,
    deleteTodo : (id: string)=>void,
    toggleCompletion : (id: string)=>void

  }
  
  const UserContext = createContext<ContextProps>({
    isLoading : false,
    todos : [],
    getTodo : ()=>{},
    addTodo : ()=>{},
    deleteTodo : ()=>{},
    toggleCompletion : ()=>{},
  })



  
  
  const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
   

     
  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Todo[]>(BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("error featching data", error);
    } finally {
      setIsLoading(false);
    }
  };


  
  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (title: string): Promise<void> => {
    try {
    await axios.post<Todo>(BASE_URL, {
        title,
        completed: false,
      });
      getTodo();
    } catch (error) {
      console.error("cant add todo", error);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      getTodo();
    } catch (error) {
      console.error("cant delete todo", error);
    }
  };
  const toggleCompletion = async (id: string): Promise<void> => {
    try {
      const singleTodo: Todo | undefined = todos.find((todo) => todo.id === id);
      if (!singleTodo) {
        throw new Error("cant find todo with this id");
      }
      await axios.put<Todo>(`${BASE_URL}/${id}`, {
        ...singleTodo,
        completed: !singleTodo.completed,
      });
      getTodo();
    } catch (error) {
      console.error("cant toogle todo", error);
    }
  };

   return (
      <UserContext.Provider
        value={{
          isLoading,
          todos,
          getTodo,
          addTodo,
          deleteTodo,
          toggleCompletion

        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useGlobalUser = () => {
    return useContext(UserContext);
  };
  
  export { UserContext, UserProvider };