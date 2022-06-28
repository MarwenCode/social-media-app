
import { format } from "timeago.js";

export default function Comment({comment}) {
  return (
    <div >

      <div className="messageTop">
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText">{comment.text}</p>
        <p className="messageText">{comment.sender}</p>
        <p className="messageText">{comment.commentboxId}</p>
      </div>
      <div className="messageBottom">{format(comment.createdAt)}</div>
    </div>
  );
}