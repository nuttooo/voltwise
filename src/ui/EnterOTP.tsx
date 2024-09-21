"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./EnterOTP.module.css";

const EnterOTP: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (element: HTMLInputElement, index: number) => {
    if (element.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    if (timeLeft === 0) {
      setTimeLeft(30); // Reset the timer to 30 seconds
      // Add your logic to resend OTP here
    }
  };

  const handleSubmit = () => {
    // Handle OTP verification logic
    // If successful:
    router.push("/auth/reset-password");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Enter OTP</h2>
        <p className={styles.subtitle}>
          We have sent a 6-digit OTP to your registered email. Please enter it
          below.
        </p>
        <div className={styles.otpContainer}>
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className={styles.otpInput}
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) =>
                e.key === "Backspace"
                  ? handleBackspace(e.target as HTMLInputElement, index)
                  : null
              }
              ref={(el) => {
                inputRefs.current[index] = el;
              }} // Corrected ref assignment without returning anything
            />
          ))}
        </div>
        <div className={styles.resendContainer}>
          {timeLeft > 0 ? (
            <p className={styles.timer}>Resend OTP in {timeLeft}s</p>
          ) : (
            <button onClick={handleResendOTP} className={styles.resendButton}>
              Resend OTP
            </button>
          )}
        </div>
        <button onClick={handleSubmit} className={styles.verifyButton}>Verify OTP</button>
        <Link href="/auth/login" className={styles.backToLogin}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default EnterOTP;
