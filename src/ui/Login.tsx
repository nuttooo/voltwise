'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import styles from './Login.module.css';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image src="/voltwise.svg" alt="Voltwise Logo" width={64} height={64} className={styles.logo} />
        </div>
        <h2 className={styles.title}>Welcome</h2>
        <p className={styles.subtitle}>Please login to continue to Voltwise.</p>
        <form className={styles.form}>
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
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={styles.label}>Password</label>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye className={styles.eyeIcon} /> : <EyeOff className={styles.eyeIcon} />}
            </button>
          </div>
          <div className={styles.forgotPasswordContainer}>
            <Link href="/auth/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className={styles.loginButton} disabled={!isFormValid}>
            Login <LogIn className={styles.loginIcon} />
          </button>
        </form>
        <footer className={styles.footer}>
          Copyright © 2024 Devonix. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Login;