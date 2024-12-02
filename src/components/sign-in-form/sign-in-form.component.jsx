import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInButtons, SignUpContainer } from "./sign-in-form.styles";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
           
        } catch(error){
          if(error.code === 'auth/invalid-credential'){
            alert('Invalid Credential');
          }
          console.log(error);
            
        }

    }

    const handleChange = (event) => {
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
                <SignInButtons>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </SignInButtons>   
            </form>
        </SignUpContainer>
    );
}

export default SignInForm;