import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useStore } from 'react-redux';

export function DarkModeToggle() {
  const { toggleColorScheme } = useTheme();
  const store = useStore();
  const darkMode = store.getState().darkMode;

  return (
    <button
      onClick={toggleColorScheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
}
