import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { 
    signInWithGooglePopup, 
    createUserDatabaseFromAuth 
} from "../../utils/firebase.utils";



const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDatabaseFromAuth(user); 
        
    }
 
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with GooglePopup
            </button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;