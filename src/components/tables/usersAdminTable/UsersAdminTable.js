import React from 'react'
import './UsersAdminTable.css'

function UsersAminTable(props) {
    const { users, openAdminModal, deleteAdminHandler} = props
    return (
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => 
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'True' : 'False'}</td>
                            <td>
                                {user.name === 'Octavius' ? 'Principal' :
                                    <button className="button" onClick={() => deleteAdminHandler(user._id)}>Delete</button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UsersAminTable
