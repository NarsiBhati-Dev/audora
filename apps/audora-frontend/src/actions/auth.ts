import axios from 'axios';
import { API_URL } from '@/config';

export interface AuthError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const RegisterUser = async (userData: {
  email: string;
  password: string;
  name: string;
  provider?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    const err = error as AuthError;
    if (err.response) {
      throw new Error('Signup failed. Please try again.');
    } else {
      throw new Error('Network error. Please check your connection.');
    }
  }
};

export const LoginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return {
      success: true,
      user: {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
      },
    };
  } catch (error) {
    const err = error as AuthError;
    if (axios.isAxiosError(err)) {
      if (err.response) {
        throw new Error('Sign-in failed. Please check your credentials.');
      } else {
        throw new Error('Network error. Please check your connection.');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

export const RegisterWithGoogle = async (userData: {
  email: string;
  name: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, userData);
    return response.data;
  } catch (error) {
    const err = error as AuthError;
    if (err.response) {
      throw new Error('Signup failed. Please try again.');
    } else {
      throw new Error('Network error. Please check your connection.');
    }
  }
};
