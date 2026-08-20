
//A user has:
/* A user has:Properties → name, email, age
Behaviors → login(), logout(), updateProfile()  */
/*const user = {
    id:1,
    name: 'men',
    email: 'men@gmail.com',
    login() {
        console.log(`${this.name} logged in.`)
    },

    logout() {
        console.log(`${this.name} logged out.`)
    }
}
if(user.id == 1){
    user.logout();
}
//call user
user.login(); */


//Class and object
class User {

    constructor(name, email, password) {
        this.name= name;
        this.email =email;
        this.password= password
    }
    //create acc
    register () {
        console.log('loading....');
        setTimeout(() => {
            console.log(`User have been created.`);
            var data = {
                name : this.name,
                email : this.email,
                password : this.password
            }
            console.log(
                'name :',data.name,
                'email :',data.email,
                'password :',data.password,
            );
        }, 4000);
    }

    login () {
        console.log(
                'name :',this.name,
                'email :',this.email,
                'password :',this.password,
            );
    }

}

// call object
const data = [];
var user1 = new User("men", "men@gmail.com", "men1234");

//create acc
// if(user1.password.length < 6){
//     console.log('Please password must be strong.');
// }else{
//     data.push(user1.register());
// }

//login
if(user1.name !== 'men' || user1.password !== "men1234"){
    console.log('User name invalid.');
}else{
    console.log('loading to login....')
    setTimeout(() => {
        console.log(user1.name, 'logged in successfully.');
        user1.login();
    }, 3500);
}

