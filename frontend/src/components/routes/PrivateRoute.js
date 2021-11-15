import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoutes from './AdminRoutes'


const PrivateRoute = ({ path, element, isAdmin }) => {
    console.log(isAdmin);
    return (
        <>

            <Routes>
                {isAdmin ? <Route
                    path={path}
                    element={
                        <ProtectedRoute>
                            {element}
                        </ProtectedRoute>
                    }
                /> : <Route
                    path={path}
                    element={
                        <AdminRoutes>
                            {element}
                        </AdminRoutes>
                    }
                />}
            </Routes>

        </>
    )
}

export default PrivateRoute
