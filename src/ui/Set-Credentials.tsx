'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCredentials } from '@/services/auth';
import styles from './SetCredentials.module.css';

const SetCredentials: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    try {
      const data = await setCredentials(token, username, password);
      if (data.success) {
        router.push('/auth/login');
      } else {
        setError(data.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to set credentials. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Set Username and Password</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetCredentials;