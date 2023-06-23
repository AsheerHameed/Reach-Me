import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import './messaging.css'
const ChatsPage = (props) => {
  const chatProps = useMultiChatLogic(
    "0e25ab68-b428-4d9a-aca8-d9a5179f7b3e",
    props.user.username,
    props.user.secret
  );
  return (
    <div style={{ height: "100vh" ,fontFamily: 'Rubik' ,background:"red"}} >
      <MultiChatSocket {...chatProps} style={{ height: "100%",fontFamily:"Rubik" }} />
      <MultiChatWindow {...chatProps} style={{ height: "100%" }} />
    </div>
  );
};

export default ChatsPage;
