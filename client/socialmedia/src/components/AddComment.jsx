// import React from 'react'
// import { useState } from 'react'

// const AddComment = ({addComment}) => {
//     const [text, setText] = useState("");

//       const onSubmit =(e) => {
//       e.preventDefault()

//       if(!text) {
//           alert('Please Add a task')
//           return
//       }

//       addComment({text})
      
//       setText("");
    
   
//     }
//   return (
//     <div> 
//       <form   onSubmit={onSubmit}>

//       <input
//             placeholder="add comment"
//             className=""
//             // ref={desc}
//             value={text}
//             onChange={e => setText(e.target.value)} 
           
//           />
//           <button type="submit"  >Add</button>
//           <div className="commentField">{text}</div>


//       </form>

//       {/* <AddComment /> */}


//       </div>
   
    
//   )
// }

// export default AddComment
