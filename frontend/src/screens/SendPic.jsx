import React from 'react'
import axios from "axios";
import unknownPic from '../pics/unknownPic.jpg'

const baseURL = "http://localhost:5000/sendPic/sendReceipt";

function SendPic() {

    const [post, setPost] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [image, setImage] = React.useState('');


      function sendPic() {
        let imageData = new FormData();
        imageData.append('file', { uri: unknownPic }); 

        axios
          .post(baseURL, {
            title: "Hello World!",
            pic: imageData ,
          })
          .then((response) => {
            
            setCount(count+1)
            setPost('   sent', count, 'times')
            setImage(response.data.image.data)
            console.log(response.data.image.data)
          });
      }
    


    return (
        <div className='sendPic'>

            <p>{JSON.stringify(image)}</p>

            <img src={JSON.stringify(image)} alt={JSON.stringify(image)}  />
            
            
            <button onClick={sendPic}>sendPic</button>

            
        </div>
    )
}

export default SendPic
