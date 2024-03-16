import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppLayout from 'src/components/AppLayout';

type Props = {};
const AppRoutes = (props: Props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout/>}>
					<Route path="/" element={<p className={'text-black'}>home</p>} />
					<Route path="/0x" element={<></>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
