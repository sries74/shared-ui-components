import React from 'react';
import { TagInput } from '../../../src';

interface TagInputWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const TagInputWrapper: React.FC<TagInputWrapperProps> = ({ props, setProps }) => {
  return (
    <TagInput
      {...props}
      tags={props.tags || []}
      onChange={(tags) => {
        setProps({ ...props, tags });
      }}
    />
  );
};

