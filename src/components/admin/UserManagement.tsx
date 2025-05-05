
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import UserList from "./user/UserList";
import UserSearchHeader from "./user/UserSearchHeader";
import { AddUserDialog, EditUserDialog } from "./user/UserDialogs";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "service_provider" | "admin";
  status: "active" | "pending" | "inactive";
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  avatar?: string;
  createdAt: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  role: "user" | "service_provider" | "admin";
  status: "active" | "pending" | "inactive";
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError("Failed to fetch users");
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUserStatus = async (userId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${userId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, status: status as "active" | "pending" | "inactive" }
              : user
          )
        );

        toast({
          title: "Status Updated",
          description: `User status has been updated to ${status}.`,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== userId));

        toast({
          title: "User Deleted",
          description: "User has been removed successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to delete user",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = async (data: UserFormValues) => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${selectedUser._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? { ...user, ...response.data.data } : user
          )
        );

        toast({
          title: "User Updated",
          description: "User details have been updated successfully.",
        });

        setIsEditDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to update user",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const handleAddUser = async (data: UserFormValues & { password: string }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUsers((prevUsers) => [...prevUsers, response.data.data]);

        toast({
          title: "User Created",
          description: "New user has been created successfully.",
        });

        setIsAddDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to create user",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <UserSearchHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsAddDialogOpen(true)}
      />

      <UserList 
        users={filteredUsers}
        isLoading={isLoading}
        error={error}
        onRetry={fetchUsers}
        onStatusChange={handleUpdateUserStatus}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsEditDialogOpen(true);
        }}
        onDelete={handleDeleteUser}
      />

      {/* Edit User Dialog */}
      <EditUserDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
        onSubmit={handleEditUser}
        onCancel={() => setSelectedUser(null)}
      />

      {/* Add User Dialog */}
      <AddUserDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;
