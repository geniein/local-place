import Blockmain from '@components/Blockmain';
import Navbar from '@components/Navbar';
import React from 'react';
import {Block} from '@typings/Block'
import useSWR from 'swr'
import fetcher from '@utils/fetcher';

const GenieBlock = () =>{

    const { data: blockData, error, revalidate, mutate } = useSWR<Block[]>('/api/blocks', fetcher, {
        dedupingInterval: 2000, // 2초
      });
    return (            
        <div>            
            <Navbar/>
            {blockData?.sort((a, b) => b.index - a.index ).map((val)=>{
                return <Blockmain key={val.index} index={val.index} previousHash={val.previousHash} hash={val.hash} timestamp={val.timestamp}/>
            })}
            {/* <Blockmain index={index} previousHash={preHash} hash={hash}/> */}
        </div>
    )
}

export default GenieBlock;