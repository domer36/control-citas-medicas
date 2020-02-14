const User = require('../models/User')
exports.FirstConfig = async ()=>{
    const admin = await User.findOne({email: 'admin'})
    if( !admin ) {
        await User.register({email:'admin', role: 'ADMIN' }, 'admin')
        console.log('Detected first use, creating admin user.')
    }

}