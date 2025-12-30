import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search movies by name...",
  debounceMs = 300,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChange(inputValue);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, onChange, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onChange("");
  };

  return (
    <Input
      size="large"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={inputValue}
      onChange={handleChange}
      onClear={handleClear}
      allowClear
      className="search-container"
    />
  );
};
