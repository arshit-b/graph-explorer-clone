import {User} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export const makeUserObject = (useName: string): User => {
	const address = uuidv4();
	return {
		name: useName,
		address: `0x-${address}`
	}
}
