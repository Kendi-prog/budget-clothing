import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";

 

const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''

}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const isStrongPassword = (password: string): boolean => {
        return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    };
    
    const isDisposableEmail = (email: string): boolean => {
        const disposableDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];
        return disposableDomains.some(domain => email.endsWith(`@${domain}`));
    };
    

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }


        if (!isStrongPassword(password)) {
            alert("Password must be at least 8 characters long, include an uppercase letter, and a number.");
            return;
        }
    
   
        const normalizedEmail: string = email.toLowerCase();
    
        if (isDisposableEmail(normalizedEmail)) {
            alert("Please use a valid email address.");
            return;
        }

        try{
            dispatch(signUpStart(normalizedEmail, password, displayName));
            navigate('/');
            resetFormFields();
           
        } catch(error){
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){ 
                alert('Cannot create user, email already in use');
            } else if((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
                alert('Password should be atleast 6 characters.');
            }
             else {
                console.log('User creation error', error);
            }
            
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name] : value })
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}

                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required  
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}

                />

                <Button type="submit">Sign Up</Button>
                

            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;