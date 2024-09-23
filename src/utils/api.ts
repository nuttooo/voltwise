import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
require('dotenv').config();
// Base URL configuration using environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interface for API responses
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
      code: number;
      message: string;
      details?: string;
    };
  }

// Generic API request handler
export const fetchApi = async <T>(
    path: string,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      // Perform the request using the axios instance
      const response: AxiosResponse<ApiResponse<T>> = await api(path, options);
  
      // Check if the response contains success=false, which indicates an error
      if (!response.data.success) {
        // Log actual error information if available
        console.error("API responded with an error:", response.data.error);
        return {
          success: false,
          message: response.data.error?.message || "Unknown error",
          error: response.data.error,
        };
      }
  
      // If success, return the response data
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        error: {
          code: 500,
          message: error instanceof Error ? error.message : "An unexpected error occurred",
        }
      };
    }
  };