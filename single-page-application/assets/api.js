// const getUsers = async () => {
//     const response = await fetch('http://localhost:3000/users');
//     const users = await response.json();
// 
//     return users
// }
// 
// const postUser = async (user) => {
//     const response = await fetch(`http://localhost:3000/users`, {
//         method: 'post',
//         body: JSON.stringify(user)
//     })
// 
//     const data = await response.json()
// 
//     return data
// }
// 
// const putUser = async (id, data) => {
//     const response = await fetch(`http://localhost:3000/users/${id}`, {
//         method: 'put',
//         body: JSON.stringify({data})
//     })
//     const users = await response.json()
// 
//     return users;
// }
// 
// const deleteUser = async (id) => {
//     const response = await fetch(`http://localhost:3000/users/${id}`, {
//         method: 'delete'
//     })
//     const users = await response.json()
// 
//     return users
// }
