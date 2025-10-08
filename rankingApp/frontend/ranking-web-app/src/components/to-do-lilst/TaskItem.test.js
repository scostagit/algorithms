import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from './TaskItem.component';

describe('Item Component', () => {
  const mockTasks = [
    { id: 1, text: 'Task One', completed: false },
    { id: 2, text: 'Task Two', completed: true },
  ];

  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    render(
      <ul>
        <Item tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />
      </ul>
    );
  });

  it('renders all tasks', () => {
    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();
  });

  it('calls onToggle with correct id when task text is clicked', () => {
    const taskText = screen.getByText('Task One');
    fireEvent.click(taskText);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with correct id when delete button is clicked', () => {
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  it('applies line-through style to completed tasks', () => {
    const completedTask = screen.getByText('Task Two');
    expect(completedTask).toHaveStyle('text-decoration: line-through');
  });

  it('does not apply line-through style to incomplete tasks', () => {
    const incompleteTask = screen.getByText('Task One');
    expect(incompleteTask).not.toHaveStyle('text-decoration: line-through');
  });
});
