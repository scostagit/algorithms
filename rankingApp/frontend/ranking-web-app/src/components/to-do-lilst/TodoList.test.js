import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList.component'; // adjust path as needed
import '@testing-library/jest-dom';

// Helper to mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('TodoList Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.getItem.mockReturnValueOnce(null); // Prevent JSON.parse(undefined
  });

  it('renders correctly with initial content', () => {
    render(<TodoList />);
    expect(screen.getByText('Tasks List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks: 0')).toBeInTheDocument();
  });

  it('adds a task and updates the list and localStorage', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Enter task');
    const button = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(screen.getByText('Completed Tasks: 0')).toBeInTheDocument();
  });

  it('loads tasks from localStorage on mount', () => {
    const mockTasks = [
      { id: 1, text: 'Saved Task', completed: false },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockTasks));

    render(<TodoList />);

    expect(screen.getByText('Saved Task')).toBeInTheDocument();
  });

  it('toggles task completion and updates completed count', () => {
    const mockTasks = [
      { id: 1, text: 'Toggle Task', completed: false },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockTasks));

    render(<TodoList />);
    const taskText = screen.getByText('Toggle Task');

    // Initially not completed
    expect(taskText).not.toHaveStyle('text-decoration: line-through');
    expect(screen.getByText('Completed Tasks: 0')).toBeInTheDocument();

    fireEvent.click(taskText);

    // After toggle
    expect(screen.getByText('Completed Tasks: 1')).toBeInTheDocument();
  });

  it('deletes a task from the list', () => {
    const mockTasks = [
      { id: 1, text: 'Delete Me', completed: false },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockTasks));

    render(<TodoList />);

    expect(screen.getByText('Delete Me')).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Tasks: 0')).toBeInTheDocument();
  });

  it('does not add empty tasks', () => {
        render(<TodoList />);
        const button = screen.getByText('Add');
        fireEvent.click(button);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});
