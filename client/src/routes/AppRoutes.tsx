import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import FormPage from '../pages/FormPage';
import ViewPage from '../pages/ViewPage';

const AppRoutes: React.FC = () => (
	<Routes>
		<Route path='/' element={<ListPage />} />
		<Route path='/create' element={<FormPage />} />
		<Route path='/edit/:id' element={<FormPage />} />
		<Route path='/view/:id' element={<ViewPage />} />
		<Route path='*' element={<Navigate to='/' replace />} />
	</Routes>
);

export default AppRoutes;
