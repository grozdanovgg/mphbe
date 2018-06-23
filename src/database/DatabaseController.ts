import repo from './repository';
import IUser from '../components/User/IUser';
import { WriteResult } from '@google-cloud/firestore';
import User from '../components/User/User';
import Token from '../components/Token/Token';
import Pool from '../components/Pool/Pool';
import IPool from '../components/Pool/IPool';

export async function addUserToDB(user: IUser): Promise<WriteResult> {
    return await repo.setDocInCol('users', user.name, user);
}

export async function getUserFromDB(username: string): Promise<User> {
    const userDoc: Document = await repo.getDocInCol('users', username);

    return <User>userDoc;
}




export async function addTokenToDb(username: string, token: Token): Promise<WriteResult> {
    return await repo.setDocInSubcol('users', username, 'tokens', token.name, token);
}

export async function getTokensFromDB(username: string): Promise<Token[]> {
    const tokensDocs: Document[] = await repo.getSubcolOfDoc('users', username, 'tokens');
    const tokens: Token[] = <Token[]>tokensDocs;

    return tokens;
}




export async function addPool(username: string, tokenName: string, pool: Pool): Promise<WriteResult> {
    return await repo.setDocInSubcolofSubcol('users', username, 'tokens', tokenName, 'pools', pool.name, pool);
}

export async function getPools(username: string, tokenName: string): Promise<Pool[]> {
    const poolsDocs: IPool[] =
        await repo.getSubcolOfDocOfSubcol('users', username, 'tokens', tokenName, 'pools') as IPool[];
    const pools: Pool[] = [];

    for (let poolDoc of poolsDocs) {
        pools.push(new Pool(
            poolDoc.name,
            poolDoc.tokenName,
            poolDoc.blocksUrl,
            poolDoc.tokenUrl,
            poolDoc.blockHtmlSelector,
            poolDoc.hashrateHtmlSelector,
            poolDoc.isPoolBase
        ))
    }

    return pools;
}

