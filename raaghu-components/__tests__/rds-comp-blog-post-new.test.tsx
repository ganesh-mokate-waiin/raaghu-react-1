import React from 'react'
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompBlogPostNew, { RdsCompBlogPostNewProps } from '../src/rds-comp-blog-post-new/rds-comp-blog-post-new';

describe('RdsCompBlogPostNew', () => {
  const mockProps: RdsCompBlogPostNewProps = {
    blogPostData: {
      file: null,
      title: '',
      blog: '',
      slug: '',
      concurrentMode: '',
      description: '',
      tag: '',
    },
    onSubmit: jest.fn(),
    isEdit: false,
  };

  beforeEach(() => {
    render(<RdsCompBlogPostNew {...mockProps} />);
  });

  it('should render the component', () => {
    expect(screen.getByText('Cover Image')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Slug')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(screen.getByText('Save as draft')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
  });

  it('should update the title field', () => {
    const titleInput = screen.getByTestId('title') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    expect(titleInput.value).toBe('Test Title');
  });

  it('should update the slug field', () => {
    const slugInput = screen.getByTestId('slug') as HTMLInputElement;
    fireEvent.change(slugInput, { target: { value: 'test-slug' } });

    expect(slugInput.value).toBe('test-slug');
  });

  it('should update the description field', () => {
    const descriptionTextarea = screen.getByTestId('shord-desc') as HTMLInputElement;
    fireEvent.change(descriptionTextarea, { target: { value: 'Test description' } });

    expect(descriptionTextarea.value).toBe('Test description');
  });

  it('should update the concurrency stamp field', () => {
    render(<RdsCompBlogPostNew {...mockProps} isEdit={true} />)
    const concurrencyInput = screen.getByTestId('concurrency-stamp') as HTMLInputElement;
    fireEvent.change(concurrencyInput, { target: { value: 'Test description' } });

    expect(concurrencyInput.value).toBe('Test description');
  });

  it('should update the tag field', () => {
    const tagInput = screen.getByTestId('tag') as HTMLInputElement;
    fireEvent.change(tagInput, { target: { value: 'test-tag' } });

    expect(tagInput.value).toBe('test-tag');
  });

  it('should call onSubmit when Publish button is clicked', () => {
    const publishButton = screen.getByText('Publish');
    fireEvent.click(publishButton);

    expect(mockProps.onSubmit).toHaveBeenCalled();
    expect(mockProps.onSubmit).toHaveBeenCalledWith(mockProps.blogPostData);
  });
});
