'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the password reset logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Forgot Password?</h2>
        <p className={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset your password.
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
          <button type="submit" className={styles.resetButton}>
            Send Reset Link
          </button>
        </form>
        <Link href="/auth/login" className={styles.backToLogin}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;