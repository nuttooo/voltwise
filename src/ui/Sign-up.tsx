'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PopupCard from '@/components/PopupCard';
import { registerUser } from '@/services/auth';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowPopup(false);
  
    const data = await registerUser(email); 
  
    if (data.success) {
      setSuccess(data.data?.message || 'You have completed the setup.');
      setPopupType('success');
    } else {
      setError(data.message || 'An error occurred. Please try again.');
      setPopupType('error');
    }
    setShowPopup(true);
  };

  return (
    <div className={styles.container}>
      {showPopup && (
        <PopupCard
          type={popupType}
          title={popupType === 'success' ? 'Successful!' : 'Oops!'}
          message={popupType === 'success' ? success : error}
          buttonText={popupType === 'success' ? 'Continue' : 'Go Back'}
          onButtonClick={() => {
            setShowPopup(false);
            if (popupType === 'success') {
              router.push('/auth/login');
            }
          }}
        />
      )}
      <div className={styles.card}>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>
          Enter your email address to create an account.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <Mail className={styles.icon} />
            <input
              type="email"
              placeholder=" "
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={styles.label}>Email</label>
          </div>
          <button type="submit" className={styles.signUpButton}>
            Sign Up
          </button>
        </form>
        <Link href="/auth/login" className={styles.backToLogin}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;