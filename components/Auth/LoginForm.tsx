'use client';

import { useState, FormEvent } from 'react';
import { account, ID } from '@/lib/appwrite'; // Adjust path if necessary
import { AppwriteException } from 'appwrite';

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null); // To store userID after email token is created
    const [otp, setOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Step 1: Handle Email Submission to Send OTP
    const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Appwrite uses createEmailToken for OTP-like flow.
            // The user will receive an email with a secret token.
            // For a true "OTP" experience shown on the page, you'd typically use phone OTPs.
            // For email, Appwrite's 'createEmailToken' is more like a "magic link" token.
            // However, we are using it here to mean "send a secret to the user's email".
            // For a direct OTP via email to be entered on the page, Appwrite's
            // 'createEmailPasswordSession' with 'createMagicURLSession' or 'createEmailToken'
            // are the relevant methods. We'll use `createEmailToken` assuming the "OTP" is the secret from the email.

            const response = await account.createEmailToken(
                ID.unique(), // userId, use ID.unique() to let Appwrite generate or a custom one
                email
            );
            setUserId(response.userId); // Store the userId associated with this token
            setOtpSent(true);
            setSuccessMessage(`An OTP (secret token) has been sent to ${email}. Please check your inbox and enter it below.`);
        } catch (e) {
            const error = e as AppwriteException;
            console.error("Appwrite error sending email token:", error);
            setError(error.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Handle OTP Submission to Login
    const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userId) {
            setError("User ID not found. Please request OTP again.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Create a session using the email and the secret (OTP) from the email token
            const session = await account.createSession(email, otp); // 'otp' is the secret from the email
            console.log("Login successful!", session);
            setSuccessMessage('Login successful! Redirecting...');
            // TODO: Redirect user to dashboard or home page
            // Example: window.location.href = '/dashboard';
            // Or use Next.js router: router.push('/dashboard');
        } catch (e) {
            const error = e as AppwriteException;
            console.error("Appwrite error verifying OTP:", error);
            setError(error.message || 'Invalid OTP or failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!otpSent ? (
                <form onSubmit={handleEmailSubmit}>
                    <h2>Login with Email OTP</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <h2>Enter OTP</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <p>An OTP has been sent to {email}.</p>
                    <div>
                        <label htmlFor="otp">OTP (Secret from Email):</label>
                        <input
                            type="text" // In a real scenario, you might use type="number" or "password"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            disabled={isLoading}
                            minLength={6} // Appwrite token lengths can vary, adjust as needed
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Verifying OTP...' : 'Login'}
                    </button>
                    <button type="button" onClick={() => {
                        setOtpSent(false);
                        setEmail(''); // Optionally clear email
                        setOtp('');
                        setError(null);
                        setSuccessMessage(null);
                    }} disabled={isLoading}>
                        Back to Email
                    </button>
                </form>
            )}
        </div>
    );
}