import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const Home = () => {
  const {user} = useContext(AuthContext);
  console.log({user})
  return (
    <div>Home</div>
  )
}
export default Home