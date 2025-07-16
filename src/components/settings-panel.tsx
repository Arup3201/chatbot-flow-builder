import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { NODES } from "./nodes";

export default ({ node, settings, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data with current node data
  useEffect(() => {
    if (node.data && settings) {
      const initialData = {};
      settings.forEach((setting) => {
        initialData[setting.field] = node.data[setting.field] || "";
      });
      setFormData(initialData);
    }
  }, [node.data, settings]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      setHasChanges(true);
      return newData;
    });
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(node.id, formData, settings);
    }
    setHasChanges(false);
  };

  // Handle close with unsaved changes warning
  const handleClose = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to close?"
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Render input based on setting type
  const renderInput = (setting) => {
    const value = formData[setting.field] || "";

    switch (setting.type) {
      case "text":
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(setting.field, e.target.value)}
            className="w-full p-2 border border-gray-300 focus:border-transparent"
            placeholder={`Enter ${setting.title.toLowerCase()}...`}
            rows={3}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(setting.field, e.target.value)}
            className="w-full p-2 border border-gray-300 focus:border-transparent"
            placeholder={`Enter ${setting.title.toLowerCase()}...`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(setting.field, e.target.value)}
            className="w-full p-2 border border-gray-300 focus:border-transparent"
            placeholder={`Enter ${setting.title.toLowerCase()}...`}
          />
        );
    }
  };

  if (!settings || settings.length === 0) {
    return (
      <div className="border-b-2 border-gray-200">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            No Settings Available
          </h3>
          <p className="text-gray-600 mb-6">
            This node doesn't have any configurable settings.
          </p>
        </div>
      </div>
    );
  }

  return (
      <div className="border-l-2 border-l-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{NODES.find(nd => nd.id===node.type)?.title}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {settings.map((setting) => (
              <div key={setting.field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {setting.title}
                </label>
                {renderInput(setting)}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
  );
};
