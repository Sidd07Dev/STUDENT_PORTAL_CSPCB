'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { domain } from '../backendtokens';
import styled, { keyframes } from 'styled-components';

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    Name: user.Name,
    Email: user.Email,
    Gender: user.Gender,
    ProfileImage: user.ProfileImage,
    UniversityRollNo: user.UniversityRollNo,
    DOA: user.DOA,
  });
  const [imagePreview, setImagePreview] = useState(user.ProfileImage);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ProfileImage" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, ProfileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const editingStudentId = user._id;
      const response = await axios.put(`${domain}v1/students/update/${editingStudentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile data updated successfully!');
      console.log("API Response:", response.data);
      onClose();
    } catch (error) {
      toast.error('Failed to update profile data.');
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Profile Edit Interface</ModalTitle>
          <CloseButton onClick={onClose} disabled={loading}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <ImageSection>
              <ImagePreview src={imagePreview} alt="Profile Preview" />
              <ImageInput
                type="file"
                name="ProfileImage"
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
              />
            </ImageSection>

            <InputGroup>
              <Label>Name:</Label>
              <Input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>Gender:</Label>
              <Select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>University Roll No:</Label>
              <Input
                type="text"
                name="UniversityRollNo"
                value={formData.UniversityRollNo}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>Date of Admission:</Label>
              <Input
                type="date"
                name="DOA"
                value={formData.DOA}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>

            <ButtonContainer>
              <ActionButton type="button" onClick={onClose} color="#ff007a" disabled={loading}>
                Cancel
              </ActionButton>
              <ActionButton type="submit" color="#00ffcc" disabled={loading}>
                {loading ? 'Processing...' : 'Save Changes'}
              </ActionButton>
            </ButtonContainer>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Animations
const glitch = keyframes`
  0% { transform: translate(0); opacity: 1; }
  20% { transform: translate(-2px, 2px); opacity: 0.8; }
  40% { transform: translate(2px, -2px); opacity: 0.9; }
  60% { transform: translate(-2px, 0); opacity: 0.8; }
  80% { transform: translate(2px, 2px); opacity: 0.9; }
  100% { transform: translate(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 204, 0.5); }
  50% { box-shadow: 0 0 15px rgba(0, 255, 204, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 204, 0.5); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scanLine = keyframes`
  0% { top: -100%; }
  100% { top: 100%; }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 25px rgba(0, 255, 204, 0.7);
  }

  &:after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 255, 204, 0.5);
    animation: ${scanLine} 3s infinite linear;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  animation: ${glitch} 2s infinite;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff007a;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    color: #00ffcc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageSection = styled.div`
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
`;

const ImageInput = styled.input`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #b0b0e0;
  display: block;
  margin: 0 auto;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #e0e0e0;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00ffcc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #e0e0e0;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff007a;
    box-shadow: 0 0 10px rgba(255, 0, 122, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00ffcc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #e0e0e0;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff007a;
    box-shadow: 0 0 10px rgba(255, 0, 122, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: ${({ color }) => `linear-gradient(to right, ${color}, #1e1e2f)`};
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${({ color }) => `${color}80`};
  animation: ${pulse} 2s infinite;

  &:hover:not(:disabled) {
    box-shadow: 0 0 20px ${({ color }) => `${color}CC`};
    transform: scale(1.05);
    animation: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    animation: none;
  }
`;

export default EditProfileModal;