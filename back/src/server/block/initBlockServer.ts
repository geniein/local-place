import * as  bodyParser from 'body-parser';
import * as express from 'express';
import * as _ from 'lodash';
import {
    Block, generateNextBlock, getBlockchain
} from './blockchain';

const initBlockServer = (myHttpPort: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.use((err, req, res, next) => {
        if (err) {
            res.status(400).send(err.message);
        }
    });

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });

    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNextBlock();
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        } else {
            res.send(newBlock);
        }
    });

    //generate new block on every 10 seconds;
    setInterval(() => {
        generateNextBlock();
    }, 10000);
    //
    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

export default initBlockServer;