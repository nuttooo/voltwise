'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import styles from './ResetPassword.module.css';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle password reset logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          Please enter your new password.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} />
            <input
              type="password"
              placeholder=" "
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={styles.label}>New Password</label>
          </div>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} />
            <input
              type="password"
              placeholder=" "
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className={styles.label}>Confirm Password</label>
          </div>
          <button type="submit" className={styles.resetButton}>
            Reset Password
          </button>
        </form>
        <Link href="/auth/login" className={styles.backToLogin}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;