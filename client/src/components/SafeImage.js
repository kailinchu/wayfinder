import React, { useState } from 'react';

const SafeImage = ({ src, alt, className, loading = 'lazy', ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default SafeImage;
