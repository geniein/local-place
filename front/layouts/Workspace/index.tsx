import Blockmain from '@components/Blockmain';
import Navbar from '@components/Navbar';
import React from 'react';

const Workplace = () =>{
    const index = 1 
    const preHash = '91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627'
    const hash = '3537a7fad9c0af1c34d4898002f00cb4b46a14ba5bd841a362d3fa6c54af9a3a'
    const timestamp = '2021-07-17 13:01'
    return (
        <div>
            <Navbar/>  
            {/* <Blockmain index={index} previousHash={preHash} hash={hash}/>           */}
        </div>        
    )
}

export default Workplace;