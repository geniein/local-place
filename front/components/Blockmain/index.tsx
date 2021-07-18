import React, { FC } from 'react';
import { Block } from '@typings/Block'
import './styles.css'

const Blockmain:FC<Block> = ({index,previousHash,hash,timestamp}) =>{
    const time = (val:number) => new Date(val);
    return (     
        <div className="card">
            <div className="card-body-description">
            index : {index} <br/>
            preHash : {previousHash}<br/>
            hash : {hash}<br/>
            timestamp : {time(timestamp).toLocaleString()}<br/>
            </div>
        </div>
    )
}

export default Blockmain;