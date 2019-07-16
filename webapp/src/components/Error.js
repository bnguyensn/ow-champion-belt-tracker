import React from 'react';

export default function Error({ errMsg }) {
  return <div>The following error occurred when loading data: {errMsg} 😔</div>;
}
