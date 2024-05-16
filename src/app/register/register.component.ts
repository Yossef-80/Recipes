/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        // Initialize the form group in the constructor
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            address: ['', Validators.required],
        }, {
            validators: this.passwordMatchValidator,
        });
    }

    ngOnInit(): void {
        // Perform any other initialization logic here, if necessary
    }

    // Validator to check if password and confirmPassword match
    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');
        if (password && confirmPassword) {
            return password.value === confirmPassword.value ? null : { mismatch: true };
        }
        return null;
    }

    async register() {
        console.log('Form submitted:', this.registerForm.value);
        
        if (this.registerForm.invalid) {
            console.log('Form is invalid');
            return; // Do not proceed if the form is invalid
        }
    
        const { email, password } = this.registerForm.value;
        console.log('Email:', email);
        console.log('Password:', password);
    
        try {
            // Call the AuthService to register the user
            const userCredential = await this.authService.registerwithEmailandPassword({ email, password });
            console.log('Registration successful:', userCredential);
    
            // Navigate to the login page after successful registration
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Registration error:', error);
            // Optionally, display an error message to the user
        }
    }
    
}
*/
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    name: string = ''; // New name field
    email: string = '';
    password: string = '';

    constructor(private auth: AuthService) {}

    register() {
        if (!this.name || !this.email || !this.password) {
            alert('Please enter your name, email, and password.');
            return;
        }

        this.auth.signup(this.name, this.email, this.password);
        this.name = '';
        this.email = '';
        this.password = '';
    }
}