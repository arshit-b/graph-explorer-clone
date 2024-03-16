import React, {createContext, useContext, useState} from 'react';
import {User} from 'src/types';

type DataProvider = {
	userList: User[];
	registerNewUser: (user: User) => void;
};

const Context = createContext<DataProvider | null>(null);
const DataProvider = ({children}: React.PropsWithChildren) => {
	const [userList, setUseList] = useState<User[]>([]);

	const registerNewUser = (user: User) => {
		setUseList((prevUserList) => [user, ...prevUserList]);
	}
	return (
		<Context.Provider value={{userList, registerNewUser}}>
			{children}
		</Context.Provider>
	);
}

export const useData = () => {
	const value = useContext(Context)
	if (!value) {
		throw new Error('Can not access data outside DataProvider');
	}
	return value;
}

export default DataProvider;
