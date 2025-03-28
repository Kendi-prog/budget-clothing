import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInButtons, SignUpContainer } from "./sign-in-form.styles";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { setupRecaptcha } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);

    useEffect(() => {
        setupRecaptcha("recaptcha-container", setRecaptchaVerified);
      }, []);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!recaptchaVerified) {
            alert("Please complete the reCAPTCHA before signing in.");
            return;
          }

        try{
            dispatch(emailSignInStart(email, password));
            navigate('/');

            resetFormFields();
           
        } catch(error){
          if((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL){
            alert('Invalid Credential');
          }
            
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name] : value })
    }

    return(
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email" 
                    required  
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                
                />

                <FormInput
                    label="Password"
                    type="password" 
                    required  
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                    
                />
                <div id="recaptcha-container"></div>
                <SignInButtons>
                    <Button type="submit">Sign In</Button>
                    <br/>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </SignInButtons>   
            </form>
            
        </SignUpContainer>
    );
}

export default SignInForm;