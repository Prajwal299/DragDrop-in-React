import UserHeaderNav from "./UserHeaderNav";
import { useLocation } from "react-router-dom";
import ListCreatot from "./ListCreator";
import TaskView from "./TaskView";
import Lists from "./Lists"
import GetList from "./GetList";
export function User() {
  const location = useLocation();
  const username = location.state?.username;
  return (
    <div>
      <div>
        <UserHeaderNav username={username} />
      </div>
      {/* <ListCreatot />
      <TaskView /> */}
<Lists />
{/* <GetList /> */}
    </div>
  );
}
export default User;
