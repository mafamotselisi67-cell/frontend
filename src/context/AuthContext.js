// const login = async (email, password) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();
        
//         if (response.ok) {
//             // Map database roles to frontend roles
//             const roleMap = {
//                 'STD': 'student',
//                 'LCT': 'lecturer',
//                 'PRL': 'principal_lecturer', 
//                 'PL': 'program_leader'
//             };
            
//             const mappedUser = {
//                 ...data.user,
//                 role: roleMap[data.user.role] || 'student'
//             };

//             localStorage.setItem('token', data.token);
//             localStorage.setItem('user', JSON.stringify(mappedUser));
//             setUser(mappedUser);
//             return { success: true, user: mappedUser };
//         } else {
//             return { success: false, error: data.error };
//         }
//     } catch (error) {
//         return { success: false, error: 'Cannot connect to server' };
//     }
// };