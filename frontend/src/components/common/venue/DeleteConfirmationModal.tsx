import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Delete Venue?</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete this venue? This action cannot be undone.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Venue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;