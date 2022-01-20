import React from 'react';
import { Previews, ComponentPreview } from '@react-buddy/ide-toolbox';
import Palette from './palette';
import App from '../App';

export const ComponentPreviews = () => {
  return (
    <Previews palette={<Palette />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
    </Previews>
  );
};
